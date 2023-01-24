from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    community = db.relationship("Community", back_populates="posts")
    user = db.relationship("User", back_populates="post")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'community_id': self.community_id,
            'content': self.content,
            'created_at': self.created_at
        }