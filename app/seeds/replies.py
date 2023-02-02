from app.models import db, Reply, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_replies():
    replies = [
        Reply(user_id=3, comment_id=4, reply="same", created_at=datetime.now()),
        Reply(user_id=4, comment_id=3, reply="same", created_at=datetime.now()),
        Reply(user_id=1, comment_id=2, reply="same", created_at=datetime.now()),
        Reply(user_id=2, comment_id=1, reply="same", created_at=datetime.now()),
    ]  
    for reply in replies:
        db.session.add(reply)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM replies")
        
    db.session.commit()