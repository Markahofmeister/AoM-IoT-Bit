const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CHANNELTYPE_GENERIC_DIGITAL_OUTPUT = 0
const CHANNELTYPE_GENERIC_DIGITAL_INPUT = 1
const CHANNELTYPE_GENERIC_ANALOG_OUTPUT = 2
const CHANNELTYPE_GENERIC_ANALOG_INPUT = 3

const ChannelSchema = new Schema(
    {
        number: {
            type: Number,
            required: true
        },
        type: {
            type: Number,
            required: true,
            enum: [
                CHANNELTYPE_GENERIC_DIGITAL_OUTPUT,
                CHANNELTYPE_GENERIC_DIGITAL_INPUT,
                CHANNELTYPE_GENERIC_ANALOG_OUTPUT,
                CHANNELTYPE_GENERIC_ANALOG_INPUT
            ]
        }
    },
    {
        versionKey: false
    }
)

const ClientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        uuid: {
            type: String,
            minlength: 36,
            required: true,
            unique: true,
            trim: true
        },
        token: {
            type: String,
            required: true,
            trim: true
        },
        user_uuid: {
            type: String,
            minlength: 36,
            required: true,
            trim: true
        },
        channels: {
            type: Array,
            of: ChannelSchema,
            required: true,
        }
    },
    {
        versionKey: false
    }
)

module.exports = Client = mongoose.model("clients", ClientSchema)
