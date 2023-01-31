from app.models import db, Comment, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comments = [
        Comment(user_id=4, post_id=1, comment="Me too!", created_at=datetime.now()),
        Comment(user_id=3, post_id=2, comment="Me too!", created_at=datetime.now()),
        Comment(user_id=2, post_id=4, comment="Me too!", created_at=datetime.now()),
        Comment(user_id=1, post_id=4, comment="Me too!", created_at=datetime.now()),
    ]  
    for comment in comments:
        db.session.add(comment)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")
        
    db.session.commit()