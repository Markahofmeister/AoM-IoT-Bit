#ifndef PUB_SUB_CLIENT_H
#define PUB_SUB_CLIENT_H

#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

typedef enum
{
    PUBSUBCLIENT_QOS_0,
    PUBSUBCLIENT_QOS_1,
    PUBSUBCLIENT_QOS_2
} PubSubClient_Qos_t;

typedef struct
{
    char *TopicBuffer;
    size_t TopicBufferSize;
    size_t TopicSize;
    uint8_t *DataBuffer;
    size_t DataBufferSize;
    size_t DataSize;
} PubSubClient_Message_t;

typedef struct
{
    PubSubClient_Message_t Message;
    bool Retained;
    PubSubClient_Qos_t Qos;
} PubSubClient_Will_t;

typedef struct
{
    bool (*Init)(const char *const uri, const char *const uuid);
    bool (*Deinit)(void);
    bool (*Connect)(const char *const uuid, const char *const token, const PubSubClient_Will_t *const will);
    bool (*Disconnect)(void);
    bool (*Subscribe)(const char *const topic, const PubSubClient_Qos_t qos);
    bool (*Unsubscribe)(const char *const topic);
    bool (*Publish)(const PubSubClient_Message_t message, const bool retained, const PubSubClient_Qos_t qos);
    bool (*GetMessage)(PubSubClient_Message_t *const message);
} PubSubClient_Interface_t;

typedef struct
{
    void (*OnConnect)(const char *const uri, const char *const uuid);
    void (*OnPublish)(const PubSubClient_Message_t *const message, const bool retained, const PubSubClient_Qos_t qos);
    void (*OnSubscribe)(const char *const topic, const PubSubClient_Qos_t qos);
    void (*OnReceive)(const PubSubClient_Message_t *const message);
} PubSubClient_Callbacks_t;

typedef struct
{
    char *Uri;
    char *Uuid;
    PubSubClient_Interface_t Interface;
    PubSubClient_Callbacks_t Callbacks;
    PubSubClient_Will_t Will;
    bool Init;
    bool Connected;
} PubSubClient_t;

void PubSubClient_Init(PubSubClient_t *const client, char *const uri, char *const uuid, const PubSubClient_Interface_t interface);
void PubSubClient_Deinit(PubSubClient_t *const client);
void PubSubClient_SetCallbacks(PubSubClient_t *const client, const PubSubClient_Callbacks_t callbacks);
bool PubSubClient_SetWill(PubSubClient_t *const client, const PubSubClient_Message_t message, const bool retained, const PubSubClient_Qos_t qos);
bool PubSubClient_Connect(PubSubClient_t *const client, const char *const token);
bool PubSubClient_Disconnect(PubSubClient_t *const client);
bool PubSubClient_Subscribe(const PubSubClient_t *const client, const char *const topic, const PubSubClient_Qos_t qos);
bool PubSubClient_Unsubscribe(const PubSubClient_t *const client, const char *const topic);
bool PubSubClient_Publish(const PubSubClient_t *const client, const PubSubClient_Message_t message, const bool retained, const PubSubClient_Qos_t qos);
bool PubSubClient_GetMessage(const PubSubClient_t *const client, PubSubClient_Message_t *const message);

#endif