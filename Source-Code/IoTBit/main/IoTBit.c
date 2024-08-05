#include "Client.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "Mqtt.h"
#include "nvs_flash.h"
#include "Wifi.h"

static const char *APP_TAG = "APP";
static Client_t nc2Client;

void app_main(void)
{
    ESP_LOGI(APP_TAG, "Startup...");
    ESP_LOGI(APP_TAG, "Free memory: %" PRIu32 " bytes", esp_get_free_heap_size());
    ESP_LOGI(APP_TAG, "IDF version: %s", esp_get_idf_version());

    /* Initialize NVS */
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND)
    {
        ESP_ERROR_CHECK(nvs_flash_erase());
        ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);

    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    /* Initialize Wifi */
    Wifi_Init();
    Wifi_Start();

    /* Initialize MQTT client */
    esp_mqtt_client_config_t mqttCfg = {
        .broker.address.uri = CONFIG_BROKER_URI,
        .credentials.username = CONFIG_CLIENT_UUID,
        .credentials.client_id = CONFIG_CLIENT_UUID,
        .credentials.authentication.password = CONFIG_CLIENT_TOKEN,
    };
    Mqtt_Init(&mqttCfg);
}
