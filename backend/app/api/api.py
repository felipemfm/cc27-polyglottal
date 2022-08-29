import json

def read_railway_data():
    with open('data/railway.json', 'r',encoding='utf-8', errors='ignore') as stream:
        data = json.load(stream)

    return data

def read_railway_data_by(line_or_station):
    selected_data = []
    with open('data/railway.json', 'r',encoding='utf-8', errors='ignore') as stream:
        data = json.load(stream)

    for point in data:
        if line_or_station in point['line'].lower() or line_or_station in point['station'].lower():
            selected_data.append(point)
    
    return selected_data