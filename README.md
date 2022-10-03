# Tokyo Public Transport Assistant 
## About

The Japanese Capital have railway infrastructure like no where in the world, using it is safe to say that you can go anywhere within its larger metropolitan area. But, with its numerous Operators, Lines, Stations, Train types, it can be intimidating for new comers, to navigate thought the system.

Tokyo Public Transport Assistant was created to help alleviate the problem and it is powered by [Public Transportation Open Data API](https://www.odpt.org/en/info). 

The application offer its user the ability to search a train line or station, selecting a station will list all train departures ordered by departure time, clinking on a specific train will display its itinerary. With this information, the user can first check the type of incoming train and by clicking on it, see if it will stop at its desired destination.

## Installation

 ### Backend
 **Important!** The backend setup will require an API key that will be made available after registering at the [PTOD website](https://developer.odpt.org/en/users/sign_up).

 - Change into the backend directory folder and create a .env file with the following:
 ```
 API_KEY=[YOUR_API_KEY]
 ```
 
 - Run pip install
 ```
 pip install
 ```
 - Change into the data folder and run the scraper file
 ```
 cd data
 python scraper.py
 ```
 Two JSON files should appear inside the data folder
 
 - Return to the backend folder and run the server
 ```
	cd ../
	uvicorn app.main:app --reload
```
### Frontend
 - Change into the client directory folder, run yarn install and yarn start
```
	cd client
	yarn install
	yarn start
```
## Technologies 
 - JavaScript
 - React
 - Redux
 - Pyhon
 - FastAPI