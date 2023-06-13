from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    signup_date = models.DateTimeField(auto_now_add=True)
    geolocation_data = models.JSONField(null=True, blank=True)
    signup_holiday = models.BooleanField(default=False)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    def __str__(self):
        return self.content[:50]