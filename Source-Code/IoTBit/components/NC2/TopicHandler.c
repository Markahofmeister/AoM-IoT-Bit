#include <string.h>
#include "Tokenizer.h"
#include "TopicHandler.h"

typedef enum
{
  TOPICHANDLER_TOPLEVELTOPIC_NONE,
  TOPICHANDLER_TOPLEVELTOPIC_USER,
  TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST
} TopicHandler_TopLevelTopic_t;

typedef enum
{
  TOPICHANDLER_USERTOPIC_NONE,
  TOPICHANDLER_USERTOPIC_CLIENT
} TopicHandler_UserTopic_t;

typedef enum
{
  TOPICHANDLER_TOPICSTATE_INIT,
  TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC,
  TOPICHANDLER_TOPICSTATE_USER_UUID,
  TOPICHANDLER_TOPICSTATE_USER_TOPIC,
  TOPICHANDLER_TOPICSTATE_CLIENT_UUID,
  TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC,
  TOPICHANDLER_TOPICSTATE_DONE
} TopicHandler_TopicState_t;

const char *TopicHandler_TopLevelTopics[] = {
    "",
    "user",
    "configure-request",
};
const char *TopicHandler_UserTopics[] = {
    "",
    "client",
};
const char *TopicHandler_ClientTopics[] = {
    "",
    "battery",
    "status",
    "heartbeat",
    "wifi",
    "network",
    "set-channel",
    "get-channel",
    "configure-receive",
};

static inline TopicHandler_Error_t TopicHandler_BufferAppend(char *const buffer, const size_t bufferSize, const size_t offset, const char *const string);
static inline TopicHandler_Error_t TopicHandler_BufferAppendDelimiter(char *const buffer, const size_t bufferSize, const size_t offset, const char delimiter);
static inline TopicHandler_TopLevelTopic_t TopicHandler_GetTopLevelTopic(const char *const token);
static inline TopicHandler_UserTopic_t TopicHandler_GetUserTopic(const char *const token);
static inline TopicHandler_Topic_t TopicHandler_GetClientTopic(const char *const token);
static inline TopicHandler_TopicState_t TopicHandler_ParseTopLevelTopic(const char *const token, TopicHandler_Topic_t *const topic);
static inline TopicHandler_TopicState_t TopicHandler_ParseUserTopic(const char *const token, TopicHandler_Topic_t *const topic);
static inline TopicHandler_Error_t TopicHandler_BuildClientTopic(TopicHandler_t *const handler, const TopicHandler_Topic_t topic, char *const buffer, const size_t size);

TopicHandler_Error_t TopicHandler_Init(TopicHandler_t *const handler, char *const userUuid, char *const clientUuid, const TopicHandler_Delimiter_t delimiter)
{
  TopicHandler_Error_t error = TOPICHANDLER_ERROR_OK;

  if (handler == NULL || userUuid == NULL || clientUuid == NULL)
  {
    error = TOPICHANDLER_ERROR_NULL;
  }
  else if (strlen(userUuid) == 0UL)
  {
    error = TOPICHANDLER_ERROR_USER_UUID;
  }
  else if (strlen(clientUuid) == 0UL)
  {
    error = TOPICHANDLER_ERROR_CLIENT_UUID;
  }
  else
  {
    handler->UserUuid = userUuid;
    handler->ClientUuid = clientUuid;
    handler->Delimiter = delimiter;
  }

  return error;
}

TopicHandler_Error_t TopicHandler_ParseTopic(TopicHandler_t *const handler, char *const buffer, TopicHandler_Topic_t *const topic)
{
  TopicHandler_Error_t error = TOPICHANDLER_ERROR_FORMAT;

  if (handler == NULL || buffer == NULL || topic == NULL)
  {
    error = TOPICHANDLER_ERROR_NULL;
  }
  else if (*buffer == handler->Delimiter)
  {
    TopicHandler_TopicState_t state = TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC;
    Tokenizer_Context_t tokenizer;
    char *token = Tokenizer_Tokenize(&tokenizer, buffer, handler->Delimiter);

    while (state != TOPICHANDLER_TOPICSTATE_DONE && token != NULL)
    {
      switch (state)
      {
      case TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC:
        state = TopicHandler_ParseTopLevelTopic(token, topic);
        break;
      case TOPICHANDLER_TOPICSTATE_USER_UUID:
        state = TOPICHANDLER_TOPICSTATE_USER_TOPIC;

        if (strcmp(handler->UserUuid, token) != 0U)
        {
          *topic = TOPICHANDLER_TOPIC_NONE;
          error = TOPICHANDLER_ERROR_USER_UUID;
          state = TOPICHANDLER_TOPICSTATE_DONE;
        }

        break;
      case TOPICHANDLER_TOPICSTATE_USER_TOPIC:
        state = TopicHandler_ParseUserTopic(token, topic);
        break;
      case TOPICHANDLER_TOPICSTATE_CLIENT_UUID:
        state = TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC;

        if (strcmp(handler->ClientUuid, token) != 0U)
        {
          error = TOPICHANDLER_ERROR_CLIENT_UUID;
          state = TOPICHANDLER_TOPICSTATE_DONE;
        }

        break;
      case TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC:
        state = TOPICHANDLER_TOPICSTATE_DONE;
        *topic = TopicHandler_GetClientTopic(token);

        if (*topic != TOPICHANDLER_TOPIC_NONE)
        {
          error = TOPICHANDLER_ERROR_OK;
        }

        break;
      default:
        state = TOPICHANDLER_TOPICSTATE_DONE;
        break;
      }

      token = Tokenizer_Tokenize(&tokenizer, NULL, handler->Delimiter);
    }
  }

  return error;
}

