from app.models import db, Vote, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_vote():
    demo_votes = [
        Vote(user_id=4, post_id=30, vote=1),
        Vote(user_id=3, post_id=30, vote=1),
        
    ]
    for vote in demo_votes:
        db.session.add(vote)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_vote():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM votes")
        
    db.session.commit()