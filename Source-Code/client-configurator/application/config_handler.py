"""Build responses for configuration requests"""

from sys import path

from env_vars import MESSAGE_LAYER_PATH
from topic_handler import (
    TopicHandler,
    TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE,
    TOPICHANDLER_TOPIC_CONFIGURE_REQUEST,
)

path.append(MESSAGE_LAYER_PATH)
import authenticate_pb2


class ConfigHandler:
    def __init__(
        self,
        authenticate: callable,
        get_client_configuration: callable,
        topic_delimiter: str,
    ):
        self.authenticate = authenticate
        self.get_client_configuration = get_client_configuration
        self.topic_handler = TopicHandler("", "", topic_delimiter)

    def handle_configure_request(self, request_topic: str, request: bytes) -> list:
        receive_topic = ""
        serialized_configuration = b""
        authentication = authenticate_pb2.Authenticate()
        authentication.ParseFromString(request)

        if request_topic == self.topic_handler.build_topic(
            TOPICHANDLER_TOPIC_CONFIGURE_REQUEST
        ) and self.authenticate(
            authentication.user_uuid, authentication.client_uuid, authentication.token
        ):
            self.topic_handler.set_user_uuid(authentication.user_uuid)
            self.topic_handler.set_client_uuid(authentication.client_uuid)
            receive_topic = self.topic_handler.build_topic(
                TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE
            )
            configuration = self.get_client_configuration(authentication.client_uuid)
            if configuration is not None:
                serialized_configuration = configuration.SerializeToString()

        return [receive_topic, serialized_configuration]


if __name__ == "__main__":
    pass
