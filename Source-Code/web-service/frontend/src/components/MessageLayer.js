/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.nml = (function() {
    
        /**
         * Namespace nml.
         * @exports nml
         * @namespace
         */
        var nml = {};
    
        nml.Authenticate = (function() {
    
            /**
             * Properties of an Authenticate.
             * @memberof nml
             * @interface IAuthenticate
             * @property {string|null} [userUuid] Authenticate userUuid
             * @property {string|null} [clientUuid] Authenticate clientUuid
             * @property {string|null} [token] Authenticate token
             */
    
            /**
             * Constructs a new Authenticate.
             * @memberof nml
             * @classdesc Represents an Authenticate.
             * @implements IAuthenticate
             * @constructor
             * @param {nml.IAuthenticate=} [properties] Properties to set
             */
            function Authenticate(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Authenticate userUuid.
             * @member {string} userUuid
             * @memberof nml.Authenticate
             * @instance
             */
            Authenticate.prototype.userUuid = "";
    
            /**
             * Authenticate clientUuid.
             * @member {string} clientUuid
             * @memberof nml.Authenticate
             * @instance
             */
            Authenticate.prototype.clientUuid = "";
    
            /**
             * Authenticate token.
             * @member {string} token
             * @memberof nml.Authenticate
             * @instance
             */
            Authenticate.prototype.token = "";
    
            /**
             * Creates a new Authenticate instance using the specified properties.
             * @function create
             * @memberof nml.Authenticate
             * @static
             * @param {nml.IAuthenticate=} [properties] Properties to set
             * @returns {nml.Authenticate} Authenticate instance
             */
            Authenticate.create = function create(properties) {
                return new Authenticate(properties);
            };
    
            /**
             * Encodes the specified Authenticate message. Does not implicitly {@link nml.Authenticate.verify|verify} messages.
             * @function encode
             * @memberof nml.Authenticate
             * @static
             * @param {nml.IAuthenticate} message Authenticate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Authenticate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userUuid != null && Object.hasOwnProperty.call(message, "userUuid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.userUuid);
                if (message.clientUuid != null && Object.hasOwnProperty.call(message, "clientUuid"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientUuid);
                if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.token);
                return writer;
            };
    
            /**
             * Encodes the specified Authenticate message, length delimited. Does not implicitly {@link nml.Authenticate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Authenticate
             * @static
             * @param {nml.IAuthenticate} message Authenticate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Authenticate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Authenticate message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Authenticate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Authenticate} Authenticate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Authenticate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Authenticate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.userUuid = reader.string();
                            break;
                        }
                    case 2: {
                            message.clientUuid = reader.string();
                            break;
                        }
                    case 3: {
                            message.token = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Authenticate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Authenticate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Authenticate} Authenticate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Authenticate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Authenticate message.
             * @function verify
             * @memberof nml.Authenticate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Authenticate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userUuid != null && message.hasOwnProperty("userUuid"))
                    if (!$util.isString(message.userUuid))
                        return "userUuid: string expected";
                if (message.clientUuid != null && message.hasOwnProperty("clientUuid"))
                    if (!$util.isString(message.clientUuid))
                        return "clientUuid: string expected";
                if (message.token != null && message.hasOwnProperty("token"))
                    if (!$util.isString(message.token))
                        return "token: string expected";
                return null;
            };
    
            /**
             * Creates an Authenticate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Authenticate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Authenticate} Authenticate
             */
            Authenticate.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Authenticate)
                    return object;
                var message = new $root.nml.Authenticate();
                if (object.userUuid != null)
                    message.userUuid = String(object.userUuid);
                if (object.clientUuid != null)
                    message.clientUuid = String(object.clientUuid);
                if (object.token != null)
                    message.token = String(object.token);
                return message;
            };
    
            /**
             * Creates a plain object from an Authenticate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Authenticate
             * @static
             * @param {nml.Authenticate} message Authenticate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Authenticate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userUuid = "";
                    object.clientUuid = "";
                    object.token = "";
                }
                if (message.userUuid != null && message.hasOwnProperty("userUuid"))
                    object.userUuid = message.userUuid;
                if (message.clientUuid != null && message.hasOwnProperty("clientUuid"))
                    object.clientUuid = message.clientUuid;
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                return object;
            };
    
            /**
             * Converts this Authenticate to JSON.
             * @function toJSON
             * @memberof nml.Authenticate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Authenticate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Authenticate
             * @function getTypeUrl
             * @memberof nml.Authenticate
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Authenticate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Authenticate";
            };
    
            return Authenticate;
        })();
    
        nml.Battery = (function() {
    
            /**
             * Properties of a Battery.
             * @memberof nml
             * @interface IBattery
             * @property {number|null} [level] Battery level
             */
    
            /**
             * Constructs a new Battery.
             * @memberof nml
             * @classdesc Represents a Battery.
             * @implements IBattery
             * @constructor
             * @param {nml.IBattery=} [properties] Properties to set
             */
            function Battery(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Battery level.
             * @member {number} level
             * @memberof nml.Battery
             * @instance
             */
            Battery.prototype.level = 0;
    
            /**
             * Creates a new Battery instance using the specified properties.
             * @function create
             * @memberof nml.Battery
             * @static
             * @param {nml.IBattery=} [properties] Properties to set
             * @returns {nml.Battery} Battery instance
             */
            Battery.create = function create(properties) {
                return new Battery(properties);
            };
    
            /**
             * Encodes the specified Battery message. Does not implicitly {@link nml.Battery.verify|verify} messages.
             * @function encode
             * @memberof nml.Battery
             * @static
             * @param {nml.IBattery} message Battery message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Battery.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.level != null && Object.hasOwnProperty.call(message, "level"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.level);
                return writer;
            };
    
            /**
             * Encodes the specified Battery message, length delimited. Does not implicitly {@link nml.Battery.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Battery
             * @static
             * @param {nml.IBattery} message Battery message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Battery.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Battery message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Battery
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Battery} Battery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Battery.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Battery();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.level = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Battery message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Battery
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Battery} Battery
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Battery.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Battery message.
             * @function verify
             * @memberof nml.Battery
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Battery.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.level != null && message.hasOwnProperty("level"))
                    if (typeof message.level !== "number")
                        return "level: number expected";
                return null;
            };
    
            /**
             * Creates a Battery message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Battery
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Battery} Battery
             */
            Battery.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Battery)
                    return object;
                var message = new $root.nml.Battery();
                if (object.level != null)
                    message.level = Number(object.level);
                return message;
            };
    
            /**
             * Creates a plain object from a Battery message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Battery
             * @static
             * @param {nml.Battery} message Battery
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Battery.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.level = 0;
                if (message.level != null && message.hasOwnProperty("level"))
                    object.level = options.json && !isFinite(message.level) ? String(message.level) : message.level;
                return object;
            };
    
            /**
             * Converts this Battery to JSON.
             * @function toJSON
             * @memberof nml.Battery
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Battery.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Battery
             * @function getTypeUrl
             * @memberof nml.Battery
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Battery.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Battery";
            };
    
            return Battery;
        })();
    
        /**
         * ChannelType enum.
         * @name nml.ChannelType
         * @enum {number}
         * @property {number} CHANNELTYPE_GENERIC_DIGITAL_OUTPUT=0 CHANNELTYPE_GENERIC_DIGITAL_OUTPUT value
         * @property {number} CHANNELTYPE_GENERIC_DIGITAL_INPUT=1 CHANNELTYPE_GENERIC_DIGITAL_INPUT value
         * @property {number} CHANNELTYPE_GENERIC_ANALOG_OUTPUT=2 CHANNELTYPE_GENERIC_ANALOG_OUTPUT value
         * @property {number} CHANNELTYPE_GENERIC_ANALOG_INPUT=3 CHANNELTYPE_GENERIC_ANALOG_INPUT value
         */
        nml.ChannelType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CHANNELTYPE_GENERIC_DIGITAL_OUTPUT"] = 0;
            values[valuesById[1] = "CHANNELTYPE_GENERIC_DIGITAL_INPUT"] = 1;
            values[valuesById[2] = "CHANNELTYPE_GENERIC_ANALOG_OUTPUT"] = 2;
            values[valuesById[3] = "CHANNELTYPE_GENERIC_ANALOG_INPUT"] = 3;
            return values;
        })();
    
        nml.ChannelConfiguration = (function() {
    
            /**
             * Properties of a ChannelConfiguration.
             * @memberof nml
             * @interface IChannelConfiguration
             * @property {number|null} [number] ChannelConfiguration number
             * @property {nml.ChannelType|null} [type] ChannelConfiguration type
             */
    
            /**
             * Constructs a new ChannelConfiguration.
             * @memberof nml
             * @classdesc Represents a ChannelConfiguration.
             * @implements IChannelConfiguration
             * @constructor
             * @param {nml.IChannelConfiguration=} [properties] Properties to set
             */
            function ChannelConfiguration(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ChannelConfiguration number.
             * @member {number} number
             * @memberof nml.ChannelConfiguration
             * @instance
             */
            ChannelConfiguration.prototype.number = 0;
    
            /**
             * ChannelConfiguration type.
             * @member {nml.ChannelType} type
             * @memberof nml.ChannelConfiguration
             * @instance
             */
            ChannelConfiguration.prototype.type = 0;
    
            /**
             * Creates a new ChannelConfiguration instance using the specified properties.
             * @function create
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {nml.IChannelConfiguration=} [properties] Properties to set
             * @returns {nml.ChannelConfiguration} ChannelConfiguration instance
             */
            ChannelConfiguration.create = function create(properties) {
                return new ChannelConfiguration(properties);
            };
    
            /**
             * Encodes the specified ChannelConfiguration message. Does not implicitly {@link nml.ChannelConfiguration.verify|verify} messages.
             * @function encode
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {nml.IChannelConfiguration} message ChannelConfiguration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChannelConfiguration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.number != null && Object.hasOwnProperty.call(message, "number"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.number);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                return writer;
            };
    
            /**
             * Encodes the specified ChannelConfiguration message, length delimited. Does not implicitly {@link nml.ChannelConfiguration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {nml.IChannelConfiguration} message ChannelConfiguration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChannelConfiguration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChannelConfiguration message from the specified reader or buffer.
             * @function decode
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.ChannelConfiguration} ChannelConfiguration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChannelConfiguration.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.ChannelConfiguration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.number = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.type = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChannelConfiguration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.ChannelConfiguration} ChannelConfiguration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChannelConfiguration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChannelConfiguration message.
             * @function verify
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChannelConfiguration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.number != null && message.hasOwnProperty("number"))
                    if (!$util.isInteger(message.number))
                        return "number: integer expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a ChannelConfiguration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.ChannelConfiguration} ChannelConfiguration
             */
            ChannelConfiguration.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.ChannelConfiguration)
                    return object;
                var message = new $root.nml.ChannelConfiguration();
                if (object.number != null)
                    message.number = object.number >>> 0;
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "CHANNELTYPE_GENERIC_DIGITAL_OUTPUT":
                case 0:
                    message.type = 0;
                    break;
                case "CHANNELTYPE_GENERIC_DIGITAL_INPUT":
                case 1:
                    message.type = 1;
                    break;
                case "CHANNELTYPE_GENERIC_ANALOG_OUTPUT":
                case 2:
                    message.type = 2;
                    break;
                case "CHANNELTYPE_GENERIC_ANALOG_INPUT":
                case 3:
                    message.type = 3;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ChannelConfiguration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {nml.ChannelConfiguration} message ChannelConfiguration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChannelConfiguration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.number = 0;
                    object.type = options.enums === String ? "CHANNELTYPE_GENERIC_DIGITAL_OUTPUT" : 0;
                }
                if (message.number != null && message.hasOwnProperty("number"))
                    object.number = message.number;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.nml.ChannelType[message.type] === undefined ? message.type : $root.nml.ChannelType[message.type] : message.type;
                return object;
            };
    
            /**
             * Converts this ChannelConfiguration to JSON.
             * @function toJSON
             * @memberof nml.ChannelConfiguration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChannelConfiguration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for ChannelConfiguration
             * @function getTypeUrl
             * @memberof nml.ChannelConfiguration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ChannelConfiguration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.ChannelConfiguration";
            };
    
            return ChannelConfiguration;
        })();
    
        nml.Channel = (function() {
    
            /**
             * Properties of a Channel.
             * @memberof nml
             * @interface IChannel
             * @property {number|null} [number] Channel number
             * @property {number|null} [state] Channel state
             */
    
            /**
             * Constructs a new Channel.
             * @memberof nml
             * @classdesc Represents a Channel.
             * @implements IChannel
             * @constructor
             * @param {nml.IChannel=} [properties] Properties to set
             */
            function Channel(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Channel number.
             * @member {number} number
             * @memberof nml.Channel
             * @instance
             */
            Channel.prototype.number = 0;
    
            /**
             * Channel state.
             * @member {number} state
             * @memberof nml.Channel
             * @instance
             */
            Channel.prototype.state = 0;
    
            /**
             * Creates a new Channel instance using the specified properties.
             * @function create
             * @memberof nml.Channel
             * @static
             * @param {nml.IChannel=} [properties] Properties to set
             * @returns {nml.Channel} Channel instance
             */
            Channel.create = function create(properties) {
                return new Channel(properties);
            };
    
            /**
             * Encodes the specified Channel message. Does not implicitly {@link nml.Channel.verify|verify} messages.
             * @function encode
             * @memberof nml.Channel
             * @static
             * @param {nml.IChannel} message Channel message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Channel.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.number != null && Object.hasOwnProperty.call(message, "number"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.number);
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.state);
                return writer;
            };
    
            /**
             * Encodes the specified Channel message, length delimited. Does not implicitly {@link nml.Channel.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Channel
             * @static
             * @param {nml.IChannel} message Channel message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Channel.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Channel message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Channel
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Channel} Channel
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Channel.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Channel();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.number = reader.uint32();
                            break;
                        }
                    case 2: {
                            message.state = reader.uint32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Channel message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Channel
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Channel} Channel
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Channel.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Channel message.
             * @function verify
             * @memberof nml.Channel
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Channel.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.number != null && message.hasOwnProperty("number"))
                    if (!$util.isInteger(message.number))
                        return "number: integer expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    if (!$util.isInteger(message.state))
                        return "state: integer expected";
                return null;
            };
    
            /**
             * Creates a Channel message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Channel
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Channel} Channel
             */
            Channel.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Channel)
                    return object;
                var message = new $root.nml.Channel();
                if (object.number != null)
                    message.number = object.number >>> 0;
                if (object.state != null)
                    message.state = object.state >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Channel message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Channel
             * @static
             * @param {nml.Channel} message Channel
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Channel.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.number = 0;
                    object.state = 0;
                }
                if (message.number != null && message.hasOwnProperty("number"))
                    object.number = message.number;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = message.state;
                return object;
            };
    
            /**
             * Converts this Channel to JSON.
             * @function toJSON
             * @memberof nml.Channel
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Channel.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Channel
             * @function getTypeUrl
             * @memberof nml.Channel
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Channel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Channel";
            };
    
            return Channel;
        })();
    
        nml.Configuration = (function() {
    
            /**
             * Properties of a Configuration.
             * @memberof nml
             * @interface IConfiguration
             * @property {string|null} [name] Configuration name
             * @property {Array.<nml.IChannelConfiguration>|null} [channelConfiguration] Configuration channelConfiguration
             */
    
            /**
             * Constructs a new Configuration.
             * @memberof nml
             * @classdesc Represents a Configuration.
             * @implements IConfiguration
             * @constructor
             * @param {nml.IConfiguration=} [properties] Properties to set
             */
            function Configuration(properties) {
                this.channelConfiguration = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Configuration name.
             * @member {string} name
             * @memberof nml.Configuration
             * @instance
             */
            Configuration.prototype.name = "";
    
            /**
             * Configuration channelConfiguration.
             * @member {Array.<nml.IChannelConfiguration>} channelConfiguration
             * @memberof nml.Configuration
             * @instance
             */
            Configuration.prototype.channelConfiguration = $util.emptyArray;
    
            /**
             * Creates a new Configuration instance using the specified properties.
             * @function create
             * @memberof nml.Configuration
             * @static
             * @param {nml.IConfiguration=} [properties] Properties to set
             * @returns {nml.Configuration} Configuration instance
             */
            Configuration.create = function create(properties) {
                return new Configuration(properties);
            };
    
            /**
             * Encodes the specified Configuration message. Does not implicitly {@link nml.Configuration.verify|verify} messages.
             * @function encode
             * @memberof nml.Configuration
             * @static
             * @param {nml.IConfiguration} message Configuration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Configuration.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.channelConfiguration != null && message.channelConfiguration.length)
                    for (var i = 0; i < message.channelConfiguration.length; ++i)
                        $root.nml.ChannelConfiguration.encode(message.channelConfiguration[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified Configuration message, length delimited. Does not implicitly {@link nml.Configuration.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Configuration
             * @static
             * @param {nml.IConfiguration} message Configuration message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Configuration.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Configuration message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Configuration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Configuration} Configuration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Configuration.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Configuration();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.name = reader.string();
                            break;
                        }
                    case 2: {
                            if (!(message.channelConfiguration && message.channelConfiguration.length))
                                message.channelConfiguration = [];
                            message.channelConfiguration.push($root.nml.ChannelConfiguration.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Configuration message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Configuration
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Configuration} Configuration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Configuration.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Configuration message.
             * @function verify
             * @memberof nml.Configuration
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Configuration.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.channelConfiguration != null && message.hasOwnProperty("channelConfiguration")) {
                    if (!Array.isArray(message.channelConfiguration))
                        return "channelConfiguration: array expected";
                    for (var i = 0; i < message.channelConfiguration.length; ++i) {
                        var error = $root.nml.ChannelConfiguration.verify(message.channelConfiguration[i]);
                        if (error)
                            return "channelConfiguration." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a Configuration message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Configuration
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Configuration} Configuration
             */
            Configuration.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Configuration)
                    return object;
                var message = new $root.nml.Configuration();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.channelConfiguration) {
                    if (!Array.isArray(object.channelConfiguration))
                        throw TypeError(".nml.Configuration.channelConfiguration: array expected");
                    message.channelConfiguration = [];
                    for (var i = 0; i < object.channelConfiguration.length; ++i) {
                        if (typeof object.channelConfiguration[i] !== "object")
                            throw TypeError(".nml.Configuration.channelConfiguration: object expected");
                        message.channelConfiguration[i] = $root.nml.ChannelConfiguration.fromObject(object.channelConfiguration[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Configuration message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Configuration
             * @static
             * @param {nml.Configuration} message Configuration
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Configuration.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.channelConfiguration = [];
                if (options.defaults)
                    object.name = "";
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.channelConfiguration && message.channelConfiguration.length) {
                    object.channelConfiguration = [];
                    for (var j = 0; j < message.channelConfiguration.length; ++j)
                        object.channelConfiguration[j] = $root.nml.ChannelConfiguration.toObject(message.channelConfiguration[j], options);
                }
                return object;
            };
    
            /**
             * Converts this Configuration to JSON.
             * @function toJSON
             * @memberof nml.Configuration
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Configuration.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Configuration
             * @function getTypeUrl
             * @memberof nml.Configuration
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Configuration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Configuration";
            };
    
            return Configuration;
        })();
    
        nml.GetChannel = (function() {
    
            /**
             * Properties of a GetChannel.
             * @memberof nml
             * @interface IGetChannel
             * @property {Array.<nml.IChannel>|null} [channel] GetChannel channel
             */
    
            /**
             * Constructs a new GetChannel.
             * @memberof nml
             * @classdesc Represents a GetChannel.
             * @implements IGetChannel
             * @constructor
             * @param {nml.IGetChannel=} [properties] Properties to set
             */
            function GetChannel(properties) {
                this.channel = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * GetChannel channel.
             * @member {Array.<nml.IChannel>} channel
             * @memberof nml.GetChannel
             * @instance
             */
            GetChannel.prototype.channel = $util.emptyArray;
    
            /**
             * Creates a new GetChannel instance using the specified properties.
             * @function create
             * @memberof nml.GetChannel
             * @static
             * @param {nml.IGetChannel=} [properties] Properties to set
             * @returns {nml.GetChannel} GetChannel instance
             */
            GetChannel.create = function create(properties) {
                return new GetChannel(properties);
            };
    
            /**
             * Encodes the specified GetChannel message. Does not implicitly {@link nml.GetChannel.verify|verify} messages.
             * @function encode
             * @memberof nml.GetChannel
             * @static
             * @param {nml.IGetChannel} message GetChannel message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChannel.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.channel != null && message.channel.length)
                    for (var i = 0; i < message.channel.length; ++i)
                        $root.nml.Channel.encode(message.channel[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified GetChannel message, length delimited. Does not implicitly {@link nml.GetChannel.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.GetChannel
             * @static
             * @param {nml.IGetChannel} message GetChannel message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChannel.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a GetChannel message from the specified reader or buffer.
             * @function decode
             * @memberof nml.GetChannel
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.GetChannel} GetChannel
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChannel.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.GetChannel();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.channel && message.channel.length))
                                message.channel = [];
                            message.channel.push($root.nml.Channel.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a GetChannel message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.GetChannel
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.GetChannel} GetChannel
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChannel.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a GetChannel message.
             * @function verify
             * @memberof nml.GetChannel
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetChannel.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.channel != null && message.hasOwnProperty("channel")) {
                    if (!Array.isArray(message.channel))
                        return "channel: array expected";
                    for (var i = 0; i < message.channel.length; ++i) {
                        var error = $root.nml.Channel.verify(message.channel[i]);
                        if (error)
                            return "channel." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a GetChannel message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.GetChannel
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.GetChannel} GetChannel
             */
            GetChannel.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.GetChannel)
                    return object;
                var message = new $root.nml.GetChannel();
                if (object.channel) {
                    if (!Array.isArray(object.channel))
                        throw TypeError(".nml.GetChannel.channel: array expected");
                    message.channel = [];
                    for (var i = 0; i < object.channel.length; ++i) {
                        if (typeof object.channel[i] !== "object")
                            throw TypeError(".nml.GetChannel.channel: object expected");
                        message.channel[i] = $root.nml.Channel.fromObject(object.channel[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a GetChannel message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.GetChannel
             * @static
             * @param {nml.GetChannel} message GetChannel
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetChannel.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.channel = [];
                if (message.channel && message.channel.length) {
                    object.channel = [];
                    for (var j = 0; j < message.channel.length; ++j)
                        object.channel[j] = $root.nml.Channel.toObject(message.channel[j], options);
                }
                return object;
            };
    
            /**
             * Converts this GetChannel to JSON.
             * @function toJSON
             * @memberof nml.GetChannel
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetChannel.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for GetChannel
             * @function getTypeUrl
             * @memberof nml.GetChannel
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GetChannel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.GetChannel";
            };
    
            return GetChannel;
        })();
    
        nml.Heartbeat = (function() {
    
            /**
             * Properties of a Heartbeat.
             * @memberof nml
             * @interface IHeartbeat
             * @property {number|Long|null} [timestamp] Heartbeat timestamp
             */
    
            /**
             * Constructs a new Heartbeat.
             * @memberof nml
             * @classdesc Represents a Heartbeat.
             * @implements IHeartbeat
             * @constructor
             * @param {nml.IHeartbeat=} [properties] Properties to set
             */
            function Heartbeat(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Heartbeat timestamp.
             * @member {number|Long} timestamp
             * @memberof nml.Heartbeat
             * @instance
             */
            Heartbeat.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new Heartbeat instance using the specified properties.
             * @function create
             * @memberof nml.Heartbeat
             * @static
             * @param {nml.IHeartbeat=} [properties] Properties to set
             * @returns {nml.Heartbeat} Heartbeat instance
             */
            Heartbeat.create = function create(properties) {
                return new Heartbeat(properties);
            };
    
            /**
             * Encodes the specified Heartbeat message. Does not implicitly {@link nml.Heartbeat.verify|verify} messages.
             * @function encode
             * @memberof nml.Heartbeat
             * @static
             * @param {nml.IHeartbeat} message Heartbeat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Heartbeat.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.timestamp);
                return writer;
            };
    
            /**
             * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link nml.Heartbeat.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Heartbeat
             * @static
             * @param {nml.IHeartbeat} message Heartbeat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Heartbeat.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Heartbeat message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Heartbeat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Heartbeat} Heartbeat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Heartbeat.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Heartbeat();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.timestamp = reader.uint64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Heartbeat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Heartbeat} Heartbeat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Heartbeat.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Heartbeat message.
             * @function verify
             * @memberof nml.Heartbeat
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Heartbeat.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                        return "timestamp: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Heartbeat
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Heartbeat} Heartbeat
             */
            Heartbeat.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Heartbeat)
                    return object;
                var message = new $root.nml.Heartbeat();
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Heartbeat
             * @static
             * @param {nml.Heartbeat} message Heartbeat
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Heartbeat.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
                return object;
            };
    
            /**
             * Converts this Heartbeat to JSON.
             * @function toJSON
             * @memberof nml.Heartbeat
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Heartbeat.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Heartbeat
             * @function getTypeUrl
             * @memberof nml.Heartbeat
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Heartbeat.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Heartbeat";
            };
    
            return Heartbeat;
        })();
    
        /**
         * NetworkIpVersion enum.
         * @name nml.NetworkIpVersion
         * @enum {number}
         * @property {number} NETWORK_IP_VERSION_IPV4=0 NETWORK_IP_VERSION_IPV4 value
         * @property {number} NETWORK_IP_VERSION_IPV6=1 NETWORK_IP_VERSION_IPV6 value
         */
        nml.NetworkIpVersion = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NETWORK_IP_VERSION_IPV4"] = 0;
            values[valuesById[1] = "NETWORK_IP_VERSION_IPV6"] = 1;
            return values;
        })();
    
        nml.Network = (function() {
    
            /**
             * Properties of a Network.
             * @memberof nml
             * @interface INetwork
             * @property {number|Long|null} [macAddress] Network macAddress
             * @property {nml.NetworkIpVersion|null} [ipVersion] Network ipVersion
             * @property {Uint8Array|null} [ipAddress] Network ipAddress
             */
    
            /**
             * Constructs a new Network.
             * @memberof nml
             * @classdesc Represents a Network.
             * @implements INetwork
             * @constructor
             * @param {nml.INetwork=} [properties] Properties to set
             */
            function Network(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Network macAddress.
             * @member {number|Long} macAddress
             * @memberof nml.Network
             * @instance
             */
            Network.prototype.macAddress = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Network ipVersion.
             * @member {nml.NetworkIpVersion} ipVersion
             * @memberof nml.Network
             * @instance
             */
            Network.prototype.ipVersion = 0;
    
            /**
             * Network ipAddress.
             * @member {Uint8Array} ipAddress
             * @memberof nml.Network
             * @instance
             */
            Network.prototype.ipAddress = $util.newBuffer([]);
    
            /**
             * Creates a new Network instance using the specified properties.
             * @function create
             * @memberof nml.Network
             * @static
             * @param {nml.INetwork=} [properties] Properties to set
             * @returns {nml.Network} Network instance
             */
            Network.create = function create(properties) {
                return new Network(properties);
            };
    
            /**
             * Encodes the specified Network message. Does not implicitly {@link nml.Network.verify|verify} messages.
             * @function encode
             * @memberof nml.Network
             * @static
             * @param {nml.INetwork} message Network message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Network.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.macAddress != null && Object.hasOwnProperty.call(message, "macAddress"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.macAddress);
                if (message.ipVersion != null && Object.hasOwnProperty.call(message, "ipVersion"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ipVersion);
                if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.ipAddress);
                return writer;
            };
    
            /**
             * Encodes the specified Network message, length delimited. Does not implicitly {@link nml.Network.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Network
             * @static
             * @param {nml.INetwork} message Network message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Network.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Network message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Network
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Network} Network
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Network.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Network();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.macAddress = reader.uint64();
                            break;
                        }
                    case 2: {
                            message.ipVersion = reader.int32();
                            break;
                        }
                    case 3: {
                            message.ipAddress = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Network message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Network
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Network} Network
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Network.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Network message.
             * @function verify
             * @memberof nml.Network
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Network.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.macAddress != null && message.hasOwnProperty("macAddress"))
                    if (!$util.isInteger(message.macAddress) && !(message.macAddress && $util.isInteger(message.macAddress.low) && $util.isInteger(message.macAddress.high)))
                        return "macAddress: integer|Long expected";
                if (message.ipVersion != null && message.hasOwnProperty("ipVersion"))
                    switch (message.ipVersion) {
                    default:
                        return "ipVersion: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                    if (!(message.ipAddress && typeof message.ipAddress.length === "number" || $util.isString(message.ipAddress)))
                        return "ipAddress: buffer expected";
                return null;
            };
    
            /**
             * Creates a Network message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Network
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Network} Network
             */
            Network.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Network)
                    return object;
                var message = new $root.nml.Network();
                if (object.macAddress != null)
                    if ($util.Long)
                        (message.macAddress = $util.Long.fromValue(object.macAddress)).unsigned = true;
                    else if (typeof object.macAddress === "string")
                        message.macAddress = parseInt(object.macAddress, 10);
                    else if (typeof object.macAddress === "number")
                        message.macAddress = object.macAddress;
                    else if (typeof object.macAddress === "object")
                        message.macAddress = new $util.LongBits(object.macAddress.low >>> 0, object.macAddress.high >>> 0).toNumber(true);
                switch (object.ipVersion) {
                default:
                    if (typeof object.ipVersion === "number") {
                        message.ipVersion = object.ipVersion;
                        break;
                    }
                    break;
                case "NETWORK_IP_VERSION_IPV4":
                case 0:
                    message.ipVersion = 0;
                    break;
                case "NETWORK_IP_VERSION_IPV6":
                case 1:
                    message.ipVersion = 1;
                    break;
                }
                if (object.ipAddress != null)
                    if (typeof object.ipAddress === "string")
                        $util.base64.decode(object.ipAddress, message.ipAddress = $util.newBuffer($util.base64.length(object.ipAddress)), 0);
                    else if (object.ipAddress.length >= 0)
                        message.ipAddress = object.ipAddress;
                return message;
            };
    
            /**
             * Creates a plain object from a Network message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Network
             * @static
             * @param {nml.Network} message Network
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Network.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.macAddress = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.macAddress = options.longs === String ? "0" : 0;
                    object.ipVersion = options.enums === String ? "NETWORK_IP_VERSION_IPV4" : 0;
                    if (options.bytes === String)
                        object.ipAddress = "";
                    else {
                        object.ipAddress = [];
                        if (options.bytes !== Array)
                            object.ipAddress = $util.newBuffer(object.ipAddress);
                    }
                }
                if (message.macAddress != null && message.hasOwnProperty("macAddress"))
                    if (typeof message.macAddress === "number")
                        object.macAddress = options.longs === String ? String(message.macAddress) : message.macAddress;
                    else
                        object.macAddress = options.longs === String ? $util.Long.prototype.toString.call(message.macAddress) : options.longs === Number ? new $util.LongBits(message.macAddress.low >>> 0, message.macAddress.high >>> 0).toNumber(true) : message.macAddress;
                if (message.ipVersion != null && message.hasOwnProperty("ipVersion"))
                    object.ipVersion = options.enums === String ? $root.nml.NetworkIpVersion[message.ipVersion] === undefined ? message.ipVersion : $root.nml.NetworkIpVersion[message.ipVersion] : message.ipVersion;
                if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                    object.ipAddress = options.bytes === String ? $util.base64.encode(message.ipAddress, 0, message.ipAddress.length) : options.bytes === Array ? Array.prototype.slice.call(message.ipAddress) : message.ipAddress;
                return object;
            };
    
            /**
             * Converts this Network to JSON.
             * @function toJSON
             * @memberof nml.Network
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Network.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Network
             * @function getTypeUrl
             * @memberof nml.Network
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Network.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Network";
            };
    
            return Network;
        })();
    
        nml.SetChannel = (function() {
    
            /**
             * Properties of a SetChannel.
             * @memberof nml
             * @interface ISetChannel
             * @property {Array.<nml.IChannel>|null} [channel] SetChannel channel
             */
    
            /**
             * Constructs a new SetChannel.
             * @memberof nml
             * @classdesc Represents a SetChannel.
             * @implements ISetChannel
             * @constructor
             * @param {nml.ISetChannel=} [properties] Properties to set
             */
            function SetChannel(properties) {
                this.channel = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * SetChannel channel.
             * @member {Array.<nml.IChannel>} channel
             * @memberof nml.SetChannel
             * @instance
             */
            SetChannel.prototype.channel = $util.emptyArray;
    
            /**
             * Creates a new SetChannel instance using the specified properties.
             * @function create
             * @memberof nml.SetChannel
             * @static
             * @param {nml.ISetChannel=} [properties] Properties to set
             * @returns {nml.SetChannel} SetChannel instance
             */
            SetChannel.create = function create(properties) {
                return new SetChannel(properties);
            };
    
            /**
             * Encodes the specified SetChannel message. Does not implicitly {@link nml.SetChannel.verify|verify} messages.
             * @function encode
             * @memberof nml.SetChannel
             * @static
             * @param {nml.ISetChannel} message SetChannel message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SetChannel.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.channel != null && message.channel.length)
                    for (var i = 0; i < message.channel.length; ++i)
                        $root.nml.Channel.encode(message.channel[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified SetChannel message, length delimited. Does not implicitly {@link nml.SetChannel.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.SetChannel
             * @static
             * @param {nml.ISetChannel} message SetChannel message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SetChannel.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SetChannel message from the specified reader or buffer.
             * @function decode
             * @memberof nml.SetChannel
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.SetChannel} SetChannel
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SetChannel.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.SetChannel();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.channel && message.channel.length))
                                message.channel = [];
                            message.channel.push($root.nml.Channel.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SetChannel message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.SetChannel
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.SetChannel} SetChannel
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SetChannel.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SetChannel message.
             * @function verify
             * @memberof nml.SetChannel
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SetChannel.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.channel != null && message.hasOwnProperty("channel")) {
                    if (!Array.isArray(message.channel))
                        return "channel: array expected";
                    for (var i = 0; i < message.channel.length; ++i) {
                        var error = $root.nml.Channel.verify(message.channel[i]);
                        if (error)
                            return "channel." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a SetChannel message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.SetChannel
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.SetChannel} SetChannel
             */
            SetChannel.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.SetChannel)
                    return object;
                var message = new $root.nml.SetChannel();
                if (object.channel) {
                    if (!Array.isArray(object.channel))
                        throw TypeError(".nml.SetChannel.channel: array expected");
                    message.channel = [];
                    for (var i = 0; i < object.channel.length; ++i) {
                        if (typeof object.channel[i] !== "object")
                            throw TypeError(".nml.SetChannel.channel: object expected");
                        message.channel[i] = $root.nml.Channel.fromObject(object.channel[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a SetChannel message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.SetChannel
             * @static
             * @param {nml.SetChannel} message SetChannel
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SetChannel.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.channel = [];
                if (message.channel && message.channel.length) {
                    object.channel = [];
                    for (var j = 0; j < message.channel.length; ++j)
                        object.channel[j] = $root.nml.Channel.toObject(message.channel[j], options);
                }
                return object;
            };
    
            /**
             * Converts this SetChannel to JSON.
             * @function toJSON
             * @memberof nml.SetChannel
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SetChannel.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for SetChannel
             * @function getTypeUrl
             * @memberof nml.SetChannel
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            SetChannel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.SetChannel";
            };
    
            return SetChannel;
        })();
    
        /**
         * StatusState enum.
         * @name nml.StatusState
         * @enum {number}
         * @property {number} STATUS_STATE_OFFLINE=0 STATUS_STATE_OFFLINE value
         * @property {number} STATUS_STATE_ONLINE=1 STATUS_STATE_ONLINE value
         */
        nml.StatusState = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STATUS_STATE_OFFLINE"] = 0;
            values[valuesById[1] = "STATUS_STATE_ONLINE"] = 1;
            return values;
        })();
    
        nml.Status = (function() {
    
            /**
             * Properties of a Status.
             * @memberof nml
             * @interface IStatus
             * @property {nml.StatusState|null} [state] Status state
             */
    
            /**
             * Constructs a new Status.
             * @memberof nml
             * @classdesc Represents a Status.
             * @implements IStatus
             * @constructor
             * @param {nml.IStatus=} [properties] Properties to set
             */
            function Status(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Status state.
             * @member {nml.StatusState} state
             * @memberof nml.Status
             * @instance
             */
            Status.prototype.state = 0;
    
            /**
             * Creates a new Status instance using the specified properties.
             * @function create
             * @memberof nml.Status
             * @static
             * @param {nml.IStatus=} [properties] Properties to set
             * @returns {nml.Status} Status instance
             */
            Status.create = function create(properties) {
                return new Status(properties);
            };
    
            /**
             * Encodes the specified Status message. Does not implicitly {@link nml.Status.verify|verify} messages.
             * @function encode
             * @memberof nml.Status
             * @static
             * @param {nml.IStatus} message Status message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Status.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                return writer;
            };
    
            /**
             * Encodes the specified Status message, length delimited. Does not implicitly {@link nml.Status.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Status
             * @static
             * @param {nml.IStatus} message Status message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Status.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Status message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Status
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Status} Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Status.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Status();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.state = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Status message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Status
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Status} Status
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Status.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Status message.
             * @function verify
             * @memberof nml.Status
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Status.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    switch (message.state) {
                    default:
                        return "state: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a Status message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Status
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Status} Status
             */
            Status.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Status)
                    return object;
                var message = new $root.nml.Status();
                switch (object.state) {
                default:
                    if (typeof object.state === "number") {
                        message.state = object.state;
                        break;
                    }
                    break;
                case "STATUS_STATE_OFFLINE":
                case 0:
                    message.state = 0;
                    break;
                case "STATUS_STATE_ONLINE":
                case 1:
                    message.state = 1;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Status message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Status
             * @static
             * @param {nml.Status} message Status
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Status.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.state = options.enums === String ? "STATUS_STATE_OFFLINE" : 0;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = options.enums === String ? $root.nml.StatusState[message.state] === undefined ? message.state : $root.nml.StatusState[message.state] : message.state;
                return object;
            };
    
            /**
             * Converts this Status to JSON.
             * @function toJSON
             * @memberof nml.Status
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Status.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Status
             * @function getTypeUrl
             * @memberof nml.Status
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Status.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Status";
            };
    
            return Status;
        })();
    
        /**
         * WifiSecurity enum.
         * @name nml.WifiSecurity
         * @enum {number}
         * @property {number} WIFI_SECURITY_WEP=0 WIFI_SECURITY_WEP value
         * @property {number} WIFI_SECURITY_WPA=1 WIFI_SECURITY_WPA value
         * @property {number} WIFI_SECURITY_WPA2=2 WIFI_SECURITY_WPA2 value
         * @property {number} WIFI_SECURITY_WPA3=3 WIFI_SECURITY_WPA3 value
         */
        nml.WifiSecurity = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "WIFI_SECURITY_WEP"] = 0;
            values[valuesById[1] = "WIFI_SECURITY_WPA"] = 1;
            values[valuesById[2] = "WIFI_SECURITY_WPA2"] = 2;
            values[valuesById[3] = "WIFI_SECURITY_WPA3"] = 3;
            return values;
        })();
    
        nml.Wifi = (function() {
    
            /**
             * Properties of a Wifi.
             * @memberof nml
             * @interface IWifi
             * @property {string|null} [ssid] Wifi ssid
             * @property {number|null} [signalStrength] Wifi signalStrength
             * @property {nml.WifiSecurity|null} [security] Wifi security
             */
    
            /**
             * Constructs a new Wifi.
             * @memberof nml
             * @classdesc Represents a Wifi.
             * @implements IWifi
             * @constructor
             * @param {nml.IWifi=} [properties] Properties to set
             */
            function Wifi(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Wifi ssid.
             * @member {string} ssid
             * @memberof nml.Wifi
             * @instance
             */
            Wifi.prototype.ssid = "";
    
            /**
             * Wifi signalStrength.
             * @member {number} signalStrength
             * @memberof nml.Wifi
             * @instance
             */
            Wifi.prototype.signalStrength = 0;
    
            /**
             * Wifi security.
             * @member {nml.WifiSecurity} security
             * @memberof nml.Wifi
             * @instance
             */
            Wifi.prototype.security = 0;
    
            /**
             * Creates a new Wifi instance using the specified properties.
             * @function create
             * @memberof nml.Wifi
             * @static
             * @param {nml.IWifi=} [properties] Properties to set
             * @returns {nml.Wifi} Wifi instance
             */
            Wifi.create = function create(properties) {
                return new Wifi(properties);
            };
    
            /**
             * Encodes the specified Wifi message. Does not implicitly {@link nml.Wifi.verify|verify} messages.
             * @function encode
             * @memberof nml.Wifi
             * @static
             * @param {nml.IWifi} message Wifi message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Wifi.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ssid != null && Object.hasOwnProperty.call(message, "ssid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.ssid);
                if (message.signalStrength != null && Object.hasOwnProperty.call(message, "signalStrength"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.signalStrength);
                if (message.security != null && Object.hasOwnProperty.call(message, "security"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.security);
                return writer;
            };
    
            /**
             * Encodes the specified Wifi message, length delimited. Does not implicitly {@link nml.Wifi.verify|verify} messages.
             * @function encodeDelimited
             * @memberof nml.Wifi
             * @static
             * @param {nml.IWifi} message Wifi message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Wifi.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Wifi message from the specified reader or buffer.
             * @function decode
             * @memberof nml.Wifi
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {nml.Wifi} Wifi
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Wifi.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.nml.Wifi();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.ssid = reader.string();
                            break;
                        }
                    case 2: {
                            message.signalStrength = reader.double();
                            break;
                        }
                    case 3: {
                            message.security = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Wifi message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof nml.Wifi
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {nml.Wifi} Wifi
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Wifi.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Wifi message.
             * @function verify
             * @memberof nml.Wifi
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Wifi.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ssid != null && message.hasOwnProperty("ssid"))
                    if (!$util.isString(message.ssid))
                        return "ssid: string expected";
                if (message.signalStrength != null && message.hasOwnProperty("signalStrength"))
                    if (typeof message.signalStrength !== "number")
                        return "signalStrength: number expected";
                if (message.security != null && message.hasOwnProperty("security"))
                    switch (message.security) {
                    default:
                        return "security: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
                return null;
            };
    
            /**
             * Creates a Wifi message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof nml.Wifi
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {nml.Wifi} Wifi
             */
            Wifi.fromObject = function fromObject(object) {
                if (object instanceof $root.nml.Wifi)
                    return object;
                var message = new $root.nml.Wifi();
                if (object.ssid != null)
                    message.ssid = String(object.ssid);
                if (object.signalStrength != null)
                    message.signalStrength = Number(object.signalStrength);
                switch (object.security) {
                default:
                    if (typeof object.security === "number") {
                        message.security = object.security;
                        break;
                    }
                    break;
                case "WIFI_SECURITY_WEP":
                case 0:
                    message.security = 0;
                    break;
                case "WIFI_SECURITY_WPA":
                case 1:
                    message.security = 1;
                    break;
                case "WIFI_SECURITY_WPA2":
                case 2:
                    message.security = 2;
                    break;
                case "WIFI_SECURITY_WPA3":
                case 3:
                    message.security = 3;
                    break;
                }
                return message;
            };
    
            /**
             * Creates a plain object from a Wifi message. Also converts values to other types if specified.
             * @function toObject
             * @memberof nml.Wifi
             * @static
             * @param {nml.Wifi} message Wifi
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Wifi.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.ssid = "";
                    object.signalStrength = 0;
                    object.security = options.enums === String ? "WIFI_SECURITY_WEP" : 0;
                }
                if (message.ssid != null && message.hasOwnProperty("ssid"))
                    object.ssid = message.ssid;
                if (message.signalStrength != null && message.hasOwnProperty("signalStrength"))
                    object.signalStrength = options.json && !isFinite(message.signalStrength) ? String(message.signalStrength) : message.signalStrength;
                if (message.security != null && message.hasOwnProperty("security"))
                    object.security = options.enums === String ? $root.nml.WifiSecurity[message.security] === undefined ? message.security : $root.nml.WifiSecurity[message.security] : message.security;
                return object;
            };
    
            /**
             * Converts this Wifi to JSON.
             * @function toJSON
             * @memberof nml.Wifi
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Wifi.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            /**
             * Gets the default type url for Wifi
             * @function getTypeUrl
             * @memberof nml.Wifi
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Wifi.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/nml.Wifi";
            };
    
            return Wifi;
        })();
    
        return nml;
    })();

    return $root;
});
