#include "esp_log.h"
#include "freertos/FreeRTOS.h"
#include "freertos/semphr.h"
#include "Mqtt.h"
#include "PubSubClientInit.h"

#define MQTT_TOPIC_BUFFER_SIZE 1024U
#define MQTT_DATA_BUFFER_SIZE 1024U

static const char *Mqtt_LogTag = "MQTT";
static esp_mqtt_client_handle_t Mqtt_Client;
static esp_mqtt_client_config_t Mqtt_Cfg;

SemaphoreHandle_t Mqtt_MessageBufferMutex = NULL;
StaticSemaphore_t Mqtt_MessageBufferMutexBuffer;
static char Mqtt_TopicBuffer[MQTT_TOPIC_BUFFER_SIZE];
static uint8_t Mqtt_DataBuffer[MQTT_DATA_BUFFER_SIZE];
static PubSubClient_Message_t Mqtt_Message = PUBSUBCLIENT_MESSAGE_INIT_NULL;

static void Mqtt_EventHandler(void *handlerArgs, esp_event_base_t base, int32_t eventId, void *eventData);
static void Mqtt_LogNonZeroError(const char *message, int error_code);

bool Mqtt_Init(const char *const uri, const char *const uuid)
{
    Mqtt_MessageBufferMutex = xSemaphoreCreateMutexStatic(&Mqtt_MessageBufferMutexBuffer);

    Mqtt_Cfg.broker.address.uri = uri;
    Mqtt_Cfg.credentials.client_id = uuid;

    esp_log_level_set("*", ESP_LOG_INFO);
    esp_log_level_set("mqtt_client", ESP_LOG_VERBOSE);
    esp_log_level_set("TRANSPORT_BASE", ESP_LOG_VERBOSE);
    esp_log_level_set("esp-tls", ESP_LOG_VERBOSE);
    esp_log_level_set("TRANSPORT", ESP_LOG_VERBOSE);
    esp_log_level_set("outbox", ESP_LOG_VERBOSE);

    /* TODO return based on error code? */
    return true;
}

bool Mqtt_Deinit(void)
{
    /* TODO Deinit? */

    return true;
}

bool Mqtt_Connect(const char *const uuid, const char *const token, const PubSubClient_Will_t *const will)
{
    Mqtt_Cfg.credentials.username = uuid;
    Mqtt_Cfg.credentials.authentication.password = token;
    Mqtt_Client = esp_mqtt_client_init(&Mqtt_Cfg);

    esp_mqtt_client_register_event(Mqtt_Client, MQTT_EVENT_ANY, Mqtt_EventHandler, NULL);
    esp_mqtt_client_start(Mqtt_Client);

    /* TODO set will */

    /* TODO return based on error code? */
    return true;
}

bool Mqtt_Disconnect(void)
{
    esp_mqtt_client_disconnect(Mqtt_Client);

    /* TODO return based on error code? */
    return true;
}

bool Mqtt_Subscribe(const char *const topic, const PubSubClient_Qos_t qos)
{
    esp_mqtt_client_subscribe_single(Mqtt_Client, topic, qos);

    /* TODO return based on error code? */
    return true;
}

bool Mqtt_Unsubscribe(const char *const topic)
{
    esp_mqtt_client_unsubscribe(Mqtt_Client, topic);

    /* TODO return based on error code? */
    return true;
}

bool Mqtt_Publish(const PubSubClient_Message_t message, const bool retained, const PubSubClient_Qos_t qos)
{
    esp_mqtt_client_publish(Mqtt_Client, message.TopicBuffer, (const char *const)message.DataBuffer, message.DataSize, qos, retained);

    /* TODO return based on error code? */
    return true;
}

bool Mqtt_GetMessage(PubSubClient_Message_t *const message)
{
    bool messageReceived = false;

    if (xSemaphoreTake(Mqtt_MessageBufferMutex, portMAX_DELAY) == pdTRUE)
    {
        if (Mqtt_Message.TopicSize > message->TopicBufferSize || Mqtt_Message.DataSize > message->DataBufferSize)
        {
            ESP_LOGE(Mqtt_LogTag, "Insufficient size to buffer MQTT message");
        }
        else
        {
            memcpy(message->TopicBuffer, Mqtt_Message.TopicBuffer, Mqtt_Message.TopicSize);
            message->TopicSize = Mqtt_Message.TopicSize;
            memcpy(message->DataBuffer, Mqtt_Message.DataBuffer, Mqtt_Message.DataSize);
            message->DataSize = Mqtt_Message.DataSize;

            messageReceived = true;
        }

        xSemaphoreGive(Mqtt_MessageBufferMutex);
    }

    return messageReceived;
}

