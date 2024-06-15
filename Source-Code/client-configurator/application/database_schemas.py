"""Document schemas for MonogDB database for NC2"""

from mongoengine import Document
from mongoengine.fields import DateTimeField, IntField, ListField, MapField, StringField
from sys import path

from env_vars import MESSAGE_LAYER_PATH

path.append(MESSAGE_LAYER_PATH)
import channel_pb2


class Users(Document):
    """Define user schema"""

    email = StringField(required=True, unique=True, trim=True)
    password = StringField(required=True, min_length=8)
    uuid = StringField(required=True, unique=True, trim=True, min_length=36)
    date = DateTimeField()


class Services(Document):
    """Define controller schema"""

    uuid = StringField(required=True, unique=True, trim=True, min_length=36)
    token = StringField(required=True, trim=True)


class Channel(Document):
    """Define client channel schema"""

    number = IntField(required=True)
    type = IntField(
        required=True,
        choices=[
            channel_pb2.CHANNELTYPE_GENERIC_DIGITAL_OUTPUT,
            channel_pb2.CHANNELTYPE_GENERIC_DIGITAL_INPUT,
            channel_pb2.CHANNELTYPE_GENERIC_ANALOG_OUTPUT,
            channel_pb2.CHANNELTYPE_GENERIC_ANALOG_INPUT,
        ],
    )


class Clients(Document):
    """Define client schema"""

    name = StringField(required=True, trim=True)
    uuid = StringField(required=True, unique=True, trim=True, min_length=36)
    token = StringField(required=True, trim=True)
    user_uuid = StringField(required=True, trim=True, min_length=36)
    channels = ListField(required=True)


class Actions(Document):
    """Define action schema"""

    name = StringField(required=True, trim=True)
    uuid = StringField(required=True, unique=True, trim=True, min_length=36)
    user_uuid = StringField(required=True, trim=True, min_length=36)
    trigger_topic = StringField(required=True)
    trigger_state = IntField(required=True)
    responses = MapField(IntField(), required=True)


if __name__ == "__main__":
    pass
