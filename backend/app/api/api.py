from calendar import weekday
import requests
import json
import os
import datetime

from dotenv import load_dotenv

load_dotenv()


def set_weekday():
    # Function will determine if the "today" is a weekday, weekend or a holiday
    # and return the appropriate string to be used with the external API
    with open('data/railway.json', 'r', encoding='utf-8', errors='ignore') as stream:
        data = json.load(stream)
        date = datetime.date.today()
        if (date in data or date.weekday() == 0 or date.weekday() == 6):
            return 'SaturdayHoliday'
        else:
            return "Weekday"


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
    weekday = set_weekday()
    params = {
        'acl:consumerKey': f'{apiKey}',
        'odpt:station': f'odpt.Station:{operator}.{line}.{station}',
        'odpt:railDirection': f'odpt.RailDirection:{operator}.{direction}',
        'odpt:calendar': f'odpt.Calendar:{weekday}'
    }
    url = 'https://api.odpt.org/api/v4/odpt:StationTimetable'
    data = requests.get(url, params=params).json()

    for entry in data[0]['odpt:stationTimetableObject']:
        train_number = entry['odpt:trainNumber']
        type = entry['odpt:trainType'].replace(
            f'odpt.TrainType:{operator}.', '')
        departure_time = entry['odpt:departureTime']
        destination = entry['odpt:destinationStation'][0].replace(
            'odpt.Station:', '').split('.')
        station_time_table.append({
            'train_number': train_number,
            'type': type,
            'departure_time': departure_time,
            'destination': {
                "operator": destination[0],
                "line": destination[1],
                "station": destination[2]
            }
        })

    return station_time_table


def get_train_time_table(train_number):
    train_time_table = []
    params = {
        'acl:consumerKey': f'{apiKey}',
        'odpt:trainNumber': f'{train_number}'
    }
    url = 'https://api.odpt.org/api/v4/odpt:TrainTimetable'
    data = requests.get(url, params=params).json()

    header = data[0]["odpt:railway"].replace('Railway', 'Station')

    for entry in data[0]['odpt:trainTimetableObject']:
        if ('odpt:departureTime' in entry):
            time = entry['odpt:departureTime']
            station = entry['odpt:departureStation']
        else:
            time = entry['odpt:arrivalTime']
            station = entry['odpt:arrivalStation']

        train_time_table.append({
            "time": time,
            "station": station.replace(f"{header}.", "")
        })

    return train_time_table
