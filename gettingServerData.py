import requests
import json
gameData = requests.get('https://gamedataserver.onrender.com/getData')
if gameData.status_code == 200:
    data = gameData.json()
    print(data['gameData'])
     
    
    filename = 'onlineData.json'

    # Read existing data (if any)
    try:
        with open(filename, 'r') as file:
            existing_data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        print('error reading existing data')
        existing_data = []

    # Append new game data
    existing_data.append(data['gameData'])

    # Write back to the file
    with open(filename, 'w') as file:
        json.dump(existing_data, file, indent=2)