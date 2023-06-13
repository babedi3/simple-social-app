import pytest
from social.models import User, Post
from .factories import UserFactory, PostFactory

@pytest.mark.django_db
def test_create_user():
    user = UserFactory()
    assert User.objects.count() == 1

@pytest.mark.django_db
def test_create_post():
    post = PostFactory()
    assert Post.objects.count() == 1
