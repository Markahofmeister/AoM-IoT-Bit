const TOPICHANDLER_TOPIC_NONE = 0
const TOPICHANDLER_TOPIC_BATTERY = 1
const TOPICHANDLER_TOPIC_STATUS = 2
const TOPICHANDLER_TOPIC_HEARTBEAT = 3
const TOPICHANDLER_TOPIC_WIFI = 4
const TOPICHANDLER_TOPIC_NETWORK = 5
const TOPICHANDLER_TOPIC_SET_CHANNEL = 6
const TOPICHANDLER_TOPIC_GET_CHANNEL = 7
const TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE = 8
const TOPICHANDLER_TOPIC_CONFIGURE_REQUEST = 9

const TOPICHANDLER_TOPLEVELTOPIC_NONE = 0
const TOPICHANDLER_TOPLEVELTOPIC_USER = 1
const TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST = 2

const TOPICHANDLER_USERTOPIC_NONE = 0
const TOPICHANDLER_USERTOPIC_CLIENT = 1

const TOPICHANDLER_TOPICSTATE_INIT = 0
const TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC = 1
const TOPICHANDLER_TOPICSTATE_USER_UUID = 2
const TOPICHANDLER_TOPICSTATE_USER_TOPIC = 3
const TOPICHANDLER_TOPICSTATE_CLIENT_UUID = 4
const TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC = 5
const TOPICHANDLER_TOPICSTATE_DONE = 6

