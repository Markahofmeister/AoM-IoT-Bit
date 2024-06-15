"""Operations relating to MonogDB database for AoM IoT Bit"""

from bcrypt import checkpw, gensalt, hashpw
from mongoengine import connect
from mongoengine.errors import ValidationError
from mongoengine.queryset.queryset import QuerySet
from sys import path

from database_schemas import Clients, Services, Actions
from env_vars import MONGOURI, MESSAGE_LAYER_PATH
from logger import logger

path.append(MESSAGE_LAYER_PATH)
import channel_pb2
import configuration_pb2

connect(host=MONGOURI)


class DatabaseHandler_Services:
    """Operations for Services collection"""

    @staticmethod
    def add_service(uuid: str, token: str) -> bool:
        """Add a document for new service to the database"""
        service = Services(
            **{"uuid": uuid, "token": hashpw(token.encode(), gensalt(10))}
        )
        try:
            service.validate()
            service.save()
            logger.info("New service added to database")
        except ValidationError as validation_error:
            logger.warning("Failed to validate new service")
            logger.warning(validation_error)
            return False
        except Exception as exception:
            logger.warning("Failed to add new service to database")
            logger.warning(exception)
            return False
        return True

    @staticmethod
    def delete_service(uuid: str) -> bool:
        """Delete the document for service in the database"""
        try:
            if Services.objects(uuid=uuid).delete() != 1:
                logger.warning("Failed to delete service in database")
                return False
        except Exception as exception:
            logger.warning("Failed to delete service in database")
            logger.warning(exception)
            return False
        logger.info("Service deleted in database")
        return True


class DatabaseHandler_Clients:
    """Operations for Clients collection"""

    @staticmethod
    def client_auth(user_uuid: str, client_uuid: str, token: str) -> bool:
        """Authenticate an client"""
        client = Clients.objects(uuid=client_uuid).first()
        if client is not None:
            return user_uuid == client.user_uuid and checkpw(
                token.encode(), client.token.encode()
            )
        return False

    @staticmethod
    def get_client_configuration(uuid: str) -> configuration_pb2.Configuration:
        """Get client"""
        client = Clients.objects(uuid=uuid).first()
        configuration = configuration_pb2.Configuration()
        if client is not None:
            configuration.name = client.name
            for channel in client.channels:
                channel_configuration = channel_pb2.ChannelConfiguration()
                channel_configuration.number = channel.number
                channel_configuration.type = channel.type
                configuration.channel_configuration.append(channel_configuration)
        return None

    @staticmethod
    def get_client_user(uuid: str) -> str:
        """Get the UUID of the client's user"""
        return Clients.objects(uuid=uuid).first().user_uuid


class DatabaseHandler_Actions:
    """Operations for actions collection"""

    @staticmethod
    def get_actions(user_uuid: str = "") -> QuerySet:
        """Get all of a user's actions"""
        return Actions.objects(user_uuid=user_uuid)  # TODO return Actions protobuf


if __name__ == "__main__":
    pass
