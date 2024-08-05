import { Component } from "react"
import { editIcon, checkIcon, deleteIcon, checkCircleIcon, xCircleIcon } from "../icons/icons"
import { TopicHandler, TOPICHANDLER_TOPIC_GET_CHANNEL, TOPICHANDLER_TOPIC_STATUS } from "./TopicHandler"
import DigitalInputChannel from "./Channels/DigitalInputChannel"
import DigitalOutputChannel from "./Channels/DigitalOutputChannel"
const MessageLayer = require("./MessageLayer")

const ChannelTypes = {
    0: "Generic Digital Output",
    1: "Generic Digital Input",
    2: "Generic Analog Output",
    3: "Generic Analog Input"
}

export default class ClientCard extends Component {

    topicHandler = new TopicHandler(this.props.client.user_uuid, this.props.client.uuid, "/")

    state = {
        edit: false,
        name: this.props.client.name,
        connected: "Disconnected",
        channels: this.props.client.channels,
        channelStates: {},
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onChannelTypeChange = e => {
        let channels = this.state.channels
        channels[e.target.id]["type"] = parseInt(e.target.value)
        this.setState({
            channels: channels
        })
    }

    setEdit = edit => {
        this.setState({
            edit: edit
        })
    }

    handleStatusMsg = msgBytes => {
        let status = MessageLayer.nml.Status.decode(msgBytes)

        this.setState({
            connected: (MessageLayer.nml.StatusState.STATUS_STATE_ONLINE === status.state) ? "Connected" : "Disconnected"
        })
    }

    handleGetChannelMsg = msgBytes => {
        let getChannel = MessageLayer.nml.GetChannel.decode(msgBytes)
        let channelStates = this.state.channelStates

        console.log(getChannel)

        getChannel.channel.forEach(channel => {
            channelStates[channel.number] = channel.state
        })

        this.setState({
            channelStates: channelStates
        })
    }

    handleMsg = (topic, msgBytes) => {
        const parsedTopic = this.topicHandler.parseTopic(topic)

        switch (parsedTopic) {
            case TOPICHANDLER_TOPIC_STATUS:
                this.handleStatusMsg(msgBytes)
                break
            case TOPICHANDLER_TOPIC_GET_CHANNEL:
                this.handleGetChannelMsg(msgBytes)
                break
            default:
                break
        }
    }

    setChannel = (number, state) => {
        console.log(number, state)
    }

    getControls = channel => {
        let controls = <></>

        switch (channel.type) {
            case MessageLayer.nml.ChannelType.CHANNELTYPE_GENERIC_DIGITAL_INPUT:
                controls =
                    <DigitalInputChannel
                        state={this.state.channelStates[channel.number]}
                    />
                break
            case MessageLayer.nml.ChannelType.CHANNELTYPE_GENERIC_DIGITAL_OUTPUT:
                controls =
                    <DigitalOutputChannel
                        state={this.state.channelStates[channel.number]}
                        connected={this.state.connected}
                        number={channel.number}
                        setChannel={this.setChannel}
                    />
                break
            default:
                break;
        }

        return controls
    }

    render() {
        return (
            <div className="card text-white bg-primary pb-3" style={{ maxWidth: (this.props.maxWidth ? this.props.maxWidth : "24.7%") }}>
                <div className="card-header d-flex justify-content-between align-items-center" style={{ fontWeight: "bold" }}>
                    {(this.state.edit) ? <input type="text" className="form-control border-secondary" id="name" onChange={this.onChange} value={this.state.name} placeholder={this.state.name}></input> : this.props.client.name}
                    <div>
                        {(this.state.edit)
                            ? <>
                                <div className="btn text-success" onClick={() => {
                                    this.props.editClient(this.props.client.uuid, this.state.name, this.state.channels)
                                    this.setEdit(false)
                                }}>{checkIcon}</div>
                            </>
                            : <>
                                <div className="btn text-warning" onClick={() => this.setEdit(true)}>{editIcon}</div>
                                <div className="btn text-danger" onClick={() => this.props.deleteClient(this.props.client.uuid)}>{deleteIcon}</div>
                            </>
                        }
                    </div>
                </div>
                <div className="card-body bg-primary">
                    <p className="card-text">Status:&ensp;{(this.state.connected === "Connected") ? <span className="text-success">{checkCircleIcon}Connected</span> : <span className="text-danger">{xCircleIcon}Disconnected</span>}</p>
                    {/* <p className="card-text">Channels:</p> */}
                    {this.state.channels.map(channel =>
                        <div key={channel.number}>
                            <div className="d-flex">
                                <p className="text-secondary">
                                    <span className="text-light" style={{ fontWeight: "bold" }}>&#8627;&ensp;Channel {channel.number}</span>
                                    <br />
                                    Type: {(this.state.edit) ?
                                        <select className="form-control mb-2" id={channel.number} value={this.state.channels[channel.number].type} onChange={this.onChannelTypeChange}>
                                            {Object.keys(ChannelTypes).map(key => <option key={key} value={key}>{ChannelTypes[key]}</option>)}
                                        </select>
                                        : ChannelTypes[channel.type]}
                                </p>
                            </div>
                            {this.getControls(channel)}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
