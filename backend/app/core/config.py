"""
This file contains the configuration settings for the project. 
It uses the Config class from the starlette library to load environment 
variables from a .env file. It sets the values for various configurations 
like project name, version, API prefix, secret key, and database URL. 
The database URL is created by concatenating the values of various database 
parameters like user, password, server, port, and database name.
"""
from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

PROJECT_NAME = "MentorMatch"
VERSION = "1.0.0"
API_PREFIX = "/api"

SECRET_KEY = config("SECRET_KEY", cast=Secret, default="CHANGEME")

POSTGRES_USER = config("POSTGRES_USER", cast=str)
POSTGRES_PASSWORD = config("POSTGRES_PASSWORD", cast=Secret)
POSTGRES_SERVER = config("POSTGRES_SERVER", cast=str, default="db")
POSTGRES_PORT = config("POSTGRES_PORT", cast=str, default="5432")
POSTGRES_DB = config("POSTGRES_DB", cast=str)
SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
# DATABASE_URL = config(
#   "DATABASE_URL",
#   cast=DatabaseURL,
#   default=f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
# )
