from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    comment = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    

    post = db.relationship("Post", back_populates="comment")
    user = db.relationship("User", back_populates="comment")
    reply = db.relationship("Reply", back_populates="comment", cascade="all, delete")
    

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'post_id': self.post_id,
            'comment': self.comment,
            'reply': self.reply.to_dict(),
            'created_at': self.created_at
        }


