from app.models import db, Community, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_communities():
    demo_community = [
        Community(name='Cats', owner_id=1, community_img='https://www.shihoriobata.com/wp-content/uploads/2021/07/chibi-cat-drawing-1-799x1024.jpg',background_img='https://preview.redd.it/8698okq1k6411.jpg?auto=webp&s=38f1ea4bc6bbd87b1914dae0ea1fb0ed8447d01e', description="Share your cat!"),
        Community(name='Pencils', owner_id=1, community_img='https://images.ctfassets.net/f1fikihmjtrp/46vOKllYdc1eEGZKXO5eS2/6387e4664ee704658d0b183444c12b52/20305-single-3ww-l.jpg',background_img='https://weareticonderoga.com/wp-content/uploads/2019/06/13308_GLAMOUR_2000X2000.png', description="Number 2 pencil best pencil"),
        Community(name='MemePiece', owner_id=1, community_img='https://cdn.wallpapersafari.com/47/42/xMgQub.jpg',background_img='https://i.ytimg.com/vi/djyTG19Achg/maxresdefault.jpg', description="Share your best One Piece meme"),
        Community(name='AppAcademy', owner_id=2, community_img='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.webp', background_img='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/6269b3a19f67fd137a262d0a_A%20Logo%20Main%20-%20Red.svg', description="Join us!"),
        Community(name='toothfloss', owner_id=2, community_img='https://m.media-amazon.com/images/I/51MqxcSKrrS.jpg', background_img='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ghk-index-floorfans-083-1659635402.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*', description="tower fan or fan?"),
        Community(name='Anime', owner_id=2, community_img='https://pics.me.me/a-weeb-you-are-already-aeaer-by-the-time-you-45180812.png', background_img='https://pics.me.me/a-weeb-you-are-already-aeaer-by-the-time-you-45180812.png', description="You weeb"),
        Community(name='Chapstick', owner_id=2, community_img='https://www.cvs.com/bizcontent/merchandising/productimages/large/305732051512.jpg', background_img='https://images.freshop.com/00036600815010/c2c8e5d24c267127fc589b93052a07fa_large.png', description="What chapstick do you use?"),
        Community(name='LeagueOfMemes', owner_id=3, community_img='https://styles.redditmedia.com/t5_2tf0e/styles/communityIcon_5hxci89b2wd31.jpeg?width=256&format=pjpg&v=enabled&s=410b334edf5c76c052550b2b6ec5d37d1c50130d',background_img='https://images8.alphacoders.com/101/1018077.jpg', description="Join us!"),
        Community(name='food', owner_id=3, community_img='https://food.fnr.sndimg.com/content/dam/images/food/fullset/2022/10/13/0/bowl-of-instant-ramen-with-pork-and-egg.jpg.rend.hgtvcom.476.317.suffix/1665672563714.jpeg',background_img='https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1608506169128-S6KYNEV61LEP5MS1UIH4/traditional-food-around-the-world-Travlinmad.jpg', description="Talk about food!"),
        Community(name='doors', owner_id=3, community_img='https://images.thdstatic.com/productImages/4c83e566-ba08-47bb-82c1-2b160437544f/svn/tangerine-mmi-door-steel-doors-without-glass-z024087r-64_600.jpg',background_img='https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/05/featured-photo-types-of-doors.jpeg.jpg', description="Looking for a door review?"),
        Community(name='water', owner_id=3, community_img='https://domf5oio6qrcr.cloudfront.net/medialibrary/7909/conversions/b8a1309a-ba53-48c7-bca3-9c36aab2338a-thumb.jpg',background_img='https://believe.earth/wp-content/uploads/2018/10/economia-agua-pixabay-believe-earth.jpg', description="Stay hydrated!"),
        Community(name='Maplestory', owner_id=4, community_img='https://ih1.redbubble.net/image.741111264.2639/st,small,507x507-pad,600x600,f8f8f8.u1.jpg' ,background_img='https://preview.redd.it/lojqg6ox5hz81.png?width=5760&format=png&auto=webp&v=enabled&s=10b1f05ebb12d0aebc6399cf88f485ace0cc1558', description="Join us!"),
        Community(name='OnePiece', owner_id=4, community_img='https://cdn.vox-cdn.com/thumbor/2hUgaMDVXlVAnp2T5VNylRbHpYM=/0x0:2000x800/1200x800/filters:focal(567x124:887x444)/cdn.vox-cdn.com/uploads/chorus_image/image/70952340/5265_SeriesHeaders_OP_2000x800_wm.0.jpg' ,background_img='https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/800px-One_Piece_Logo.svg.png', description="The best show to ever exist"),
        Community(name='Apple', owner_id=4, community_img='https://files.tecnoblog.net/wp-content/uploads/2020/11/apple-logo.jpg' ,background_img='https://usapple.org/wp-content/uploads/2019/10/apple-pink-lady.png', description="Apple or apple you can decide"),
        Community(name='LeagueofLegends', owner_id=4, community_img='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/LoL_icon.svg/1200px-LoL_icon.svg.png' ,background_img='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/1200px-League_of_Legends_2019_vector.svg.png', description="Toxic"),
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