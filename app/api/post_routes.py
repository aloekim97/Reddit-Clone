from flask import Blueprint, jsonify, session, request
from app.models import Post, db
from app.forms import PostForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime


post = Blueprint('post', __name__)

#all posts
@post.route('/')
def index():
    posts = [post.to_dict() for post in Post.query.all()]

    return{"posts": posts}

#post by community
@post.route('/<int:communityId>')
def get_post(communityId):
    posts = [post.to_dict() for post in Post.query.filter(Post.community_id == communityId)]

    return{"posts": posts}

#add post
@post.route('/<int:communityId>', methods=["POST"])
@login_required
def create_post(communityId):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            user_id= current_user.id,
            community_id = communityId,
            content = form.data['content'],
            created_at = datetime.now() 
        )
        db.session.add(post)
        db.session.commit()
        return{"post": post}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#update post
@post.route('/<int:communityId>/<int:postId>', methods=['PUT'])
@login_required
def update_post(communityId, postId):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.filter(Post.community_id == communityId, Post.id == postId)

        if current_user.id == Post.user_id:
            post.content = form.data['content']

        db.session.commit()
        return{"post": post}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#delete post
@post.route('/<int:communityId>/<int:postId>', methods=['Delete'])
@login_required
def delete_post(communityId, postId):
    post = Post.query.filter(Post.community_id == communityId, post.id == postId)

    if Post.user_id == current_user.id:
        db.delete(post)
        db.commit()

    return {"message": "post was deleted"}