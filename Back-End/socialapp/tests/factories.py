import factory
from django.contrib.auth import get_user_model
from social.models import Post

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = get_user_model()

    email = factory.Faker('email')


class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    user = factory.SubFactory(UserFactory)
    content = factory.Faker('text')
