from rest_framework import serializers
from .models import UserProfile
from .models import Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'signup_date', 'geolocation_data', 'signup_holiday']
        
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'likes']