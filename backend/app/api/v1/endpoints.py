from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.paper import PaperModel
from app.schemas.paper import PaperCreate, PaperResponse

router = APIRouter()

@router.get("/", response_model=List[PaperResponse])
def get_papers(db: Session = Depends(get_db)):
    return db.query(PaperModel).all()

@router.post("/", response_model=PaperResponse)
def add_paper(paper: PaperCreate, db: Session = Depends(get_db)):
    db_paper = PaperModel(**paper.dict())
    db.add(db_paper)
    db.commit()
    db.refresh(db_paper)
    return db_paper

@router.delete("/{paper_id}")
def delete_paper(paper_id: int, db: Session = Depends(get_db)):
    db_paper = db.query(PaperModel).filter(PaperModel.id == paper_id).first()
    if not db_paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    db.delete(db_paper)
    db.commit()
    return {"message": "Paper removed successfully"}