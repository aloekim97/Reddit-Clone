from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('post.id')), nullable=False)
    comment = db.Column(db.String(2000))
    replies = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False)
    

    community = db.relationship("Community", back_populates="comment")
    post = db.relationship("Post", back_populates="comment")
    user = db.relationship("User", back_populates="comment")

    def to_dict(self):
        return {
            'id': self.id,
            'community_id': self.community_id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment': self.comment,
            'replies': self.replies.to_dict(),
            'created_at': self.created_at
        }


