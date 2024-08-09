#include "PubSubClient.h"
#include "PubSubClientInit.h"

static inline bool PubSubClient_CheckInterface(const PubSubClient_Interface_t *const interface);

void PubSubClient_Init(PubSubClient_t *const client, char *const uri, char *const uuid, const PubSubClient_Interface_t interface)
{
    if (client != NULL && uri != NULL)
    {
        PubSubClient_t nullClient = PUBSUBCLIENT_INIT_NULL;
        *client = nullClient;
        client->Uri = uri;
        client->Uuid = uuid;

        if (PubSubClient_CheckInterface(&interface))
        {
            client->Interface = interface;

            if (client->Interface.Init(uri, client->Uuid))
            {
                client->Init = true;
            }
        }
    }
}

void PubSubClient_Deinit(PubSubClient_t *const client)
{
    if (client != NULL && client->Init && !client->Connected)
    {
        if (client->Interface.Deinit())
        {
            PubSubClient_t nullClient = PUBSUBCLIENT_INIT_NULL;
            *client = nullClient;
        }
    }
}

void PubSubClient_SetCallbacks(PubSubClient_t *const client, const PubSubClient_Callbacks_t callbacks)
{
    if (client != NULL)
    {
        client->Callbacks = callbacks; /* TODO call callbacks */
    }
}

bool PubSubClient_SetWill(PubSubClient_t *const client, const PubSubClient_Message_t message, const bool retained, const PubSubClient_Qos_t qos)
{
    bool set = false;

    if (client != NULL && client->Init)
    {
        client->Will.Message = message;
        client->Will.Retained = retained;
        client->Will.Qos = qos;

        set = true;
    }

    return set;
}

bool PubSubClient_Connect(PubSubClient_t *const client, const char *const token)
{
    bool connected = false;

    if (client != NULL && client->Init && !client->Connected)
    {
        PubSubClient_Will_t *will = NULL;

        if (client->Will.Message.TopicBuffer != NULL)
        {
            will = &client->Will;
        }

        if (client->Interface.Connect(client->Uuid, token, will))
        {
            client->Connected = true;
        }

        connected = client->Connected;
    }

    return connected;
}

bool PubSubClient_Disconnect(PubSubClient_t *const client)
{
    bool disconnected = false;

    if (client != NULL && client->Connected)
    {
        if (client->Interface.Disconnect())
        {
            client->Connected = false;

            disconnected = true;
        }
    }

    return disconnected;
}

bool PubSubClient_Subscribe(const PubSubClient_t *const client, const char *const topic, const PubSubClient_Qos_t qos)
{
    bool subscribed = false;

    if (client != NULL && client->Connected)
    {
        subscribed = client->Interface.Subscribe(topic, qos);
    }

    return subscribed;
}

bool PubSubClient_Unsubscribe(const PubSubClient_t *const client, const char *const topic)
{
    bool unsubscribed = false;

    if (client != NULL && client->Connected)
    {
        unsubscribed = client->Interface.Unsubscribe(topic);
    }

    return unsubscribed;
}

bool PubSubClient_Publish(const PubSubClient_t *const client, const PubSubClient_Message_t message, const bool retained, const PubSubClient_Qos_t qos)
{
    bool published = false;

    if (client != NULL && client->Connected)
    {
        published = client->Interface.Publish(message, retained, qos);
    }

    return published;
}

bool PubSubClient_GetMessage(const PubSubClient_t *const client, PubSubClient_Message_t *const message)
{
    bool received = false;

    if (client != NULL && client->Connected)
    {
        received = client->Interface.GetMessage(message);
    }

    return received;
}

static inline bool PubSubClient_CheckInterface(const PubSubClient_Interface_t *const interface)
{
    return (interface->Init != NULL &&
            interface->Connect != NULL &&
            interface->Disconnect != NULL &&
            interface->Subscribe != NULL &&
            interface->Unsubscribe != NULL &&
            interface->Publish != NULL &&
            interface->GetMessage != NULL);
}