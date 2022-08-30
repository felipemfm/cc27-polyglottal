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


@app.get("/railway/{line_or_station}")
def read_railway_data_by(line_or_station):
    return api.read_railway_data_by(line_or_station)


@app.get("/railway/stationTimeTable/{operator}/{station}/{line}/{direction}")
def get_station_time_table(operator, line, station, direction):
    return api.get_station_time_table(operator, line, station, direction)


@app.get("/railway/trainTimeTable/{train_number}")
def get_train_time_table(train_number):
    return api.get_train_time_table(train_number)


@app.get("/bus")
def read_bus_data():
    return api.read_bus_data()


@app.get("/bus/{title}")
def read_bus_data_by(title):
    return api.read_bus_data_by(title)
