#include "authenticate.pb.h"
#include "battery.pb.h"
#include "Client.h"
#include "configuration.pb.h"
#include "get_channel.pb.h"
#include "network.pb.h"
#include "pb_decode.h"
#include "pb_encode.h"
#include "set_channel.pb.h"
#include "status.pb.h"
#include "wifi.pb.h"

#define CLIENT_TOPIC_DELIMITER '/'

static inline void Client_SetWill(Client_t *const client);
static inline void Client_Authenticate(Client_t *const client, char *const userUuid, char *const clientUuid, char *const token);
static inline void Client_SetStatus(Client_t *const client, const Client_Status_t status);
static inline void Client_HandleConfiguration(Client_t *const client, const PubSubClient_Message_t message);
static inline void Client_HandleSetChannel(Client_t *const client, const PubSubClient_Message_t message);
static inline void Client_Publish(Client_t *const client, const TopicHandler_Topic_t topic, const pb_msgdesc_t *const fields, const void *const src_struct);
static inline bool Client_ConfigureChannel(const Client_t *const client, const Client_ChannelNumber_t number, const Client_ChannelType_t type);
static inline bool Client_SetChannel(const Client_t *const client, const Client_Channel_t channel);
static inline bool Client_GetChannels(const Client_t *const client, Client_ChannelList_t *const channelList);
static bool Client_PbEncodeString(pb_ostream_t *stream, const pb_field_iter_t *field, void *const *arg);
static bool Client_PbEncodeIpAddress(pb_ostream_t *stream, const pb_field_iter_t *field, void *const *arg);
static bool Client_PbDecodeChannelConfiguration(pb_istream_t *stream, const pb_field_t *field, void **arg);
static bool Client_PbDecodeChannel(pb_istream_t *stream, const pb_field_t *field, void **arg);
static bool Client_PbEncodeChannels(pb_ostream_t *stream, const pb_field_iter_t *field, void *const *arg);

void Client_Init(Client_t *const client,
                 PubSubClient_t *const pubSubClient,
                 char *const topicBuffer,
                 const size_t topicBufferSize,
                 uint8_t *const dataBuffer,
                 const size_t dataBufferSize)
{
    if (client != NULL && pubSubClient != NULL && topicBuffer != NULL && dataBuffer != NULL)
    {
        client->PubSubClient = pubSubClient;
        client->TopicBuffer = topicBuffer;
        client->TopicBufferSize = topicBufferSize;
        client->DataBuffer = dataBuffer;
        client->DataBufferSize = dataBufferSize;
        client->ConfigureChannel = NULL;
        client->SetChannel = NULL;
        client->GetChannels = NULL;
        client->Configured = false;
    }
}

void Client_Deinit(Client_t *const client)
{
    if (client != NULL)
    {
        if (client->Configured)
        {
            Client_SetStatus(client, CLIENT_STATUS_OFFLINE);

            client->Configured = false;
        }

        PubSubClient_Disconnect(client->PubSubClient);
    }
}

void Client_SetMethod(Client_t *const client, const Client_Method_t method, void *const function)
{
    if (client != NULL && function != NULL)
    {
        switch (method)
        {
        case CLIENT_METHOD_CONFIGURE_CHANNEL:
            client->ConfigureChannel = function;
            break;
        case CLIENT_METHOD_SET_CHANNEL:
            client->SetChannel = function;
            break;
        case CLIENT_METHOD_GET_CHANNELS:
            client->GetChannels = function;
            break;
        default:
            break;
        }
    }
}

