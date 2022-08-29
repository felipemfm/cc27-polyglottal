import json

def read_railway_data():
    with open('data/railway.json', 'r',encoding='utf-8', errors='ignore') as stream:
        data = json.load(stream)

    return data