const TopicHandler_TopLevelTopics = ["", "user", "configure-request"]
const TopicHandler_UserTopics = ["", "client"]
const TopicHandler_ClientTopics = [
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

export class TopicHandler {
    constructor(userUuid, clientUuid, delimiter) {
        this.userUuid = userUuid
        this.clientUuid = clientUuid
        this.delimiter = delimiter
    }

    setUserUuid = userUuid => {
        this.userUuid = userUuid
    }

    setClientUuid = clientUuid => {
        this.clientUuid = clientUuid
    }

    setDelimiter = delimiter => {
        this.delimiter = delimiter
    }

    parseTopLevelTopic = token => {
        let nextState = TOPICHANDLER_TOPICSTATE_DONE
        let topic = TOPICHANDLER_TOPIC_NONE

        if (TopicHandler_TopLevelTopics.includes(token)) {
            const topLevelTopic = TopicHandler_TopLevelTopics.indexOf(token)

            if (topLevelTopic === TOPICHANDLER_TOPLEVELTOPIC_USER) {
                nextState = TOPICHANDLER_TOPICSTATE_USER_UUID
            }
            else if (topLevelTopic === TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST) {
                topic = TOPICHANDLER_TOPIC_CONFIGURE_REQUEST
            }
        }

        return [nextState, topic]
    }

    parseUserUuid = token => {
        if (token === this.userUuid) {
            return [TOPICHANDLER_TOPICSTATE_USER_TOPIC, TOPICHANDLER_TOPIC_NONE]
        }

        return [TOPICHANDLER_TOPICSTATE_DONE, TOPICHANDLER_TOPIC_NONE]
    }

    parseUserTopic = token => {
        let nextState = TOPICHANDLER_TOPICSTATE_DONE
        let topic = TOPICHANDLER_TOPIC_NONE

        if (TopicHandler_UserTopics.includes(token)) {
            const user_topic = TopicHandler_UserTopics.indexOf(token)

            if (user_topic === TOPICHANDLER_USERTOPIC_CLIENT) {
                nextState = TOPICHANDLER_TOPICSTATE_CLIENT_UUID
            }
        }

        return [nextState, topic]
    }

    parseClientUuid = token => {
        if (token === this.clientUuid) {
            return [TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC, TOPICHANDLER_TOPIC_NONE]
        }

        return [TOPICHANDLER_TOPICSTATE_DONE, TOPICHANDLER_TOPIC_NONE]
    }

    parseClientTopic = token => {
        let topic = TOPICHANDLER_TOPIC_NONE

        if (TopicHandler_ClientTopics.includes(token)) {
            topic = TopicHandler_ClientTopics.indexOf(token)
        }

        return [TOPICHANDLER_TOPICSTATE_DONE, topic]
    }

    parseTopic = string => {
        let state = TOPICHANDLER_TOPICSTATE_INIT
        const tokenized = string.split(this.delimiter)
        let token = 0
        let topic = TOPICHANDLER_TOPIC_NONE

        while (token < tokenized.length && state !== TOPICHANDLER_TOPICSTATE_DONE) {
            if (state === TOPICHANDLER_TOPICSTATE_INIT) {
                state = TOPICHANDLER_TOPICSTATE_DONE

                if (tokenized[token].length === 0) {
                    state = TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC
                }
            }
            else if (state === TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC) {
                [state, topic] = this.parseTopLevelTopic(tokenized[token])
            }
            else if (state === TOPICHANDLER_TOPICSTATE_USER_UUID) {
                [state, topic] = this.parseUserUuid(tokenized[token])
            }
            else if (state === TOPICHANDLER_TOPICSTATE_USER_TOPIC) {
                [state, topic] = this.parseUserTopic(tokenized[token])
            }
            else if (state === TOPICHANDLER_TOPICSTATE_CLIENT_UUID) {
                [state, topic] = this.parseClientUuid(tokenized[token])
            }
            else if (state === TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC) {
                [state, topic] = this.parseClientTopic(tokenized[token])
            }

            token += 1
        }

        return topic
    }

    buildClientTopic = topic => {
        let string = ""

        if (topic < TopicHandler_ClientTopics.length) {
            let state = TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC

            while (state !== TOPICHANDLER_TOPICSTATE_DONE) {
                string += this.delimiter

                if (state === TOPICHANDLER_TOPICSTATE_TOP_LEVEL_TOPIC) {
                    string += TopicHandler_TopLevelTopics[TOPICHANDLER_TOPLEVELTOPIC_USER]
                    state = TOPICHANDLER_TOPICSTATE_USER_UUID
                }
                else if (state === TOPICHANDLER_TOPICSTATE_USER_UUID) {
                    string += this.userUuid
                    state = TOPICHANDLER_TOPICSTATE_USER_TOPIC
                }
                else if (state === TOPICHANDLER_TOPICSTATE_USER_TOPIC) {
                    string += TopicHandler_UserTopics[TOPICHANDLER_USERTOPIC_CLIENT]
                    state = TOPICHANDLER_TOPICSTATE_CLIENT_UUID
                }
                else if (state === TOPICHANDLER_TOPICSTATE_CLIENT_UUID) {
                    string += this.clientUuid
                    state = TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC
                }
                else if (state === TOPICHANDLER_TOPICSTATE_CLIENT_TOPIC) {
                    string += TopicHandler_ClientTopics[topic]
                    state = TOPICHANDLER_TOPICSTATE_DONE
                }
            }
        }

        return string
    }

    buildTopic = topic => {
        let string = ""

        if (topic > TOPICHANDLER_TOPIC_NONE && topic <= TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE) {
            string = this.buildClientTopic(topic)
        }
        else if (topic === TOPICHANDLER_TOPIC_CONFIGURE_REQUEST) {
            string += this.delimiter
            string += TopicHandler_TopLevelTopics[TOPICHANDLER_TOPLEVELTOPIC_CONFIGURE_REQUEST]
        }

        return string
    }
}


export { TOPICHANDLER_TOPIC_NONE }
export { TOPICHANDLER_TOPIC_BATTERY }
export { TOPICHANDLER_TOPIC_STATUS }
export { TOPICHANDLER_TOPIC_HEARTBEAT }
export { TOPICHANDLER_TOPIC_WIFI }
export { TOPICHANDLER_TOPIC_NETWORK }
export { TOPICHANDLER_TOPIC_SET_CHANNEL }
export { TOPICHANDLER_TOPIC_GET_CHANNEL }
export { TOPICHANDLER_TOPIC_CONFIGURE_RECEIVE }
export { TOPICHANDLER_TOPIC_CONFIGURE_REQUEST }