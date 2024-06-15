from os import environ

HOST = environ.get("HOST", "localhost")
PORT = int(environ.get("PORT", "5672"))
USERNAME = environ.get("USERNAME", "guest")
PASSWORD = environ.get("PASSWORD", "guest")
MONGOURI = environ.get("MONGOURI", "")
PROD_DEV_ENV = environ.get("PROD_DEV_ENV", "DEV_ENV")
MQTT_SERVER_HOST = environ.get("MQTT_SERVER_HOST", "localhost")
MQTT_SERVER_PORT = int(environ.get("MQTT_SERVER_PORT", "5672"))
MQTT_EXCHANGE = environ.get("MQTT_EXCHANGE", "amq.topic")
CONFIG_TOPIC = environ.get("GET_CONFIG_TOPIC", ".configure-request")
CONFIG_ROUTING_KEY = environ.get("CONFIG_ROUTING_KEY", ".configure-request")
RECONNECT_DELAY = int(environ.get("RECONNECT_DELAY", "5"))
MESSAGE_LAYER_PATH = environ.get("MESSAGE_LAYER_PATH", "../MessageLayer/out/python")

if __name__ == "__main__":
    pass
