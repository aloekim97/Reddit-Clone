from .db import db, environment, SCHEMA, add_prefix_for_prod


class Member(db.Model):
    __tablename__ = 'members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    community_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('communities.id')), nullable=False)

    user = db.relationship("User", back_populates="member")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'community_id': self.community_id
        }