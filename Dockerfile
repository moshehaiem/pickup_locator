# pull official base image
FROM python:3.9.0-slim-buster

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV REACT_APP_MAPBOX_ACCESS_TOKEN pk.eyJ1IjoibW9zaGVoYWllbSIsImEiOiJjbGNzaGtkZTAwcHM1M3BteHpld2FpdDB1In0.8sgxSa400qyrZXwxXbQjiQ
ENV REACT_APP_API_SERVER http://localhost:8000/api/

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .