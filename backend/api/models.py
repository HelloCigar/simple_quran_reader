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

    def __str__(self):
        return f'{self.surah.name} - {self.verse_id}'

class Progress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    surah = models.ForeignKey(Surah, on_delete=models.CASCADE)
    current_verse = models.IntegerField(default=0)
    bookmarked_verses = models.ManyToManyField(Verse, related_name='bookmarked_by_users')

    def __str__(self):
        return f'{self.user.username} - {self.surah.name} - Verse {self.current_verse}'
