set(sources "Wifi.c")
set(includes "include")

idf_component_register(
    SRCS ${sources}
    INCLUDE_DIRS ${includes}
    REQUIRES Wifi esp_wifi nvs_flash
)
