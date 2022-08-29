import requests
import json
import os

from dotenv import load_dotenv

load_dotenv()

def read_railway_data():
    with open('data/railway.json', 'r', encoding='utf-8', errors='ignore') as stream:
        data = json.load(stream)

    return data
    

def read_railway_data_by(line_or_station):
    selected_data = []
    with open('data/railway.json', 'r', encoding='utf-8', errors='ignore') as stream:
        data = json.load(stream)

    for entry in data:
        if line_or_station in entry['line'].lower() or line_or_station in entry['station'].lower():
            selected_data.append(entry)
    
    return selected_data


apiKey = os.getenv('API_KEY')

def get_station_time_table(operator, line, station, direction):
    station_time_table = []
    params = {
        'acl:consumerKey':f'{apiKey}',
        'odpt:station':f'odpt.Station:{operator}.{line}.{station}',
        'odpt:railDirection':f'odpt.RailDirection:{operator}.{direction}',
        'odpt:calendar':'odpt.Calendar:Weekday'
    }
    url = 'https://api.odpt.org/api/v4/odpt:StationTimetable'
    data = requests.get(url, params=params).json()
    
    for entry in data[0]['odpt:stationTimetableObject']:
        train_number = entry['odpt:trainNumber']
        type = entry['odpt:trainType'].replace(f'odpt.TrainType:{operator}.','')
        departure_time = entry['odpt:departureTime']
        destination = entry['odpt:destinationStation'][0].replace('odpt.Station:','').split('.')
        station_time_table.append({
            'train_number': train_number, 
            'type': type, 
            'departure_time' : departure_time, 
            'destination': {
                "operator" : destination[0],  
                "line" : destination[1],
                "station" : destination[2]               
                }
            })
    
    return station_time_table
    