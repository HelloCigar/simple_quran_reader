# quran/views.py

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets ,permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Surah, Verse, VerseNote
from .serializers import SurahSerializer, RegisterSerializer, LoginSerializer, SurahDetailSerializer, BookmarkAndCompletedSerializer, VerseNoteSerializer, VerseSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class SurahListCreateView(generics.ListAPIView):
    queryset = Surah.objects.all()
    serializer_class = SurahSerializer

class SurahDetailView(generics.RetrieveAPIView):
    queryset = Surah.objects.all()
    serializer_class = SurahDetailSerializer

class UpdateVerseBookmarkOrCompleted(generics.RetrieveUpdateAPIView):
    serializer_class = VerseSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        user = request.user
        surah_id = request.data.get('surah_id')
        verse_id = request.data.get('verse_id')
        option = request.data.get('option')

        if not surah_id or not verse_id:
            return Response({'error': 'Surah ID and Verse ID are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            surah = Surah.objects.get(id=surah_id)
        except Surah.DoesNotExist:
            return Response({'error': 'Surah not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            verse = Verse.objects.get(surah=surah, verse_id=verse_id)
        except Verse.DoesNotExist:
            return Response({'error': 'Verse not found in this Surah.'}, status=status.HTTP_404_NOT_FOUND)

        verse = Verse.objects.get(surah=surah, verse_id=verse_id)

        if option == 'bookmarked':
            if verse.bookmarked:
                verse.bookmarked = False
            else:
                verse.bookmarked = True
        elif option == 'completed':
            if verse.completed:
                verse.completed = False
            else:
                verse.completed = True

        verse.save()

        serializer = BookmarkAndCompletedSerializer(verse)
        return Response(serializer.data, status=status.HTTP_200_OK)

class VerseNoteCreate(generics.CreateAPIView):
    serializer_class = VerseNoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer, verse):
        serializer.save(user=self.request.user, verse=verse)

    def create(self, request, *args, **kwargs):
        surah_id = request.data.get('surah_id')
        verse_id = request.data.get('verse_id')
        content = request.data.get('content')


        try:
            surah = Surah.objects.get(id=surah_id)
            verse = Verse.objects.get(surah=surah, verse_id=verse_id)
        except (Surah.DoesNotExist, Verse.DoesNotExist):
            return Response({'error': 'Invalid surah or verse ID'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'surah': surah.id, 'verse': verse.id, 'content': content})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, verse)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def handle_exception(self, exc):
        response = super().handle_exception(exc)
        if isinstance(exc, serializers.ValidationError):
            custom_response_data = {'error': str(exc)}
            response.data = custom_response_data
        return response








         




    
