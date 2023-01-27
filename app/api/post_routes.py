from flask import Blueprint, jsonify, session, request
from app.models import Post, db
from app.forms import PostForm, PostUpdateForm
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

#one post
@post.route('/<int:communityId>/<int:postId>')
def get_one_post(communityId, postId):
    posts = Post.query.filter(Post.community_id == communityId, Post.id == postId).one()

    return{"posts": posts.to_dict()}


#add post
@post.route('/', methods=["POST"])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            user_id= current_user.id,
            community_id = form.data['community_id'],
            content = form.data['content'],
            created_at = datetime.now(),
            title = form.data['title']
        )
        db.session.add(post)
        db.session.commit()
        return{"posts": post.to_dict()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#update post
@post.route('/<int:postId>', methods=['PUT'])
@login_required
def update_post(postId):
    form = PostUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.filter(Post.id == postId).one()

        if post:
            post.content = form.data['content']
            post.title = form.data['title']

            db.session.commit()
            print(post)
            return{ "posts": post.to_dict() }

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#delete post
@post.route('/<int:postId>', methods=['Delete'])
@login_required
def delete_post(postId):
    post = Post.query.filter(Post.id == postId).one()

    if post:
        db.session.delete(post)
        db.session.commit()

        return {"message": "post was deleted"}
    else:
        return {'errors': "error"}, 400