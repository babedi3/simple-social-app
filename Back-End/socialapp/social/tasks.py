from celery import shared_task
from .models import UserProfile
from django.contrib.auth.models import User
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

API_KEY = os.getenv("API_KEY")

@shared_task
def enrich_user(user_id):
    user = User.objects.get(id=user_id)

    # Extract IP from user's last login
    ip = user.last_login.ip

    # Get geolocation data
    geolocation_response = requests.get(f'https://ipgeolocation.abstractapi.com/v1/?api_key={API_KEY}&ip_address={ip}')
    geolocation_data = geolocation_response.json()

    # Get holiday data
    holiday_response = requests.get(f"https://holidays.abstractapi.com/v1/?api_key={API_KEY}&country={geolocation_data['US']}&year=2023&month=1&day=1")
    holidays = holiday_response.json()

    # Check if signup date was a holiday
    signup_holiday = any(holiday['date'] == user.userprofile.signup_date.strftime('%Y-%m-%d') for holiday in holidays)

    # Update user's geolocation data and signup holiday flag
    user.userprofile.geolocation_data = geolocation_data
    user.userprofile.signup_holiday = signup_holiday
    user.userprofile.save()
