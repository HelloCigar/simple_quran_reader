# quran/urls.py

from django.urls import path
from .views import UpdateVerseBookmarkOrCompleted, SurahListCreateView, SurahDetailView, VerseNoteCreate
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('surahs/', SurahListCreateView.as_view(), name='surah-list-create'),
    path('surahs/<int:pk>/', SurahDetailView.as_view(), name='surah-detail'),
    path('verse/bookmarked/', UpdateVerseBookmarkOrCompleted.as_view(), name='progress-list-create'),
    path('verse/bookmarked/remove/', UpdateVerseBookmarkOrCompleted.as_view(), name='progress-list-create'),
    path('verse/completed/', UpdateVerseBookmarkOrCompleted.as_view(), name='progress-list-create'),
    path('verse/completed/remove/', UpdateVerseBookmarkOrCompleted.as_view(), name='progress-list-create'),
    path('verse/notes/add_note/', VerseNoteCreate.as_view(), name='add-or-update'),
    path('verse/notes/remove_note', VerseNoteCreate.as_view(), name='progress-list-create'),
]
