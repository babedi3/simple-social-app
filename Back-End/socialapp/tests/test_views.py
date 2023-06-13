import pytest
from rest_framework.test import APIClient
from .factories import UserFactory, PostFactory

@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_get_posts(api_client):
    post = PostFactory()
    response = api_client.get('/posts/')
    assert response.status_code == 200
    assert response.data[0]['content'] == post.content
