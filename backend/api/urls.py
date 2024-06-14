# quran/urls.py

from django.urls import path
from .views import SurahListCreateView, SurahDetailView, ProgressListCreateView, ProgressDetailView, RegisterView, LoginView, LogoutView

urlpatterns = [
    path('surahs/', SurahListCreateView.as_view(), name='surah-list-create'),
    path('surahs/<int:pk>/', SurahDetailView.as_view(), name='surah-detail'),
    path('progress/', ProgressListCreateView.as_view(), name='progress-list-create'),
    path('progress/<int:pk>/', ProgressDetailView.as_view(), name='progress-detail'),
]
