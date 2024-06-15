# quran/models.py

from django.contrib.auth.models import User
from django.db import models

class Surah(models.Model):
    name = models.CharField(max_length=255)
    transliteration = models.CharField(max_length=255)
    translation = models.CharField(max_length=255)
    type = models.CharField(max_length=50)
    total_verses = models.IntegerField()

    def __str__(self):
        return self.name

class Verse(models.Model):
    surah = models.ForeignKey(Surah, related_name='verses', on_delete=models.CASCADE)
    verse_id = models.IntegerField()
    text = models.TextField()
    translation = models.TextField()
    bookmarked = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.translation} - {self.verse_id} - {self.bookmarked} - {self.completed}'

class VerseNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    surah = models.ForeignKey(Surah, on_delete=models.CASCADE)
    verse = models.OneToOneField(Verse, on_delete=models.CASCADE)
    content = models.TextField()
