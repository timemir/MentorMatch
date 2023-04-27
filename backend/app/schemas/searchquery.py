from pydantic import BaseModel
from typing import Optional


class SearchQuery(BaseModel):
    user_input: Optional[str] = None
    expertise_id: Optional[int] = None
    country_id: Optional[str] = None
    level_id: Optional[int] = None
