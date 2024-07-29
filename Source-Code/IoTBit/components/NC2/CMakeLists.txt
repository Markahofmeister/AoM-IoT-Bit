set(MESSAGE_LAYER_PATH ${CMAKE_SOURCE_DIR}/../MessageLayer)
set(NANOPB_PATH ${MESSAGE_LAYER_PATH}/nanopb)
set(NANOPB_SOURCES
    ${NANOPB_PATH}/pb_common.c
    ${NANOPB_PATH}/pb_decode.c
    ${NANOPB_PATH}/pb_encode.c
)

# TODO automate compile protobufs with nanopb and output to build directory
set(MESSAGE_LAYER_OUTPUT_PATH ${MESSAGE_LAYER_PATH}/out/c)
set(MESSAGE_LAYER_SOURCES
    ${MESSAGE_LAYER_OUTPUT_PATH}/authenticate.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/battery.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/channel.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/configuration.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/get_channel.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/heartbeat.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/network.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/set_channel.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/status.pb.c
    ${MESSAGE_LAYER_OUTPUT_PATH}/wifi.pb.c
)

set(sources "Client.c" "PubSubClient.c" "Tokenizer.c" "TopicHandler.c")
set(includes "include")

idf_component_register(
    SRCS ${sources} ${NANOPB_SOURCES} ${MESSAGE_LAYER_SOURCES}
    INCLUDE_DIRS ${includes} ${NANOPB_PATH} ${MESSAGE_LAYER_OUTPUT_PATH}
    REQUIRES NC2
)