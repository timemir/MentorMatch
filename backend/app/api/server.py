"""
# Main Application File
This file serves as the main entry point for the FastAPI application. 
It creates an instance of the FastAPI class and sets up various configurations. 
Additionally, it includes the API routes defined in the "app.api.routes" module 
and returns the FastAPI instance to be used as the application.
"""
from app.db.database import engine, Base
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import sessionmaker
from app.auth import auth
from app.core import config
import logging
import sys
from app.api.routes import router as api_router
from app.models import *

# Configure logging
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logger = logging.getLogger(__name__)

# print("-----------------")
# print(Base.metadata.tables.keys())
# print("-----------------")


def get_application():
    app = FastAPI(
        title=config.PROJECT_NAME,
        version=config.VERSION,
        openapi_url="/api/v1/openapi.json",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Setup event listeners
    @app.on_event("startup")
    async def on_startup():
        """Startup handler"""
        logger.info("Starting server")
        # Create database tables
        Base.metadata.create_all(bind=engine, checkfirst=True)

    @app.on_event("shutdown")
    async def on_shutdown():
        """Shutdown handler"""
        logger.info("Shutting down server")

    app.include_router(api_router, prefix="/api")

    return app


app = get_application()
