# quran/management/commands/import_quran.py

import json
from django.core.management.base import BaseCommand
from api.models import Surah, Verse

class Command(BaseCommand):
    help = 'Import Quran data from JSON file'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='The JSON file containing the Quran data')

    def handle(self, *args, **kwargs):
        json_file = kwargs['json_file']

        with open(json_file, 'r', encoding='utf-8') as file:
            data = json.load(file)

        for surah_data in data:
            surah, created = Surah.objects.get_or_create(
                id=surah_data['id'],
                defaults={
                    'name': surah_data['name'],
                    'transliteration': surah_data['transliteration'],
                    'translation': surah_data['translation'],
                    'type': surah_data['type'],
                    'total_verses': surah_data['total_verses'],
                }
            )

            for verse_data in surah_data['verses']:
                Verse.objects.get_or_create(
                    surah=surah,
                    verse_id=verse_data['id'],
                    defaults={
                        'text': verse_data['text'],
                        'translation': verse_data['translation'],
                    }
                )

        self.stdout.write(self.style.SUCCESS('Successfully imported Quran data'))
