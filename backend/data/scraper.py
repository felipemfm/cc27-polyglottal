import requests
import json
import os

from dotenv import load_dotenv

load_dotenv()

apiKey = os.getenv('API_KEY')


def create_railway_json():
    operators = ['TokyoMetro', 'TWR', 'Yurikamome',
                 'TamaMonorail', 'Toei', 'YokohamaMunicipal', 'MIR']
    json_obj = []
    url = 'https://api.odpt.org/api/v4/odpt:Railway'

    for operator in operators:
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
            ascending = entry["odpt:ascendingRailDirection"].replace(
                f'odpt.RailDirection:{operator}.',
                ""
            )
            descending = entry["odpt:descendingRailDirection"].replace(
                f'odpt.RailDirection:{operator}.',
                ""
            )

            for station_element in entry['odpt:stationOrder']:
                station = station_element["odpt:station"].replace(
                    f'odpt.Station: {operator}.{line}.', "")
                station_en = station_element['odpt:stationTitle']['en']
                station_ja = station_element['odpt:stationTitle']['ja']
                json_obj.append({
                    "line": line,
                    "color": color,
                    "code": code,
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


create_railway_json()
