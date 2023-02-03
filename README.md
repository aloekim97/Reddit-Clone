# Reelit
Reelit is a clone of a widley known socail media platform, Reddit. Reelit currently has three full CRUD features that are operational, with one more on its way. Users are able to log into an existing account and view, create, edit, and delete posts, communities, and comments. 

# Languages
- Python
- Javascript

# Backend
- Flask
- SQLAlchemy
- SQLite

# Frontend
- React
- Redux
- HTML
- CSS

# Hosting
- Render.com
-(https://reelit.onrender.com)

## Wiki Links
- [Database Schema](https://github.com/aloekim97/Reddit-Clone/wiki/Database-Schema)
- [Feature List](https://github.com/aloekim97/Reddit-Clone/wiki/Features-List)
- [User Story](https://github.com/aloekim97/Reddit-Clone/wiki/User-Stories)
- [Wire Frame](https://github.com/aloekim97/Reddit-Clone/wiki/Wire-Frames)

## How to begin using Reelit:
1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


[Render.com]: https://render.com/
[Dashboard]: [https://dashboard.render.com](https://reelit.onrender.com) Reddit-Clone
