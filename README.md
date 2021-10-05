## Authentication App

An Authentication App using Django and React.

## Installation
```bash
docker-compose up
```
 
## Description:

1. auth_server:
    1. Developed using Django.
    2. To Start the Server:
        1. Install the requirement.txt file.
        2. Run the following commands:
            python manage.py makemigrations
            python manage.py migrate
            python manage.py runserver


2. auth_client:
    1. Developed using React.
    2. To Start the Client:
        1. Run npm i to install all the packages.
        2. Run npm start to start the client.

## Note: Ensure the .env file is added in auth_client as http://localhost:8000. 

