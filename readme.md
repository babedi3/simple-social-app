# Simple Social Network
This project is a simple social network implemented using Django and Django REST Framework for the Back-End and React for the Front-End.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You will need to have the following installed:

Python 3.8+
Django 3.2+
Django Rest Framework
Celery
RabbitMQ (or other Celery compatible broker)

### Installation
First, clone the repository to your local machine:
```
git clone https://github.com/<your-username>/simple-social-network.git
cd simple-social-network
```

Install the required packages:
```
pip install -r requirements.txt
```

### Environment Variables
Create a .env file in the project root directory and define the following variables:
```
SECRET_KEY=<your-secret-key>
DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]

EMAIL_API_KEY=<email-validation-api-key>
GEOLOCATION_API_KEY=<geolocation-api-key>
HOLIDAY_API_KEY=<holiday-api-key>
```

### Database setup
This project uses Django's default database SQLite. Run migrations:
```
python manage.py migrate
```

### Running the server
To run the server, execute:
```
python manage.py runserver
```

### Running the tests
Tests are written with pytest. To run the tests, execute:

pytest

### Built With
Django - The web framework used
Django REST Framework - Toolkit for building Web APIs
Celery - Distributed Task Queue
RabbitMQ - Open source multi-protocol messaging broker

### Features
JWT Authentication
User signup with email validation
User login and token refresh
Post creation, retrieval, update, and deletion
Post liking and unliking
Asynchronous tasks for geolocation based on IP and holiday detection