void Client_Connect(Client_t *const client, char *const userUuid, char *const clientUuid, char *const token)
{
    if (client != NULL && userUuid != NULL && clientUuid != NULL && token != NULL)
    {
        /* TODO error handling */
        if (TopicHandler_Init(&client->TopicHandler, userUuid, clientUuid, CLIENT_TOPIC_DELIMITER) == TOPICHANDLER_ERROR_OK)
        {
            Client_SetWill(client);
            PubSubClient_Connect(client->PubSubClient, token);

            if (TopicHandler_BuildTopic(&client->TopicHandler, TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE, client->TopicBuffer, client->TopicBufferSize) == TOPICHANDLER_ERROR_OK)
            {
                PubSubClient_Subscribe(client->PubSubClient, client->TopicBuffer, PUBSUBCLIENT_QOS_1);
            }

            if (TopicHandler_BuildTopic(&client->TopicHandler, TOPICHANDLER_TOPIC_SET_CHANNEL, client->TopicBuffer, client->TopicBufferSize) == TOPICHANDLER_ERROR_OK)
            {
                PubSubClient_Subscribe(client->PubSubClient, client->TopicBuffer, PUBSUBCLIENT_QOS_1);
            }

            Client_Authenticate(client, userUuid, clientUuid, token);
        }
    }
}

void Client_Update(Client_t *const client)
{
    if (client != NULL)
    {
        TopicHandler_Topic_t topic;
        PubSubClient_Message_t message = {
            .Topic = client->TopicBuffer,
            .TopicSize = client->TopicBufferSize,
            .Data = client->DataBuffer,
            .DataSize = client->DataBufferSize,
        };

        if (PubSubClient_GetMessage(client->PubSubClient, &message) &&
            TopicHandler_ParseTopic(&client->TopicHandler, client->TopicBuffer, &topic) == TOPICHANDLER_ERROR_OK)
        {
            switch (topic)
            {
            case TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE:
                Client_HandleConfiguration(client, message);
                break;
            case TOPICHANDLER_TOPIC_SET_CHANNEL:
                Client_HandleSetChannel(client, message);
                break;
            default:
                break;
            }
        }

        /* TODO update battery channels if necessary */
        /* TODO send heartbeat if necessary */
    }
}

void Client_UpdateChannels(Client_t *const client)
{
    if (client != NULL)
    {
        nml_GetChannel nmlGetChannel = nml_GetChannel_init_zero;
        nmlGetChannel.channel.arg = client;
        nmlGetChannel.channel.funcs.encode = Client_PbEncodeChannels;

        Client_Publish(client, TOPICHANDLER_TOPIC_GET_CHANNEL, nml_GetChannel_fields, &nmlGetChannel);
    }
}

void Client_SetBatteryLevel(Client_t *const client, const double level)
{
    if (client != NULL)
    {
        nml_Battery nmlBattery = nml_Battery_init_zero;
        nmlBattery.level = level;

        Client_Publish(client, TOPICHANDLER_TOPIC_BATTERY, nml_Battery_fields, &nmlBattery);
    }
}

void Client_SetNetwork(Client_t *const client, const uint64_t macAddress, const Client_IpVerserion_t ipVersion, uint8_t ipAddress[CLIENT_IP_ADDRESS_SIZE])
{
    if (client != NULL)
    {
        nml_Network nmlNetwork = nml_Network_init_zero;
        nmlNetwork.mac_address = macAddress;
        nmlNetwork.ip_address.arg = ipAddress;
        nmlNetwork.ip_address.funcs.encode = Client_PbEncodeIpAddress;

        switch (ipVersion)
        {
        case CLIENT_IPVERSERION_IPV4:
            nmlNetwork.ip_version = nml_NetworkIpVersion_NETWORK_IP_VERSION_IPV4;
            break;
        case CLIENT_IPVERSERION_IPV6:
            nmlNetwork.ip_version = nml_NetworkIpVersion_NETWORK_IP_VERSION_IPV6;
            break;
        default:
            break;
        }

        Client_Publish(client, TOPICHANDLER_TOPIC_NETWORK, nml_Network_fields, &nmlNetwork);
    }
}

