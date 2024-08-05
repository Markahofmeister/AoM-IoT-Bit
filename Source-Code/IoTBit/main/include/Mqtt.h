#ifndef MQTT_H
#define MQTT_H

#include "mqtt_client.h"

typedef enum
{
    MQTT_QOS_0,
    MQTT_QOS_1,
    MQTT_QOS_2
} Mqtt_Qos_t;

bool Mqtt_Init(const esp_mqtt_client_config_t *const mqttCfg);
bool Mqtt_Connect(void);
bool Mqtt_Subscribe(const char *const topic, const Mqtt_Qos_t qos);

#endif