TopicHandler_Error_t TopicHandler_BuildTopic(TopicHandler_t *const handler, const TopicHandler_Topic_t topic, char *const buffer, const size_t size)
{
  TopicHandler_Error_t error = TOPICHANDLER_ERROR_NULL;

  if (handler != NULL && buffer != NULL)
  {
    switch (topic)
    {
    case TOPICHANDLER_TOPIC_BATTERY:
    case TOPICHANDLER_TOPIC_STATUS:
    case TOPICHANDLER_TOPIC_HEARTBEAT:
    case TOPICHANDLER_TOPIC_WIFI:
    case TOPICHANDLER_TOPIC_NETWORK:
    case TOPICHANDLER_TOPIC_SET_CHANNEL:
    case TOPICHANDLER_TOPIC_GET_CHANNEL:
    case TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE:
      error = TopicHandler_BuildClientTopic(handler, topic, buffer, size);
      break;
    case TOPICHANDLER_TOPIC_CONFIGURE_REQUEST:
      error = TopicHandler_BufferAppendDelimiter(buffer, size, 0UL, handler->Delimiter);

      if (error == TOPICHANDLER_ERROR_OK)
      {
        error = TopicHandler_BufferAppend(buffer, size, strlen(buffer), TopicHandler_TopLevelTopics[TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST]);
      }

      break;
    default:
      error = TopicHandler_BufferAppend(buffer, size, 0UL, TopicHandler_TopLevelTopics[TOPICHANDLER_TOPLEVELTOPIC_NONE]);

      if (error == TOPICHANDLER_ERROR_OK)
      {
        error = TOPICHANDLER_ERROR_FORMAT;
      }

      break;
    }
  }

  return error;
}

/* TODO inline function */
size_t TopicHandler_StringLength(const char *const string)
{
  size_t size = 0UL;

  if (string != NULL)
  {
    size = (strlen(string) * sizeof(*string)) + sizeof(Tokenizer_NullTerminator);
  }

  return size;
}

static inline TopicHandler_Error_t TopicHandler_BufferAppend(char *const buffer, const size_t bufferSize, const size_t offset, const char *const string)
{
  TopicHandler_Error_t error = TOPICHANDLER_ERROR_OK;
  size_t remainingSpace = bufferSize - offset;

  if (TopicHandler_StringLength(buffer) > remainingSpace)
  {
    error = TOPICHANDLER_ERROR_SIZE;
  }
  else
  {
    strcpy((buffer + offset), string);
  }

  return error;
}

static inline TopicHandler_Error_t TopicHandler_BufferAppendDelimiter(char *const buffer, const size_t bufferSize, const size_t offset, const char delimiter)
{
  TopicHandler_Error_t error = TOPICHANDLER_ERROR_OK;
  size_t remainingSpace = bufferSize - offset;

  if ((sizeof(delimiter) + sizeof(Tokenizer_NullTerminator)) > remainingSpace)
  {
    error = TOPICHANDLER_ERROR_SIZE;
  }
  else
  {
    *(buffer + offset) = delimiter;
    *(buffer + offset + sizeof(delimiter)) = Tokenizer_NullTerminator;
  }

  return error;
}

static inline TopicHandler_TopLevelTopic_t TopicHandler_GetTopLevelTopic(const char *const token)
{
  TopicHandler_TopLevelTopic_t topic = TOPICHANDLER_TOPLEVELTOPIC_NONE;

  for (size_t i = 0UL; i < sizeof(TopicHandler_TopLevelTopics) / sizeof(TopicHandler_TopLevelTopics[0UL]); i++)
  {
    if (strcmp(token, TopicHandler_TopLevelTopics[i]) == 0UL)
    {
      topic = (TopicHandler_TopLevelTopic_t)i;
      break;
    }
  }

  return topic;
}