void Client_SetWifi(Client_t *const client, char *const ssid, const double signalStrength, const Client_WifiSecurity_t security)
{
    if (client != NULL && ssid != NULL)
    {
        nml_Wifi nmlWifi = nml_Wifi_init_zero;
        nmlWifi.ssid.arg = ssid;
        nmlWifi.ssid.funcs.encode = Client_PbEncodeString;
        nmlWifi.signal_strength = signalStrength;

        switch (security)
        {
        case CLIENT_WIFISECURITY_WEP:
            nmlWifi.security = nml_WifiSecurity_WIFI_SECURITY_WEP;
            break;
        case CLIENT_WIFISECURITY_WPA:
            nmlWifi.security = nml_WifiSecurity_WIFI_SECURITY_WPA;
            break;
        case CLIENT_WIFISECURITY_WPA2:
            nmlWifi.security = nml_WifiSecurity_WIFI_SECURITY_WPA2;
            break;
        case CLIENT_WIFISECURITY_WPA3:
            nmlWifi.security = nml_WifiSecurity_WIFI_SECURITY_WPA3;
            break;
        default:
            break;
        }

        Client_Publish(client, TOPICHANDLER_TOPIC_WIFI, nml_Wifi_fields, &nmlWifi);
    }
}

static inline void Client_SetWill(Client_t *const client)
{
    pb_ostream_t stream = pb_ostream_from_buffer(client->DataBuffer, client->DataBufferSize);
    nml_Status nmlStatus = nml_Status_init_zero;
    nmlStatus.state = nml_StatusState_STATUS_STATE_OFFLINE;

    if (TopicHandler_BuildTopic(&client->TopicHandler, TOPICHANDLER_TOPIC_STATUS, client->TopicBuffer, client->TopicBufferSize) != TOPICHANDLER_ERROR_OK)
    {
        /* TODO error handling */
    }

    if (pb_encode(&stream, nml_Status_fields, &nmlStatus))
    {
        PubSubClient_Message_t message = {
            .Topic = client->TopicBuffer,
            .TopicSize = TopicHandler_StringLength(client->TopicBuffer),
            .Data = client->DataBuffer,
            .DataSize = stream.bytes_written,
        };

        PubSubClient_SetWill(client->PubSubClient, message, true, PUBSUBCLIENT_QOS_1);
    }
    else
    {
        /* TODO error handling */
    }
}

static inline void Client_Authenticate(Client_t *const client, char *const userUuid, char *const clientUuid, char *const token)
{
    nml_Authenticate nmlAuthenticate = nml_Authenticate_init_zero;
    nmlAuthenticate.user_uuid.arg = userUuid;
    nmlAuthenticate.user_uuid.funcs.encode = Client_PbEncodeString;
    nmlAuthenticate.client_uuid.arg = clientUuid;
    nmlAuthenticate.client_uuid.funcs.encode = Client_PbEncodeString;
    nmlAuthenticate.token.arg = token;
    nmlAuthenticate.token.funcs.encode = Client_PbEncodeString;

    Client_Publish(client, TOPICHANDLER_TOPIC_CONFIGURE_REQUEST, nml_Authenticate_fields, &nmlAuthenticate); /* TODO configure request should not be retained */
}

static inline void Client_SetStatus(Client_t *const client, const Client_Status_t status)
{

    nml_Status nmlStatus = nml_Status_init_zero;
    bool statusSet = true;

    switch (status)
    {
    case CLIENT_STATUS_OFFLINE:
        nmlStatus.state = nml_StatusState_STATUS_STATE_OFFLINE;
        break;
    case CLIENT_STATUS_ONLINE:
        nmlStatus.state = nml_StatusState_STATUS_STATE_ONLINE;
        break;
    default:
        statusSet = false;
        break;
    }

    if (statusSet)
    {
        Client_Publish(client, TOPICHANDLER_TOPIC_STATUS, nml_Status_fields, &nmlStatus);
    }
}

