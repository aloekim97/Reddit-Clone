from app.models import db, Post, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo_posts= [
        Post(user_id=1, community_id=1, title="hi!", content="I love cats", created_at=datetime.now()),
        Post(user_id=2, community_id=2, title="hi!", content="I love App Academy", created_at=datetime.now()),
        Post(user_id=3, community_id=3, title="hi!", content="I love Memes", created_at=datetime.now()),
        Post(user_id=4, community_id=4, title="hi!", content="I love Maple", created_at=datetime.now())
    ]
    for post in demo_posts:
        db.session.add(post)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        
    db.session.commit()