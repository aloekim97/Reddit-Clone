from app.models import db, Community, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_communities():
    demo_community = [
        Community(name='Cats', owner_id=1, community_img='https://www.shihoriobata.com/wp-content/uploads/2021/07/chibi-cat-drawing-1-799x1024.jpg',background_img='https://preview.redd.it/8698okq1k6411.jpg?auto=webp&s=38f1ea4bc6bbd87b1914dae0ea1fb0ed8447d01e', description="Join us!"),
        Community(name='App Academy', owner_id=2, community_img='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.webp', background_img='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/6269b3a19f67fd137a262d0a_A%20Logo%20Main%20-%20Red.svg', description="Join us!"),
        Community(name='League Of Memes', owner_id=3, community_img='https://styles.redditmedia.com/t5_2tf0e/styles/communityIcon_5hxci89b2wd31.jpeg?width=256&format=pjpg&v=enabled&s=410b334edf5c76c052550b2b6ec5d37d1c50130d',background_img='https://images8.alphacoders.com/101/1018077.jpg', description="Join us!"),
        Community(name='Maplestory', owner_id=4, community_img='https://ih1.redbubble.net/image.741111264.2639/st,small,507x507-pad,600x600,f8f8f8.u1.jpg' ,background_img='https://preview.redd.it/lojqg6ox5hz81.png?width=5760&format=png&auto=webp&v=enabled&s=10b1f05ebb12d0aebc6399cf88f485ace0cc1558', description="Join us!"),
    ]  
    for community in demo_community:
        db.session.add(community)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_communities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.communities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM communities")
        
    db.session.commit()