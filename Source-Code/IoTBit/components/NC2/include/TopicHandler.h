#ifndef TOPICHANDLER_H
#define TOPICHANDLER_H

#include <stdint.h>
#include <stdlib.h>

typedef char TopicHandler_Delimiter_t;

typedef enum
{
    TOPICHANDLER_ERROR_OK,
    TOPICHANDLER_ERROR_NULL,
    TOPICHANDLER_ERROR_SIZE,
    TOPICHANDLER_ERROR_FORMAT,
    TOPICHANDLER_ERROR_USER_UUID,
    TOPICHANDLER_ERROR_CLIENT_UUID
} TopicHandler_Error_t;

typedef enum
{
    TOPICHANDLER_TOPIC_NONE,
    TOPICHANDLER_TOPIC_BATTERY,
    TOPICHANDLER_TOPIC_STATUS,
    TOPICHANDLER_TOPIC_HEARTBEAT,
    TOPICHANDLER_TOPIC_WIFI,
    TOPICHANDLER_TOPIC_NETWORK,
    TOPICHANDLER_TOPIC_SET_CHANNEL,
    TOPICHANDLER_TOPIC_GET_CHANNEL,
    TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE,
    TOPICHANDLER_TOPIC_CONFIGURE_REQUEST
} TopicHandler_Topic_t;

typedef struct
{
    char *UserUuid;
    char *ClientUuid;
    TopicHandler_Delimiter_t Delimiter;
} TopicHandler_t;

TopicHandler_Error_t TopicHandler_Init(TopicHandler_t *const handler, char *const userUuid, char *const clientUuid, const TopicHandler_Delimiter_t delimiter);
TopicHandler_Error_t TopicHandler_ParseTopic(TopicHandler_t *const handler, char *const buffer, TopicHandler_Topic_t *const topic);
TopicHandler_Error_t TopicHandler_BuildTopic(TopicHandler_t *const handler, const TopicHandler_Topic_t topic, char *const buffer, const size_t size);
size_t TopicHandler_StringLength(const char *const string); /* TODO inline function */

#endif