static inline TopicHandler_UserTopic_t TopicHandler_GetUserTopic(const char *const token)
{
  TopicHandler_UserTopic_t topic = TOPICHANDLER_USERTOPIC_NONE;

  for (size_t i = 0UL; i < sizeof(TopicHandler_UserTopics) / sizeof(TopicHandler_UserTopics[0UL]); i++)
  {
    if (strcmp(token, TopicHandler_UserTopics[i]) == 0UL)
    {
      topic = (TopicHandler_UserTopic_t)i;
      break;
    }
  }

  return topic;
}

static inline TopicHandler_Topic_t TopicHandler_GetClientTopic(const char *const token)
{
  TopicHandler_Topic_t topic = TOPICHANDLER_TOPIC_NONE;

  for (size_t i = 0UL; i < sizeof(TopicHandler_ClientTopics) / sizeof(TopicHandler_ClientTopics[0UL]); i++)
  {
    if (strcmp(token, TopicHandler_ClientTopics[i]) == 0UL)
    {
      topic = (TopicHandler_Topic_t)i;
      break;
    }
  }

  return topic;
}

static inline TopicHandler_TopicState_t TopicHandler_ParseTopLevelTopic(const char *const token, TopicHandler_Topic_t *const topic)
{
  TopicHandler_TopicState_t nextState = TOPICHANDLER_TOPICSTATE_DONE;

  switch (TopicHandler_GetTopLevelTopic(token))
  {
  case TOPICHANDLER_TOPLEVELTOPIC_USER:
    nextState = TOPICHANDLER_TOPICSTATE_USER_UUID;
    break;
  case TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST:
    *topic = TOPICHANDLER_TOPIC_CONFIGURE_REQUEST;
    break;
  default:
    *topic = TOPICHANDLER_TOPIC_NONE;
    break;
  }

  return nextState;
}

static inline TopicHandler_TopicState_t TopicHandler_ParseUserTopic(const char *const token, TopicHandler_Topic_t *const topic)
{
  TopicHandler_TopicState_t nextState = TOPICHANDLER_TOPICSTATE_DONE;

  switch (TopicHandler_GetUserTopic(token))
  {
  case TOPICHANDLER_USERTOPIC_CLIENT:
    nextState = TOPICHANDLER_TOPICSTATE_CLIENT_UUID;
    break;
  default:
    *topic = TOPICHANDLER_TOPIC_NONE;
    break;
  }

  return nextState;
}

static inline TopicHandler_Error_t TopicHandler_BuildClientTopic(TopicHandler_t *const handler, const TopicHandler_Topic_t topic, char *const buffer, const size_t size)
{
  TopicHandler_Error_t error = TOPICHANDLER_ERROR_OK;
  TopicHandler_TopicState_t state = TOPICHANDLER_TOPICSTATE_INIT;

  if (size > 0UL)
  {
    *buffer = Tokenizer_NullTerminator;
  }
  else
  {
    error = TOPICHANDLER_ERROR_SIZE;
  }

  while (error == TOPICHANDLER_ERROR_OK && state != TOPICHANDLER_TOPICSTATE_DONE)
  {
    switch (state)
    {
    case TOPICHANDLER_TOPICSTATE_INIT:
      state = TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC;
      break;
    case TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC:
      error = TopicHandler_BufferAppend(buffer, size, strlen(buffer), TopicHandler_TopLevelTopics[TOPICHANDLER_TOPLEVELTOPIC_USER]);
      state = TOPICHANDLER_TOPICSTATE_USER_UUID;
      break;
    case TOPICHANDLER_TOPICSTATE_USER_UUID:
      error = TopicHandler_BufferAppend(buffer, size, strlen(buffer), handler->UserUuid);
      state = TOPICHANDLER_TOPICSTATE_USER_TOPIC;
      break;
    case TOPICHANDLER_TOPICSTATE_USER_TOPIC:
      error = TopicHandler_BufferAppend(buffer, size, strlen(buffer), TopicHandler_UserTopics[TOPICHANDLER_USERTOPIC_CLIENT]);
      state = TOPICHANDLER_TOPICSTATE_CLIENT_UUID;
      break;
    case TOPICHANDLER_TOPICSTATE_CLIENT_UUID:
      error = TopicHandler_BufferAppend(buffer, size, strlen(buffer), handler->ClientUuid);
      state = TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC;
      break;
    case TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC:
      if (topic <= TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE)
      {
        error = TopicHandler_BufferAppend(buffer, size, strlen(buffer), TopicHandler_ClientTopics[topic]);
      }
      else
      {
        error = TOPICHANDLER_ERROR_FORMAT;
      }
      state = TOPICHANDLER_TOPICSTATE_DONE;
      break;
    default:
      error = TOPICHANDLER_ERROR_FORMAT;
      state = TOPICHANDLER_TOPICSTATE_DONE;
      break;
    }

    if (state != TOPICHANDLER_TOPICSTATE_DONE)
    {
      error = TopicHandler_BufferAppendDelimiter(buffer, size, strlen(buffer), handler->Delimiter);
    }
  }

  return error;
}