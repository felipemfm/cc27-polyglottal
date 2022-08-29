# uvicorn app.main:app --reload

from fastapi import FastAPI

from app.api import api

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/railway")
def read_railway_data():
    return api.read_railway_data()
