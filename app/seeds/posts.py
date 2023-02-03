from app.models import db, Post, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_posts():
    demo_posts= [
        Post(user_id=1, community_id=1, title="hi!", content="I love cats", created_at=datetime.now()),
        Post(user_id=2, community_id=2, title="Pencils are love!", content="I love Pencis", created_at=datetime.now()),
        Post(user_id=3, community_id=2, title="#2 pencil overrated?!", content="Use three or two", created_at=datetime.now()),
        Post(user_id=4, community_id=5, title="Which fan to get", content="electric or handheld", created_at=datetime.now()),
        Post(user_id=1, community_id=3, title="Memes for one piece?", content="I love it", created_at=datetime.now()),
        Post(user_id=2, community_id=4, title="CSS question", content="How do i make my images look better?", created_at=datetime.now()),
        Post(user_id=3, community_id=1, title="Cats!", content="I really like cats", created_at=datetime.now()),
        Post(user_id=4, community_id=5, title="So many fans in here", content="nothing else to say", created_at=datetime.now()),
        Post(user_id=1, community_id=3, title="THE ONE PIECE", content="IS REAL", created_at=datetime.now()),
        Post(user_id=2, community_id=6, title="Open for good anime recs", content="One Piece", created_at=datetime.now()),
        Post(user_id=3, community_id=12, title="I hate this game", content="complete dog water", created_at=datetime.now()),
        Post(user_id=4, community_id=9, title="Tell me your favoite food", content="", created_at=datetime.now()),
        Post(user_id=1, community_id=7, title="dont forget to use chapstick", content="please", created_at=datetime.now()),
        Post(user_id=2, community_id=6, title="Open this", content="you weeb", created_at=datetime.now()),
        Post(user_id=3, community_id=11, title="water", content="its time to hydrate", created_at=datetime.now()),
        Post(user_id=1, community_id=4, title="hi!", content="I love coding", created_at=datetime.now()),
        Post(user_id=2, community_id=12, title="unplayable", content="dc every 30 min", created_at=datetime.now()),
        Post(user_id=3, community_id=14, title="Question", content="Does it really keep the doctors away?", created_at=datetime.now()),
        Post(user_id=4, community_id=11, title="water", content="its time to hydrate", created_at=datetime.now()),
        Post(user_id=1, community_id=8, title="ryze", content="buff ryze", created_at=datetime.now()),
        Post(user_id=2, community_id=15, title="I hate this game", content="I really hate this game", created_at=datetime.now()),
        Post(user_id=3, community_id=13, title="Best Anime", content="Roof piece", created_at=datetime.now()),
        Post(user_id=4, community_id=10, title="doors", content="Sweeden got some high tech doors", created_at=datetime.now()),
        Post(user_id=1, community_id=9, title="Food?", content="I do like ramen", created_at=datetime.now()),
        Post(user_id=2, community_id=13, title="Caught up now what?", content="I caught up and i feel so empty", created_at=datetime.now()),
        Post(user_id=3, community_id=8, title="scuttle crab", content="better than most gold players", created_at=datetime.now()),
        Post(user_id=4, community_id=10, title="doors?", content="What door should i buy", created_at=datetime.now()),
        Post(user_id=1, community_id=14, title="Iphone issue", content="It bricked and idk what to do", created_at=datetime.now()),
        Post(user_id=2, community_id=15, title="My teammates are bringing me down", content="what do i do?", created_at=datetime.now()),
        Post(user_id=4, community_id=7, title="Your lips are chapped", content="Dont lick them now", created_at=datetime.now()),
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