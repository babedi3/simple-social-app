from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Post
from unittest.mock import patch

class UserSignupTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = reverse('signup')
        self.valid_payload = {
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
    @patch('social.views.enrich_user.delay')
    def test_create_user(self,mock_task):
        response = self.client.post(self.signup_url, self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'test@example.com')
        user = User.objects.get(email=self.valid_payload['email'])
        mock_task.assert_called_with(user.id)


class PostTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user('testuser', 'test@example.com', 'testpassword123')
        self.client.force_authenticate(user=self.user)
        self.post_url = reverse('post-list')
        self.valid_payload = {
            'content': 'This is a test post.'
        }

    def test_create_post(self):
        response = self.client.post(self.post_url, self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Post.objects.get().content, 'This is a test post.')

    def test_like_post(self):
        post = Post.objects.create(user=self.user, content='This is a test post.')
        like_url = reverse('post-like', kwargs={'pk': post.id})
        response = self.client.post(like_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(post.likes.count(), 1)
