TOPICHANDLER_TOPIC_NONE = 0
TOPICHANDLER_TOPIC_BATTERY = 1
TOPICHANDLER_TOPIC_STATUS = 2
TOPICHANDLER_TOPIC_HEARTBEAT = 3
TOPICHANDLER_TOPIC_WIFI = 4
TOPICHANDLER_TOPIC_NETWORK = 5
TOPICHANDLER_TOPIC_SET_CHANNEL = 6
TOPICHANDLER_TOPIC_GET_CHANNEL = 7
TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE = 8
TOPICHANDLER_TOPIC_CONFIGURE_REQUEST = 9

TOPICHANDLER_TOPLEVELTOPIC_NONE = 0
TOPICHANDLER_TOPLEVELTOPIC_USER = 1
TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST = 2

TOPICHANDLER_USERTOPIC_NONE = 0
TOPICHANDLER_USERTOPIC_CLIENT = 1

TOPICHANDLER_TOPICSTATE_INIT = 0
TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC = 1
TOPICHANDLER_TOPICSTATE_USER_UUID = 2
TOPICHANDLER_TOPICSTATE_USER_TOPIC = 3
TOPICHANDLER_TOPICSTATE_CLIENT_UUID = 4
TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC = 5
TOPICHANDLER_TOPICSTATE_DONE = 6

TopicHandler_TopLevelTopics = ["", "user", "configure-request"]
TopicHandler_UserTopics = ["", "client"]
TopicHandler_ClientTopics = [
    "",
    "battery",
    "status",
    "heartbeat",
    "wifi",
    "network",
    "set-channel",
    "get-channel",
    "configure-receive",
]


class TopicHandler:
    def __init__(self, user_uuid: str, client_uuid: str, delimiter: str):
        self.user_uuid = user_uuid
        self.client_uuid = client_uuid
        self.delimiter = delimiter

    def set_user_uuid(self, user_uuid: str) -> None:
        self.user_uuid = user_uuid

    def set_client_uuid(self, client_uuid: str) -> None:
        self.client_uuid = client_uuid

    def set_delimiter(self, delimiter: str) -> None:
        self.delimiter = delimiter

    def parse_top_level_topic(self, token: str) -> list:
        nextState = TOPICHANDLER_TOPICSTATE_DONE
        topic = TOPICHANDLER_TOPIC_NONE
        if token in TopicHandler_TopLevelTopics:
            top_level_topic = TopicHandler_TopLevelTopics.index(token)
            if top_level_topic == TOPICHANDLER_TOPLEVELTOPIC_USER:
                nextState = TOPICHANDLER_TOPICSTATE_USER_UUID
            elif top_level_topic == TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST:
                topic = TOPICHANDLER_TOPIC_CONFIGURE_REQUEST
        return [nextState, topic]

    def parse_user_uuid(self, token: str) -> list:
        if token == self.user_uuid:
            return [TOPICHANDLER_TOPICSTATE_USER_TOPIC, TOPICHANDLER_TOPIC_NONE]
        return [TOPICHANDLER_TOPICSTATE_DONE, TOPICHANDLER_TOPIC_NONE]

    def parse_user_topic(self, token: str) -> list:
        nextState = TOPICHANDLER_TOPICSTATE_DONE
        topic = TOPICHANDLER_TOPIC_NONE
        if token in TopicHandler_UserTopics:
            user_topic = TopicHandler_UserTopics.index(token)
            if user_topic == TOPICHANDLER_USERTOPIC_CLIENT:
                nextState = TOPICHANDLER_TOPICSTATE_CLIENT_UUID
        return [nextState, topic]

    def parse_client_uuid(self, token: str) -> list:
        if token == self.client_uuid:
            return [TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC, TOPICHANDLER_TOPIC_NONE]
        return [TOPICHANDLER_TOPICSTATE_DONE, TOPICHANDLER_TOPIC_NONE]

    def parse_client_topic(self, token: str) -> list:
        topic = TOPICHANDLER_TOPIC_NONE
        if token in TopicHandler_ClientTopics:
            topic = TopicHandler_ClientTopics.index(token)
        return [TOPICHANDLER_TOPICSTATE_DONE, topic]

    def parse_topic(self, string: str) -> int:
        state = TOPICHANDLER_TOPICSTATE_INIT
        tokenized = string.split(self.delimiter)
        token = 0
        topic = TOPICHANDLER_TOPIC_NONE
        while token < len(tokenized) and state != TOPICHANDLER_TOPICSTATE_DONE:
            if state == TOPICHANDLER_TOPICSTATE_INIT:
                state = TOPICHANDLER_TOPICSTATE_DONE
                if len(tokenized[token]) == 0:
                    state = TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC
            elif state == TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC:
                state, topic = self.parse_top_level_topic(tokenized[token])
            elif state == TOPICHANDLER_TOPICSTATE_USER_UUID:
                state, topic = self.parse_user_uuid(tokenized[token])
            elif state == TOPICHANDLER_TOPICSTATE_USER_TOPIC:
                state, topic = self.parse_user_topic(tokenized[token])
            elif state == TOPICHANDLER_TOPICSTATE_CLIENT_UUID:
                state, topic = self.parse_client_uuid(tokenized[token])
            elif state == TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC:
                state, topic = self.parse_client_topic(tokenized[token])
            token += 1
        return topic

    def build_client_topic(self, topic: int) -> str:
        string = ""
        if topic < len(TopicHandler_ClientTopics):
            state = TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC
            while state != TOPICHANDLER_TOPICSTATE_DONE:
                string += self.delimiter
                if state == TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC:
                    string += TopicHandler_TopLevelTopics[
                        TOPICHANDLER_TOPLEVELTOPIC_USER
                    ]
                    state = TOPICHANDLER_TOPICSTATE_USER_UUID
                elif state == TOPICHANDLER_TOPICSTATE_USER_UUID:
                    string += self.user_uuid
                    state = TOPICHANDLER_TOPICSTATE_USER_TOPIC
                elif state == TOPICHANDLER_TOPICSTATE_USER_TOPIC:
                    string += TopicHandler_UserTopics[TOPICHANDLER_USERTOPIC_CLIENT]
                    state = TOPICHANDLER_TOPICSTATE_CLIENT_UUID
                elif state == TOPICHANDLER_TOPICSTATE_CLIENT_UUID:
                    string += self.client_uuid
                    state = TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC
                elif state == TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC:
                    string += TopicHandler_ClientTopics[topic]
                    state = TOPICHANDLER_TOPICSTATE_DONE
        return string

    def build_topic(self, topic: int) -> str:
        string = ""
        if topic > TOPICHANDLER_TOPIC_NONE and topic <= TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE:
            string = self.build_client_topic(topic)
        elif topic == TOPICHANDLER_TOPIC_CONFIGURE_REQUEST:
            string += self.delimiter
            string += TopicHandler_TopLevelTopics[
                TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST
            ]
        return string


if __name__ == "__main__":
    pass
