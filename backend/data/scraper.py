from ast import operator
import requests
import json
import os

from dotenv import load_dotenv

load_dotenv()

apiKey = os.getenv('API_KEY')


def create_railway_json():
    print('Start railway json creation')
    operators = ['TokyoMetro', 'TWR', 'Yurikamome',
                 'TamaMonorail', 'Toei', 'YokohamaMunicipal', 'MIR']
    json_obj = []
    url = 'https://api.odpt.org/api/v4/odpt:Railway'

    for operator in operators:
        print(f'->{operator}')
        params = {
            'acl:consumerKey': f'{apiKey}',
            'odpt:operator': f'odpt.Operator:{operator}'
        }
        data = requests.get(url, params=params).json()

        for entry in data:
            line = entry['owl:sameAs'].replace(f'odpt.Railway:{operator}.', '')
            if 'odpt:color' in entry:
                color = entry['odpt:color']
            else:
                color = '#7F8487'
            code = entry['odpt:lineCode']
            line_en = entry['odpt:railwayTitle']['en']
            line_ja = entry['odpt:railwayTitle']['ja']
            ascending = entry["odpt:ascendingRailDirection"]
            descending = entry["odpt:descendingRailDirection"]

            for station_element in entry['odpt:stationOrder']:
                station = station_element["odpt:station"].replace(
                    f'odpt.Station:{operator}.{line}.', "")
                station_en = station_element['odpt:stationTitle']['en']
                station_ja = station_element['odpt:stationTitle']['ja']
                json_obj.append({
                    "color": color,
                    "code": code,
                    "operator": operator,
                    "line": line,
                    "line_en": line_en,
                    "line_ja": line_ja,
                    "ascending": ascending,
                    "descending": descending,
                    "station": station,
                    "station_en": station_en,
                    "station_ja": station_ja
                })

    with open("data/railway.json", 'w') as outfile:
        json.dump(json_obj, outfile)


def create_bus_json():
    print('Start bus json creation')
    operators = ['SeibuBus', 'TokyuBus',
                 'KeioBus', 'NishiTokyoBus', 'OdakyuBus', 'SotetsuBus', 'KeiseiTransitBus ']
    json_obj = []
    url = 'https://api.odpt.org/api/v4/odpt:BusroutePattern'

    for operator in operators:
        print(f'->{operator}')
        params = {
            'acl:consumerKey': f'{apiKey}',
            'odpt:operator': f'odpt.Operator:{operator}'
        }
        data = requests.get(url, params=params).json()

        for entry in data:
            route_operator = entry['odpt:operator'].replace(
                'odpt.Operator:', '')
            code = entry['owl:sameAs']
            title = entry['dc:title']
            title_en = code.replace('odpt.BusroutePattern:', '').split('.')[1]
            json_obj.append({
                "route_operator": route_operator,
                "code": code,
                "title": title,
                "title_en": title_en
            })

    with open("data/bus.json", 'w') as outfile:
        json.dump(json_obj, outfile)


create_railway_json()

create_bus_json()
