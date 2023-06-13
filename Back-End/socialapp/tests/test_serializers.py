import pytest
from social.serializers import UserSerializer, PostSerializer
from .factories import UserFactory, PostFactory

@pytest.mark.django_db
def test_user_serializer():
    user = UserFactory()
    serializer = UserSerializer(user)
    assert serializer.data['email'] == user.email

@pytest.mark.django_db
def test_post_serializer():
    post = PostFactory()
    serializer = PostSerializer(post)
    assert serializer.data['content'] == post.content
