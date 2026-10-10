from pydantic import BaseModel
from typing import Optional

class PaperBase(BaseModel):
    title: str
    authors: str
    venue: Optional[str] = None
    tldr: Optional[str] = None
    status: Optional[str] = "In Queue"

class PaperCreate(PaperBase):
    pass

class PaperResponse(PaperBase):
    id: int

    class Config:
        from_attributes = True