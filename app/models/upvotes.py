from .db import db, environment, SCHEMA, add_prefix_for_prod


class Vote(db.Model):
    __tablename__ = 'votes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    vote = db.Column(db.Integer)
    

    post = db.relationship("Post", back_populates="vote")
    user = db.relationship("User", back_populates="vote")
    # comment = db.relationship("Comment", back_populates="post")
    


    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.id,
            'post_id': self.post_id,
            'vote': self.vote
        }