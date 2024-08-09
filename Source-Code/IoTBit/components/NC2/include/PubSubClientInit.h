#ifndef PUB_SUB_CLIENT_INIT_H
#define PUB_SUB_CLIENT_INIT_H

#include "PubSubClient.h"

#define PUBSUBCLIENT_MESSAGE_INIT_NULL \
    {                                  \
        NULL,                          \
        0UL,                           \
        0UL,                           \
        NULL,                          \
        0UL,                           \
        0UL,                           \
    }

#define PUBSUBCLIENT_INTERFACE_INIT_NULL \
    {                                    \
        NULL,                            \
        NULL,                            \
        NULL,                            \
        NULL,                            \
        NULL,                            \
        NULL,                            \
        NULL,                            \
        NULL,                            \
    }

#define PUBSUBCLIENT_CALLBACKS_INIT_NULL \
    {                                    \
        NULL,                            \
        NULL,                            \
        NULL,                            \
        NULL,                            \
    }

#define PUBSUBCLIENT_WILL_INIT_NULL \
    {                               \
        {                           \
            NULL,                   \
            0UL,                    \
            0UL,                    \
            NULL,                   \
            0UL,                    \
            0UL,                    \
        },                          \
        PUBSUBCLIENT_QOS_0,         \
        false,                      \
    }

#define PUBSUBCLIENT_INIT_NULL  \
    {                           \
        "\0",                   \
        "\0",                   \
        {                       \
            NULL,               \
            NULL,               \
            NULL,               \
            NULL,               \
            NULL,               \
            NULL,               \
            NULL,               \
            NULL,               \
        },                      \
        {                       \
            NULL,               \
            NULL,               \
            NULL,               \
            NULL,               \
        },                      \
        {                       \
            {                   \
                NULL,           \
                0UL,            \
                0UL,            \
                NULL,           \
                0UL,            \
                0UL,            \
            },                  \
            PUBSUBCLIENT_QOS_0, \
            false,              \
        },                      \
        false,                  \
        false,                  \
    }

#endif