static inline void Client_HandleConfiguration(Client_t *const client, const PubSubClient_Message_t message)
{
    pb_istream_t stream = pb_istream_from_buffer(client->DataBuffer, message.DataSize);
    nml_Configuration nmlConfiguration = nml_Configuration_init_zero;
    /* TODO extract client name if necessary */
    nmlConfiguration.channel_configuration.arg = client;
    nmlConfiguration.channel_configuration.funcs.decode = Client_PbDecodeChannelConfiguration;

    if (pb_decode(&stream, nml_Configuration_fields, &nmlConfiguration))
    {
        Client_SetStatus(client, CLIENT_STATUS_ONLINE);
        Client_UpdateChannels(client);

        client->Configured = true;
    }
    else
    {
        /* TODO error handling */
    }
}

static inline void Client_HandleSetChannel(Client_t *const client, const PubSubClient_Message_t message)
{
    pb_istream_t stream = pb_istream_from_buffer(client->DataBuffer, message.DataSize);
    nml_SetChannel nmlSetChannel = nml_SetChannel_init_zero;
    nmlSetChannel.channel.arg = client;
    nmlSetChannel.channel.funcs.decode = Client_PbDecodeChannel;

    if (pb_decode(&stream, nml_SetChannel_fields, &nmlSetChannel))
    {
        Client_UpdateChannels(client);
    }
    else
    {
        /* TODO error handling */
    }
}

static inline void Client_Publish(Client_t *const client, const TopicHandler_Topic_t topic, const pb_msgdesc_t *const fields, const void *const srcStruct)
{
    pb_ostream_t stream = pb_ostream_from_buffer(client->DataBuffer, client->DataBufferSize);

    if (TopicHandler_BuildTopic(&client->TopicHandler, topic, client->TopicBuffer, client->TopicBufferSize) != TOPICHANDLER_ERROR_OK)
    {
        /* TODO error handling */
    }

    if (pb_encode(&stream, fields, srcStruct))
    {
        PubSubClient_Message_t message = {
            .Topic = client->TopicBuffer,
            .TopicSize = TopicHandler_StringLength(client->TopicBuffer),
            .Data = client->DataBuffer,
            .DataSize = stream.bytes_written,
        };

        PubSubClient_Publish(client->PubSubClient, message, true, PUBSUBCLIENT_QOS_1);
    }
    else
    {
        /* TODO error handling */
    }
}

static inline bool Client_ConfigureChannel(const Client_t *const client, const Client_ChannelNumber_t number, const Client_ChannelType_t type)
{
    bool configured = false;

    if (client->ConfigureChannel != NULL)
    {
        configured = client->ConfigureChannel(number, type);
    }

    return configured;
}

static inline bool Client_SetChannel(const Client_t *const client, const Client_Channel_t channel)
{
    bool set = false;

    if (client->SetChannel != NULL)
    {
        set = client->SetChannel(channel);
    }

    return set;
}

static inline bool Client_GetChannels(const Client_t *const client, Client_ChannelList_t *const channelList)
{
    bool get = false;

    if (client->GetChannels != NULL)
    {
        get = client->GetChannels(channelList);
    }

    return get;
}

static bool Client_PbEncodeString(pb_ostream_t *stream, const pb_field_iter_t *field, void *const *arg)
{
    bool encoded = false;
    const char *string = (const char *)(*arg);

    if (pb_encode_tag_for_field(stream, field))
    {
        encoded = pb_encode_string(stream, (uint8_t *)string, strlen(string));
    }

    return encoded;
}

static bool Client_PbEncodeIpAddress(pb_ostream_t *stream, const pb_field_iter_t *field, void *const *arg)
{
    bool encoded = false;

    if (pb_encode_tag_for_field(stream, field))
    {
        encoded = pb_encode_string(stream, (uint8_t *)(*arg), CLIENT_IP_ADDRESS_SIZE);
    }

    return encoded;
}

