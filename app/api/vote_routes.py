from flask import Blueprint, jsonify, session, request
from app.models import Vote, db
from app.forms import VoteForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages

vote = Blueprint('vote', __name__)

#all votes
@vote.route('/')
def index():
    votes = [vote.to_dict() for vote in Vote.query.all()]

    return{"votes": votes}

#one vote
@vote.route('/<int:id>')
def one_vote(id):
    vote = Vote.query.filter(Vote.user_id == id).first()

    return{"vote": vote.to_dict()}

#add vote
@vote.route('/', methods=["POST"])
@login_required
def add_vote():
    form = VoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        vote = Vote(
            user_id = current_user.id,
            post_id = form.data['post_id'],
            vote = form.data['vote']
        )
        db.session.add(vote)
        db.session.commit()
        return{"vote": vote.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#update vote
@vote.route('/<int:vote_id>', methods=["PUT"])
@login_required
def update_vote(vote_id):
    form = VoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        vote = Vote.query.filter(Vote.id == vote_id).one()

        if vote:
            vote.post_id = form.data['post_id']
            vote.vote = form.data['vote']

            db.session.commit()
            return {"vote": vote.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE vote.
# GET votes for a post.
# By post id as a parameter.
# Get user vote for a post.