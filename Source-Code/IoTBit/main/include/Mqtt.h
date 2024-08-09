#ifndef MQTT_H
#define MQTT_H

#include "Client.h"
#include "mqtt_client.h"

bool Mqtt_Init(const char *const uri, const char *const uuid);
bool Mqtt_Deinit(void);
bool Mqtt_Connect(const char *const uuid, const char *const token, const PubSubClient_Will_t *const will);
bool Mqtt_Disconnect(void);
bool Mqtt_Subscribe(const char *const topic, const PubSubClient_Qos_t qos);
bool Mqtt_Unsubscribe(const char *const topic);
bool Mqtt_Publish(const PubSubClient_Message_t message, const bool retained, const PubSubClient_Qos_t qos);
bool Mqtt_GetMessage(PubSubClient_Message_t *const message);

#endif