/*
 * @brief Event handler registered to receive MQTT events
 *
 *  This function is called by the MQTT client event loop.
 *
 * @param handlerArgs user data registered to the event.
 * @param base Event base for the handler(always MQTT Base in this example).
 * @param eventId The id for the received event.
 * @param event_data The data for the event, esp_mqtt_event_handle_t.
 */
static void Mqtt_EventHandler(void *handlerArgs, esp_event_base_t base, int32_t eventId, void *eventData)
{
    ESP_LOGD(Mqtt_LogTag, "Event dispatched from event loop base=%s, eventId=%" PRIi32 "", base, eventId);

    esp_mqtt_event_handle_t event = eventData;
    // esp_mqtt_client_handle_t client = event->client;

    switch ((esp_mqtt_event_id_t)eventId)
    {
    case MQTT_EVENT_CONNECTED:
        /* TODO on connect callback */
        ESP_LOGI(Mqtt_LogTag, "MQTT connected");
        break;
    case MQTT_EVENT_DISCONNECTED:
        ESP_LOGI(Mqtt_LogTag, "MQTT disconnected");
        break;
    case MQTT_EVENT_SUBSCRIBED:
        /* TODO on subscribe callback */
        ESP_LOGI(Mqtt_LogTag, "MQTT_EVENT_SUBSCRIBED, msg_id=%d", event->msg_id);
        break;
    case MQTT_EVENT_UNSUBSCRIBED:
        ESP_LOGI(Mqtt_LogTag, "MQTT_EVENT_UNSUBSCRIBED, msg_id=%d", event->msg_id);
        break;
    case MQTT_EVENT_PUBLISHED:
        /* TODO on publish callback */
        ESP_LOGD(Mqtt_LogTag, "MQTT_EVENT_PUBLISHED, msg_id=%d", event->msg_id);
        break;
    case MQTT_EVENT_DATA:
        ESP_LOGD(Mqtt_LogTag, "MQTT_EVENT_DATA");
        ESP_LOGD(Mqtt_LogTag, "TOPIC=%.*s\r\n", event->topic_len, event->topic);
        ESP_LOGD(Mqtt_LogTag, "DATA=%.*s\r\n", event->data_len, event->data);

        if (xSemaphoreTake(Mqtt_MessageBufferMutex, portMAX_DELAY) == pdTRUE)
        {
            if (event->topic_len > sizeof(Mqtt_TopicBuffer) || event->data_len > sizeof(Mqtt_DataBuffer))
            {
                ESP_LOGE(Mqtt_LogTag, "Insufficient size to buffer MQTT message");
            }
            else
            {
                memcpy(Mqtt_TopicBuffer, event->topic, event->topic_len);
                memcpy(Mqtt_DataBuffer, event->data, event->data_len);

                Mqtt_Message.TopicBuffer = Mqtt_TopicBuffer;
                Mqtt_Message.TopicBufferSize = sizeof(Mqtt_TopicBuffer);
                Mqtt_Message.TopicSize = event->topic_len;
                Mqtt_Message.DataBuffer = Mqtt_DataBuffer;
                Mqtt_Message.DataBufferSize = sizeof(Mqtt_DataBuffer);
                Mqtt_Message.DataSize = event->data_len;
            }

            xSemaphoreGive(Mqtt_MessageBufferMutex);
        }

        break;
    case MQTT_EVENT_ERROR:
        ESP_LOGW(Mqtt_LogTag, "MQTT_EVENT_ERROR");
        if (event->error_handle->error_type == MQTT_ERROR_TYPE_TCP_TRANSPORT)
        {
            Mqtt_LogNonZeroError("reported from esp-tls", event->error_handle->esp_tls_last_esp_err);
            Mqtt_LogNonZeroError("reported from tls stack", event->error_handle->esp_tls_stack_err);
            Mqtt_LogNonZeroError("captured as transport's socket errno", event->error_handle->esp_transport_sock_errno);
            ESP_LOGI(Mqtt_LogTag, "Last errno string (%s)", strerror(event->error_handle->esp_transport_sock_errno));
        }
        break;
    default:
        ESP_LOGI(Mqtt_LogTag, "Other event id:%d", event->event_id);
        break;
    }
}

static void Mqtt_LogNonZeroError(const char *message, int error_code)
{
    if (error_code != 0)
    {
        ESP_LOGE(Mqtt_LogTag, "Last error %s: 0x%x", message, error_code);
    }
}