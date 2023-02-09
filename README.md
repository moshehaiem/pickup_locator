# pickup_locator

The pickup locator enables athletes to post pickup basketball locations on a map with relevant data including athletes present, athletes needed, date and time, and a message

### Instructions on how to start up

1) Create a .env file in the root directory with the following variables
REACT_APP_MAPBOX_ACCESS_TOKEN={get a mapbox acces token from mapbox gl}
REACT_APP_API_SERVER={path to server. locally, this is `"http://localhost:8000/api/"`}

2) Open up two terminals. 1 for server, 1 for web

3) In the first terminal, make sure you pipenv shell in the root directory. Then cd into server and run
`python manage.py runserver`

4) In the second terminal, cd into web and then run `npm start`



### Features
- Clicking on the map automatically opens a popup form that allows you to create a location for a pickup game
- Clicking on a marker on the map opens up a popup form that allows you to edit or delete a preexisting pickup game
- You can also filter on relevant data such as athletes needed range, date and time, etc
- Top left corner of the map has tools that allow you to go to current location, zoom in and out, etc