static bool Client_PbDecodeChannelConfiguration(pb_istream_t *stream, const pb_field_t *field, void **arg)
{
    (void)(field); /* TODO unused */

    bool decoded = false;
    size_t bytesLeft = stream->bytes_left;
    Client_t *client = (Client_t *)(*arg);

    /* TODO user pb_decode_tag? */

    static uint8_t buffer[8U] = {0U}; /* TODO move static allocation outside function */

    if (bytesLeft <= sizeof(buffer) && pb_read(stream, buffer, bytesLeft))
    {
        pb_istream_t istream = pb_istream_from_buffer(buffer, bytesLeft);
        nml_ChannelConfiguration channelConfig = nml_ChannelConfiguration_init_zero;

        if (pb_decode(&istream, nml_ChannelConfiguration_fields, &channelConfig))
        {
            switch (channelConfig.type)
            {
            case nml_ChannelType_CHANNELTYPE_GENERIC_DIGITAL_OUTPUT:
                Client_ConfigureChannel(client, channelConfig.number, CLIENT_CHANNELTYPE_GENERIC_DIGITAL_OUTPUT); /* TODO error handling */
                break;
            case nml_ChannelType_CHANNELTYPE_GENERIC_DIGITAL_INPUT:
                Client_ConfigureChannel(client, channelConfig.number, CLIENT_CHANNELTYPE_GENERIC_DIGITAL_INPUT);
                break;
            case nml_ChannelType_CHANNELTYPE_GENERIC_ANALOG_OUTPUT:
                Client_ConfigureChannel(client, channelConfig.number, CLIENT_CHANNELTYPE_GENERIC_ANALOG_OUTPUT);
                break;
            case nml_ChannelType_CHANNELTYPE_GENERIC_ANALOG_INPUT:
                Client_ConfigureChannel(client, channelConfig.number, CLIENT_CHANNELTYPE_GENERIC_ANALOG_INPUT);
                break;
            default:
                /* TODO error handling */
                break;
            }
        }

        decoded = true;
    }

    return decoded;
}

static bool Client_PbDecodeChannel(pb_istream_t *stream, const pb_field_t *field, void **arg)
{
    (void)(field); /* TODO unused */

    bool decoded = false;
    size_t bytesLeft = stream->bytes_left;
    Client_t *client = (Client_t *)(*arg);

    /* TODO user pb_decode_tag? */

    static uint8_t buffer[8U] = {0U}; /* TODO move static allocation outside function */

    if (bytesLeft <= sizeof(buffer) && pb_read(stream, buffer, bytesLeft))
    {
        pb_istream_t istream = pb_istream_from_buffer(buffer, bytesLeft);
        nml_Channel nmlChannel = nml_Channel_init_zero;

        if (pb_decode(&istream, nml_Channel_fields, &nmlChannel))
        {
            Client_Channel_t channel = {
                .Number = nmlChannel.number,
                .State = nmlChannel.state,
            };

            Client_SetChannel(client, channel); /* TODO error handling */
        }

        decoded = true;
    }

    return decoded;
}

static bool Client_PbEncodeChannels(pb_ostream_t *stream, const pb_field_iter_t *field, void *const *arg)
{
    (void)(field); /* TODO unused */

    bool encoded = false;
    Client_t *client = (Client_t *)(*arg);
    Client_ChannelList_t channelList;

    static uint8_t buffer[8U] = {0U}; /* TODO move static allocation outside function */

    if (Client_GetChannels(client, &channelList))
    {
        nml_Channel nmlChannel = nml_Channel_init_zero;
        pb_ostream_t ostream;
        Client_Channel_t *channel;
        size_t i = 0UL;
        encoded = true;

        while (encoded && i < channelList.Count)
        {
            channel = channelList.Channels + i;
            ostream = pb_ostream_from_buffer(buffer, sizeof(buffer));
            nmlChannel.number = channel->Number;
            nmlChannel.state = channel->State;

            if (!pb_encode(&ostream, nml_Channel_fields, &nmlChannel) || !pb_write(stream, buffer, ostream.bytes_written))
            {
                encoded = false;
            }

            i++;
        }
    }

    return encoded;
}