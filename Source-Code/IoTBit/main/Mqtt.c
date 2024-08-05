#include "esp_log.h"
#include "Mqtt.h"

static const char *Mqtt_LogTag = "MQTT";
static esp_mqtt_client_handle_t Mqtt_Client;

static void Mqtt_EventHandler(void *handlerArgs, esp_event_base_t base, int32_t eventId, void *eventData);
static void Mqtt_LogNonZeroError(const char *message, int error_code);

bool Mqtt_Init(const esp_mqtt_client_config_t *const mqttCfg)
{
    Mqtt_Client = esp_mqtt_client_init(mqttCfg);

    /* The last argument may be used to pass data to the event handler, in this example mqtt_event_handler */
    esp_mqtt_client_register_event(Mqtt_Client, MQTT_EVENT_ANY, Mqtt_EventHandler, NULL);

    esp_log_level_set("*", ESP_LOG_INFO);
    esp_log_level_set("mqtt_client", ESP_LOG_VERBOSE);
    esp_log_level_set("TRANSPORT_BASE", ESP_LOG_VERBOSE);
    esp_log_level_set("esp-tls", ESP_LOG_VERBOSE);
    esp_log_level_set("TRANSPORT", ESP_LOG_VERBOSE);
    esp_log_level_set("outbox", ESP_LOG_VERBOSE);

    // TODO return error code
    return true;
}

bool Mqtt_Connect(void)
{
    esp_mqtt_client_start(Mqtt_Client);

    // TODO return error code
    return true;
}

bool Mqtt_Subscribe(const char *const topic, const Mqtt_Qos_t qos)
{
    esp_mqtt_client_subscribe(Mqtt_Client, topic, qos);

    // TODO return error code
    return true;
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
        ESP_LOGI(Mqtt_LogTag, "MQTT connected");
        mqttHandleEventConnected(event);
        break;
    case MQTT_EVENT_DISCONNECTED:
        // TODO reconnect
        ESP_LOGI(Mqtt_LogTag, "MQTT disconnected");
        break;
    case MQTT_EVENT_SUBSCRIBED:
        // TODO start publishing device data
        ESP_LOGI(Mqtt_LogTag, "MQTT_EVENT_SUBSCRIBED, msg_id=%d", event->msg_id);
        break;
    case MQTT_EVENT_UNSUBSCRIBED:
        // TODO stop publishing device data
        ESP_LOGI(Mqtt_LogTag, "MQTT_EVENT_UNSUBSCRIBED, msg_id=%d", event->msg_id);
        break;
    case MQTT_EVENT_PUBLISHED:
        ESP_LOGD(Mqtt_LogTag, "MQTT_EVENT_PUBLISHED, msg_id=%d", event->msg_id);
        break;
    case MQTT_EVENT_DATA:
        ESP_LOGD(Mqtt_LogTag, "MQTT_EVENT_DATA");
        ESP_LOGD(Mqtt_LogTag, "TOPIC=%.*s\r\n", event->topic_len, event->topic);
        ESP_LOGD(Mqtt_LogTag, "DATA=%.*s\r\n", event->data_len, event->data);

        /* TODO subscribe to device topics after recevining client config */
        CmlHandler_HandlePayload(event->data, event->data_len);

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