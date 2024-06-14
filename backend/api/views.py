# quran/views.py

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Surah, Progress, Verse
from .serializers import SurahSerializer, ProgressSerializer, RegisterSerializer, LoginSerializer, SurahDetailSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

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

class SurahListCreateView(generics.ListCreateAPIView):
    queryset = Surah.objects.all()
    serializer_class = SurahSerializer

class SurahDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Surah.objects.all()
    serializer_class = SurahDetailSerializer

class ProgressListCreateView(generics.ListCreateAPIView):
    serializer_class = ProgressSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        surah_id = request.data.get('surah_id')
        verse_id = request.data.get('verse_id')

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

        progress, created = Progress.objects.get_or_create(user=user, surah=surah)
        verse = Verse.objects.get(surah=surah, verse_id=verse_id)
        progress.bookmarked_verses.add(verse)

        serializer = ProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    

class ProgressDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        surah_id = request.data.get('surah_id')
        verse_id = request.data.get('verse_id')
        
        if surah_id and verse_id:
            progress = get_object_or_404(Progress, user=request.user, surah_id=surah_id)
            verse = get_object_or_404(Verse, surah_id=surah_id, verse_id=verse_id)
            progress.bookmarked_verses.remove(verse)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response({'error': 'Surah ID and Verse ID are required'}, status=status.HTTP_400_BAD_REQUEST)

class CheckBookmarkView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        surah_id = request.query_params.get('surah_id')
        verse_id = request.query_params.get('verse_id')

        if surah_id and verse_id:
            progress = Progress.objects.filter(user=request.user, surah_id=surah_id, bookmarked_verses__verse_id=verse_id).exists()
            return Response({'bookmarked': progress}, status=status.HTTP_200_OK)
        
        return Response({'error': 'Surah ID and Verse ID are required'}, status=status.HTTP_400_BAD_REQUEST)
