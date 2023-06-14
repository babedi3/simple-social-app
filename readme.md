# Simple Social Network
This project is a simple social network implemented using Django and Django REST Framework for the Back-End and React for the Front-End.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Back-End

### Prerequisites
You will need to have the following installed:

Python 3.8+

Django 3.2+

Django Rest Framework

Celery

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
Create a .env file in the back end project root directory (Back-End/socialapp) and define the following variables:
```
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
Tests are written with pytest. To run the tests, execute the following from the Back-End/socialapp directory:
'''
python manage.py test social
'''

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


## Front-End

Ensure Node.js and npm are installed on your system. If not, you can download and install them from here.

Navigate to the Front-End directory:
'''
cd Front-End
'''

Install the necessary npm packages:
'''
npm install
'''

Run the application:
'''
npm start
'''

The frontend should now be running at http://localhost:3000.

### Usage

Navigate to http://localhost:3000/signup to create a new user account.

Navigate to http://localhost:3000/login to log in with an existing user account.

Once logged in, navigate to http://localhost:3000/create to create a new post.

Navigate to http://localhost:3000/posts to view all posts.

Click on a post title to view the details of a single post.

### Tech Stack

The frontend is built with React and Axios is used for HTTP requests. It's a simple application designed to demonstrate the core functionalities of the backend, with user authentication and basic CRUD operations for posts.


## Setting Up Continuous Integration (CI) with Django and GitHub Actions

In the .github folder, I have a django.yml file that is used for CI setup.

CI tests will run on every push to the repository and on every pull request. After pushing your to GitHub, you can see the results of the CI tests on the "Actions" tab of the GitHub repository, showing a list of all workflows that have run, their status (success or failure), and a link to view more details.
