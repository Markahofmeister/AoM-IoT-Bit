from secrets import token_hex
from signal import signal, SIGTERM, SIGINT
from sys import exit as sys_exit
from time import sleep
from uuid import uuid4

from config_handler import ConfigHandler
from database_handler import DatabaseHandler_Clients, DatabaseHandler_Services
from env_vars import (
    MQTT_SERVER_HOST,
    MQTT_SERVER_PORT,
    MQTT_EXCHANGE,
    CONFIG_TOPIC,  # TODO update config topic
    CONFIG_ROUTING_KEY,
    RECONNECT_DELAY,
)
from logger import logger
from pub_sub_clients import RabbitMQClient

UUID = "service-" + str(uuid4())
TOKEN = token_hex()
AMQP_DELIMITER = "."
CONFIG_HANDLER = ConfigHandler(
    DatabaseHandler_Clients.client_auth,
    DatabaseHandler_Clients.get_client_configuration,
    AMQP_DELIMITER,
)


def handle_messages(message: bytes) -> None:
    """Handle messages from RabbitMQ and send responses"""
    logger.info("Config request received")
    topic, payload = CONFIG_HANDLER.handle_configure_request(CONFIG_TOPIC, message)
    logger.info("Publishing config to topic %s", topic)
    logger.debug(payload)
    rabbitmq_client.publish(topic, payload)


def signal_handler(signal_received, frame) -> None:
    """Perform graceful shutdown on SIGTERM or SIGINT"""
    logger.info("Recd %s from %s", signal_received, frame)
    logger.info("SIGTERM or SIGINT or CTRL-C detected. Exiting gracefully")

    # TODO verify stop consuming new messages
    # rabbitmq_client.stop()

    # Remove MQTT service authentication info from database
    if not DatabaseHandler_Services.delete_service(uuid=UUID):
        logger.warning("Failed to delete MQTT service %s from database", UUID)

    # Exit cleanly
    sys_exit(0)


signal(SIGINT, signal_handler)
signal(SIGTERM, signal_handler)


rabbitmq_client = RabbitMQClient(
    MQTT_SERVER_HOST,
    MQTT_SERVER_PORT,
    UUID,
    TOKEN,
    MQTT_EXCHANGE,
    queue=CONFIG_TOPIC,
    routing_key=CONFIG_ROUTING_KEY,
    on_message_callback=handle_messages,
)

if __name__ == "__main__":
    assert DatabaseHandler_Services.add_service(UUID, TOKEN)
    while True:
        rabbitmq_client.run()
        if rabbitmq_client.should_reconnect:
            rabbitmq_client.stop()
            logger.info("Reconnecting after %d seconds", RECONNECT_DELAY)
            sleep(RECONNECT_DELAY)
            rabbitmq_client = RabbitMQClient(
                MQTT_SERVER_HOST,
                MQTT_SERVER_PORT,
                UUID,
                TOKEN,
                MQTT_EXCHANGE,
                queue=CONFIG_TOPIC,
                routing_key=CONFIG_ROUTING_KEY,
                on_message_callback=handle_messages,
            )
