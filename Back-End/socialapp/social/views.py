from django.shortcuts import render
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile
from .models import Post
from .serializers import PostSerializer
from .serializers import UserSerializer
from django.contrib.auth.models import User
import requests
from .tasks import enrich_user
from rest_framework.decorators import action
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_API_KEY = os.getenv("EMAIL_API_KEY")
class UserSignup(APIView):
    def post(self, request):
        # Extract email from POST data
        print(request)
        email = request.data.get('email')
        print(email)
        if User.objects.filter(username=email).exists():
            return Response({'detail': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        # Send GET request to AbstractAPI's Email Validation API
        response = requests.get(f'https://emailvalidation.abstractapi.com/v1/?api_key={EMAIL_API_KEY}&email={email}')
        print(response.json())
        # Extract the is_valid field from the response
        is_smtp_valid = response.json().get('is_smtp_valid')

        # If the email is not valid, return a 400 status code
        if not is_smtp_valid:
            return Response({'detail': 'Invalid email.'}, status=status.HTTP_400_BAD_REQUEST)
        print("email:",email)
        # Otherwise, create the User and UserProfile
        user = User.objects.create_user(username=email, email=email, password=request.data.get('password'))
        UserProfile.objects.create(user=user)
        enrich_user.delay(user.id)

        # Serialize the UserProfile instance and return it
        serializer = UserSerializer(user.userprofile)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [permissions.IsAuthenticated, IsOwner]
        return super(PostViewSet, self).get_permissions()
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        post.likes.add(request.user)
        return Response({'status': 'post liked'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        post = self.get_object()
        post.likes.remove(request.user)
        return Response({'status': 'post unliked'}, status=status.HTTP_200_OK)
    
class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user