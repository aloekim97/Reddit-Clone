from app.models import db, Comment, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comments = [
        Comment(user_id=1, post_id=1, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=2, comment="same", created_at=datetime.now()),
        Comment(user_id=3, post_id=3, comment="same", created_at=datetime.now()),
        Comment(user_id=4, post_id=4, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=5, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=6, comment="same", created_at=datetime.now()),
        Comment(user_id=3, post_id=7, comment="same", created_at=datetime.now()),
        Comment(user_id=4, post_id=8, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=9, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=10, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=11, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=12, comment="same", created_at=datetime.now()),
        Comment(user_id=3, post_id=13, comment="same", created_at=datetime.now()),
        Comment(user_id=4, post_id=14, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=15, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=16, comment="same", created_at=datetime.now()),
        Comment(user_id=3, post_id=17, comment="same", created_at=datetime.now()),
        Comment(user_id=4, post_id=18, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=19, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=20, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=21, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=22, comment="same", created_at=datetime.now()),
        Comment(user_id=3, post_id=23, comment="same", created_at=datetime.now()),
        Comment(user_id=4, post_id=24, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=25, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=26, comment="same", created_at=datetime.now()),
        Comment(user_id=3, post_id=27, comment="same", created_at=datetime.now()),
        Comment(user_id=4, post_id=28, comment="same", created_at=datetime.now()),
        Comment(user_id=1, post_id=29, comment="same", created_at=datetime.now()),
        Comment(user_id=2, post_id=30, comment="same", created_at=datetime.now()),


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