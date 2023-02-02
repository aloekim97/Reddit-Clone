from flask import Blueprint, jsonify, session, request
from app.models import Comment, db
from app.forms import CommentForm, UpdateCommentForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime


comment = Blueprint('comment', __name__)

#Comments
@comment.route('/')
def index():
    comments = [comment.to_dict() for comment in Comment.query.all()]

    return{"comments": comments}


#add comment
@comment.route('/', methods=['POST'])
@login_required
def add_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            user_id = current_user.id,
            post_id = form.data['post_id'],
            comment = form.data['comment'],
            created_at = datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        return {"comment": comment.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#edit comment
@comment.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
    form = UpdateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment.query.filter(Comment.id == commentId).one()
    
        if comment:

            comment.comment = form.data['comment']

            db.session.commit()
            return{"comment": comment.to_dict()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@comment.route('/<int:commentId>', methods=['Delete'])
@login_required
def delete_comment(commentId):
    comment = Comment.query.filter(Comment.id == commentId).one()

    if comment:
        db.session.delete(comment)
        db.session.commit()

        return {"message": "comment was deleted"}
    else:
        return {'errors': "error"}, 400