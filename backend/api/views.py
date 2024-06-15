# quran/views.py

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Surah, Verse, VerseNote
from .serializers import SurahSerializer, RegisterSerializer, LoginSerializer, SurahDetailSerializer, BookmarkAndCompletedSerializer, VerseNoteSerializer, VerseSerializer
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

        if option == 'bookmark':
            if verse.bookmarked:
                verse.bookmarked = False
                print(verse, 'here')
            else:
                verse.bookmarked = True
                print(verse, 'here')
        elif option == 'completed':
            if verse.completed:
                verse.completed = False
                print(verse, 'here')
            else:
                verse.completed = True
                print(verse, 'here')

        verse.save()

        serializer = BookmarkAndCompletedSerializer(verse)
        return Response(serializer.data, status=status.HTTP_200_OK)

# class VerseNoteCreate(generics.CreateAPIView):
#     serializer_class = VerseNoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return VerseNote.objects.filter(user=user)
    
#     def post(self, request, *args, **kwargs):
#         user = request.user
#         surah_id = request.data.get('surah_id')
#         verse_id = request.data.get('verse_id')
    

        
