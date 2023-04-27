from datetime import datetime
from pydantic import BaseModel


class Timestamps(BaseModel):
    createdAt: datetime
    updatedAt: datetime
