To run locally:
  1. Clone the repo
  2. Open terminal, ```cd backend```, and install the required packages using ```pip``` (install ```pip``` if you haven't already):
     - ```django```
     - ```djangorestframework```
     - ```djangorestframework-simplejwt```
     - ```django-cors-headers```
     - Run to import quran to database: ```python manage.py import_quran "./api/quran_data/quran_en.json"```
     - Then start the Django server using ```python manage.py runserver```
  3. Open another terminal, ```cd frontend```, then run:
     - ```npm install```
     - ```npm run dev```
  4. Open the link given by Vite
