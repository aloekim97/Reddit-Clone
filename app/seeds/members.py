from app.models import db, Member, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_members():
    demo_members = [
        Member(user_id=1, community_id=2),
        Member(user_id=1, community_id=3),
        Member(user_id=1, community_id=4),
        Member(user_id=2, community_id=1),
        Member(user_id=2, community_id=3),
        Member(user_id=2, community_id=4),
        Member(user_id=3, community_id=1),
        Member(user_id=3, community_id=2),
        Member(user_id=3, community_id=4),
        Member(user_id=4, community_id=1),
        Member(user_id=4, community_id=2),
        Member(user_id=4, community_id=3),
    ]
    for member in demo_members:
        db.session.add(member)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM members")
        
    db.session.commit()