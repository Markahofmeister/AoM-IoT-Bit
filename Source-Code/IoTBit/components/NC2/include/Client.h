#ifndef CLIENT_H
#define CLIENT_H

#include "PubSubClient.h"
#include "TopicHandler.h"

#define CLIENT_IP_ADDRESS_SIZE 16U

typedef uint32_t Client_ChannelNumber_t;
typedef uint32_t Client_ChannelState_t;

typedef enum
{
    CLIENT_STATUS_OFFLINE,
    CLIENT_STATUS_ONLINE
} Client_Status_t;

typedef enum
{
    CLIENT_WIFISECURITY_WEP,
    CLIENT_WIFISECURITY_WPA,
    CLIENT_WIFISECURITY_WPA2,
    CLIENT_WIFISECURITY_WPA3
} Client_WifiSecurity_t;

typedef enum
{
    CLIENT_IPVERSERION_IPV4,
    CLIENT_IPVERSERION_IPV6
} Client_IpVerserion_t;

typedef enum
{
    CLIENT_CHANNELTYPE_GENERIC_DIGITAL_OUTPUT,
    CLIENT_CHANNELTYPE_GENERIC_DIGITAL_INPUT,
    CLIENT_CHANNELTYPE_GENERIC_ANALOG_OUTPUT,
    CLIENT_CHANNELTYPE_GENERIC_ANALOG_INPUT
} Client_ChannelType_t;

typedef enum
{
    CLIENT_METHOD_CONFIGURE_CHANNEL,
    CLIENT_METHOD_SET_CHANNEL,
    CLIENT_METHOD_GET_CHANNELS
} Client_Method_t;

typedef struct
{
    Client_ChannelNumber_t Number;
    Client_ChannelState_t State;
} Client_Channel_t;

typedef struct
{
    Client_Channel_t *Channels;
    size_t Count;
} Client_ChannelList_t;

typedef struct
{
    PubSubClient_t *PubSubClient;
    TopicHandler_t TopicHandler;
    char *TopicBuffer;
    size_t TopicBufferSize;
    uint8_t *DataBuffer;
    size_t DataBufferSize;
    bool Configured;
    bool (*ConfigureChannel)(const Client_ChannelNumber_t number, const Client_ChannelType_t type);
    bool (*SetChannel)(const Client_Channel_t channel);
    bool (*GetChannels)(Client_ChannelList_t *const channelList);
} Client_t;

void Client_Init(Client_t *const client,
                 PubSubClient_t *const pubSubClient,
                 char *const topicBuffer,
                 const size_t topicBufferSize,
                 uint8_t *const dataBuffer,
                 const size_t dataBufferSize);
void Client_Deinit(Client_t *const client);
void Client_SetMethod(Client_t *const client, const Client_Method_t method, void *const function);
void Client_Connect(Client_t *const client, char *const userUuid, char *const clientUuid, char *const token);
void Client_Update(Client_t *const client);
void Client_UpdateChannels(Client_t *const client);
void Client_SetBatteryLevel(Client_t *const client, const double level);
void Client_SetNetwork(Client_t *const client, const uint64_t macAddress, const Client_IpVerserion_t ipVersion, uint8_t ipAddress[CLIENT_IP_ADDRESS_SIZE]);
void Client_SetWifi(Client_t *const client, char *const ssid, const double signalStrength, const Client_WifiSecurity_t security);

#endif