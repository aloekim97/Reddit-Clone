from .db import db, environment, SCHEMA, add_prefix_for_prod


class Vote(db.Model):
    __tablename__ = 'votes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False)

    community = db.relationship("Community", back_populates="posts")
    user = db.relationship("User", back_populates="post")
    comment = db.relationship("Comment", back_populates="post", cascade="all, delete")
    


    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'community_id': self.community_id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at
        }