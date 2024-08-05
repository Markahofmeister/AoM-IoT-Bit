import { Component, createRef } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { toast } from "react-toastify"
import axios from "axios"
import ClientCard from "../../components/ClientCard"
import MQTTClient from "../../components/MQTTClient"
import { TopicHandler, TOPICHANDLER_TOPIC_GET_CHANNEL, TOPICHANDLER_TOPIC_SET_CHANNEL, TOPICHANDLER_TOPIC_STATUS } from "../../components/TopicHandler"
import { Subscriber, Broker } from "../../components/PubSub"

class AllClients extends Component {

    broker = new Broker()

    topicHandler = new TopicHandler("", "", "/")

    state = {
        clients: [],
        errors: {},
        connected: false,
        reconnectTimeout: 1500,
        refs: {},
        subscribers: {}
    }

    messageHandler = message => {
        this.broker.publish(message.destinationName, message.payloadBytes)
    }

    componentDidMount() {
        this.mqttClient = new MQTTClient(this.props.auth.user.id, "password", [], this.setConnected, this.messageHandler)
        this.getClients()
        this.mqttClient.connect()
        this.intervalID = setTimeout(this.connectToServer.bind(this), this.state.reconnectTimeout)
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID)
        this.mqttClient.disconnect()
    }

    setConnected = () => {
        this.setState({
            connected: true
        })
    }

    connectToServer = () => {
        this.mqttClient.connect()
        if (!this.mqttClient.connected) {
            this.setState({
                reconnectTimeout: this.state.reconnectTimeout * 2
            })
            toast.error("Failed to connect to server")
            this.intervalID = setTimeout(this.connectToServer.bind(this), this.state.reconnectTimeout)
        }
        else {
            this.setState({
                reconnectTimeout: 5000
            })
            toast.success("Connected to server")
        }
    }

    getClients() {
        const reqData = { user_id: this.props.auth.user.id }
        axios
            .post("/client/all", reqData)
            .then(res => {
                this.setState({
                    clients: res.data
                })
                res.data.forEach(client => {
                    this.topicHandler.setUserUuid(client.user_uuid)
                    this.topicHandler.setClientUuid(client.uuid)

                    const topics = [
                        this.topicHandler.buildTopic(TOPICHANDLER_TOPIC_STATUS),
                        this.topicHandler.buildTopic(TOPICHANDLER_TOPIC_GET_CHANNEL)
                    ]

                    let updatedRefs = this.state.refs
                    updatedRefs[client.uuid] = createRef()
                    this.setState({
                        refs: updatedRefs
                    })

                    let updateSubscribers = this.state.subscribers
                    updateSubscribers[client.uuid] = new Subscriber((topic, data) => updatedRefs[client.uuid].current.handleMsg(topic, data))
                    this.setState({
                        subscribers: updateSubscribers
                    }, () => {
                        topics.forEach(topic => {
                            this.broker.subscribe(this.state.subscribers[client.uuid], topic)
                            this.mqttClient.subscribe(topic)
                        })
                    })
                })
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
                toast.error("Failed to get clients")
            })
    }

    editClient = (uuid, name, channels) => {
        const updateClient = { user_id: this.props.auth.user.id, uuid: uuid, name: name, channels: channels }
        axios
            .post("/client/update", updateClient)
            .then(() => {
                this.getClients()
                toast.success("Successfully edited client")
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
                toast.error("Failed to edited client")
            })
    }

    deleteClient = uuid => {
        const reqData = { user_id: this.props.auth.user.id, uuid: uuid }
        axios
            .post("/client/delete", reqData)
            .then(() => {
                this.getClients()
                toast.success("Successfully deleted client")
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
                toast.error("Failed to delete client")
            }
            )
    }

    render() {
        return (
            <div className="row justify-content-left p-1 gap-1">
                {this.state.clients.map(client =>
                    <ClientCard
                        key={client.uuid}
                        ref={this.state.refs[client.uuid]}
                        client={client}
                        editClient={this.editClient}
                        deleteClient={this.deleteClient}
                    />
                )}
                <div className="card text-white bg-primary" style={{ maxWidth: "24.7%" }} >
                    <Link style={{ textDecoration: "none" }} to="new_client">
                        <div className="card-body bg-primary">
                            <div className="bg-dark d-grid text-center py-5 rounded">
                                <h3 className="text-white">Add Client</h3>
                                <h2 className="text-white">+</h2>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

AllClients.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(
    mapStateToProps
)(AllClients)
