from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.core.database import Base

class PaperModel(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    authors = Column(String, nullable=False)
    venue = Column(String, nullable=True)
    tldr = Column(Text, nullable=True)
    status = Column(String, default="In Queue") # "In Queue", "Read", "Archived"
    created_at = Column(DateTime, default=datetime.utcnow)