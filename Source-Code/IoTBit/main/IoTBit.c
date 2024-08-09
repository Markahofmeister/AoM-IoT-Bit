#include "Client.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "Mqtt.h"
#include "nvs_flash.h"
#include "Wifi.h"

#define IOTBIT_BUFFER_SIZE 1024
#define IOTBIT_CHANNEL_INIT_STATE 0

typedef enum
{
    IOTBIT_CHANNELID_0,
    IOTBIT_CHANNELID_1,
    IOTBIT_CHANNELID_MAX
} IotBit_ChannelId_t;

static const char *IotBit_Tag = "Iot Bit";
static PubSubClient_t IotBit_PubSubClient;
static PubSubClient_Interface_t IotBit_PubSubClientInterface = {
    .Init = Mqtt_Init,
    .Deinit = Mqtt_Deinit,
    .Connect = Mqtt_Connect,
    .Disconnect = Mqtt_Disconnect,
    .Subscribe = Mqtt_Subscribe,
    .Unsubscribe = Mqtt_Unsubscribe,
    .Publish = Mqtt_Publish,
    .GetMessage = Mqtt_GetMessage,
};
static Client_t IotBit_Nc2Client;
static TopicHandler_t IotBit_TopicHandler;
static uint8_t IotBit_TopicHandlerBuffer[IOTBIT_BUFFER_SIZE];
static char IotBit_TopicBuffer[IOTBIT_BUFFER_SIZE];
static uint8_t IotBit_DataBuffer[IOTBIT_BUFFER_SIZE];
static Client_Channel_t IotBit_Channels[IOTBIT_CHANNELID_MAX] = {
    {.Number = IOTBIT_CHANNELID_0, .State = IOTBIT_CHANNEL_INIT_STATE},
    {.Number = IOTBIT_CHANNELID_1, .State = IOTBIT_CHANNEL_INIT_STATE}};
static Client_ChannelList_t IotBit_ChannelList = {
    .Channels = IotBit_Channels,
    .Count = IOTBIT_CHANNELID_MAX,
};

static bool IotBit_ConfigureChannel(const Client_ChannelNumber_t number, const Client_ChannelType_t type);
static bool IotBit_SetChannel(const Client_Channel_t channel);
static bool IotBit_GetChannels(Client_ChannelList_t *const channelList);

void app_main(void)
{
    /* Startup message */
    ESP_LOGI(IotBit_Tag, "Startup...");
    ESP_LOGI(IotBit_Tag, "Free memory: %" PRIu32 " bytes", esp_get_free_heap_size());
    ESP_LOGI(IotBit_Tag, "IDF version: %s", esp_get_idf_version());

    /* Initialize NVS */
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND)
    {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    /* Initialize Wifi */
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    Wifi_Init();
    Wifi_Start();

    /* Initialize MQTT */
    PubSubClient_Init(&IotBit_PubSubClient, CONFIG_BROKER_URI, CONFIG_CLIENT_UUID, IotBit_PubSubClientInterface);
    Client_Init(&IotBit_Nc2Client, &IotBit_PubSubClient, IotBit_TopicBuffer, sizeof(IotBit_TopicBuffer), IotBit_DataBuffer, sizeof(IotBit_DataBuffer));
    Client_SetMethod(&IotBit_Nc2Client, CLIENT_METHOD_CONFIGURE_CHANNEL, IotBit_ConfigureChannel);
    Client_SetMethod(&IotBit_Nc2Client, CLIENT_METHOD_SET_CHANNEL, IotBit_SetChannel);
    Client_SetMethod(&IotBit_Nc2Client, CLIENT_METHOD_GET_CHANNELS, IotBit_GetChannels);

    /* Start MQTT */
    Client_Connect(&IotBit_Nc2Client, CONFIG_USER_UUID, CONFIG_CLIENT_UUID, CONFIG_CLIENT_TOKEN);

    /* TODO MQTT loop */

    /* TODO disconnect */
}

static bool IotBit_ConfigureChannel(const Client_ChannelNumber_t number, const Client_ChannelType_t type)
{
    /* TODO */

    bool configured = false;

    if (number < IotBit_ChannelList.Count)
    {
        IotBit_ChannelList.Channels[number].State = 0;

        ESP_LOGI(IotBit_Tag, "Configured channel %d: %d", (int)number, (int)type);

        configured = true;
    }

    return configured;
}

static bool IotBit_SetChannel(const Client_Channel_t channel)
{
    /* TODO */

    bool set = false;

    if (channel.Number < IotBit_ChannelList.Count)
    {
        IotBit_ChannelList.Channels[channel.Number].State = channel.State;

        ESP_LOGI(IotBit_Tag, "Set channel %d to state %d", (int)channel.Number, (int)channel.State);

        set = true;
    }

    return set;
}

static bool IotBit_GetChannels(Client_ChannelList_t *const channelList)
{
    /* TODO */

    *channelList = IotBit_ChannelList;

    ESP_LOGI(IotBit_Tag, "Get channels");

    return true;
}
