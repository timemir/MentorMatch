from fastapi_jwt_auth import AuthJWT
from starlette.config import Config
from pydantic import BaseModel

config = Config(".env")


class Settings(BaseModel):
    authjwt_secret_key: str = config("AUTH_SECRET", cast=str)
    authjwt_access_token_expires: int = config("ACCESS_TOKEN_EXPIRE", cast=int)
    authjwt_algorithm: str = config("ALGORITHM", cast=str)
    authjwt_token_location: dict = {"cookies"}
    authjwt_cookie_max_age: int = config("ACCESS_TOKEN_EXPIRE", cast=int)
    # authjwt_cookie_csrf_protect: bool = True


@AuthJWT.load_config
def get_config():
    return Settings()
