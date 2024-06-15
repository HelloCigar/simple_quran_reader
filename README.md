First things first, why?
  - I'm bored af and got nothing to do. I am not a religious person, but my father is.
  - This was built in 3-5 days lol. It's very barebones, but the backend has all the CRUD operations of a basic database.
  - I might add features that come up in my head. React is a pain to work with.
  - I might rewrite this in Svelte in the future(no guarantees).

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
