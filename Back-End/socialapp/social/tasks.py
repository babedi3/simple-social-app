from celery import shared_task
from .models import UserProfile
from django.contrib.auth.models import User
import requests
import os
from dotenv import load_dotenv

load_dotenv()

GEOLOCATION_API_KEY = os.getenv("GEOLOCATION_API_KEY")
HOLIDAY_API_KEY = os.getenv("HOLIDAY_API_KEY")

@shared_task
def enrich_user(user_id):
    user = User.objects.get(id=user_id)

    # IP from user's last login
    ip = user.last_login.ip

    # Geolocation data
    geolocation_response = requests.get(f'https://ipgeolocation.abstractapi.com/v1/?api_key={GEOLOCATION_API_KEY}&ip_address={ip}')
    geolocation_data = geolocation_response.json()

    # Holiday data
    holiday_response = requests.get(f"https://holidays.abstractapi.com/v1/?api_key={HOLIDAY_API_KEY}&country={geolocation_data['US']}&year=2023&month=1&day=1")
    holidays = holiday_response.json()

    # Check if signup date was a holiday
    signup_holiday = any(holiday['date'] == user.userprofile.signup_date.strftime('%Y-%m-%d') for holiday in holidays)

    user.userprofile.geolocation_data = geolocation_data
    user.userprofile.signup_holiday = signup_holiday
    user.userprofile.save()
