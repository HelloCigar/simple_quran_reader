# quran/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Surah, Verse, Progress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password':  {'write_only': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class VerseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verse
        fields = ['id', 'verse_id', 'text', 'translation']

class SurahSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surah
        fields = ['id', 'name', 'transliteration', 'translation', 'type', 'total_verses']

class SurahDetailSerializer(serializers.ModelSerializer):
    verses = VerseSerializer(many=True, read_only=True)

    class Meta:
        model = Surah
        fields = ['id', 'name', 'transliteration', 'translation', 'type', 'total_verses', 'verses']

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ['id', 'user', 'surah', 'current_verse', 'bookmarked_verses']
