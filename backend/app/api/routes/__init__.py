"""
This file sets up a main API router and includes other routers. 
The purpose of this file is to provide a centralized entry point for all 
API routes in the application and to allow for more modular and maintainable 
routing in the FastAPI application.
"""
from fastapi import APIRouter

from app.api.routes.mentors import router as mentors_router
from app.api.routes.mentees import router as mentees_router
from app.api.routes.users import router as users_router
from app.api.routes.countries import router as country_router
from app.api.routes.auth import router as auth_router
from app.api.routes.initial import router as initial_router
from app.api.routes.certificates import router as certificate_router
from app.api.routes.expertises import router as expertise_router
from app.api.routes.matches import router as matches_router
from app.api.routes.reviews import router as reviews_router
from app.api.routes.mentees_expertises import router as mentees_expertises_router
from app.api.routes.mentors_expertises import router as mentors_expertises_router
from app.api.routes.mentors_certificates import router as mentors_certificates_router
from app.api.routes.chats import router as chats_router
router = APIRouter()

router.include_router(users_router, tags=["users"])
router.include_router(mentors_router, tags=["mentors"])
router.include_router(mentees_router, tags=["mentees"])
router.include_router(country_router, tags=["countries"])
router.include_router(auth_router, tags=["auth"])
router.include_router(initial_router, tags=["initial"])
router.include_router(certificate_router, tags=["certificates"])
router.include_router(expertise_router, tags=["expertises"])
router.include_router(matches_router, tags=["matches"])
router.include_router(reviews_router, tags=["reviews"])
router.include_router(chats_router, tags=["chats"])

router.include_router(mentees_expertises_router, tags=["mentees_expertises"])
router.include_router(mentors_expertises_router, tags=["mentors_expertises"])
router.include_router(mentors_certificates_router, tags=["mentors_certificates"])
