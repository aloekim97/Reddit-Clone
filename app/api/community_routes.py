from flask import Blueprint, jsonify, session, request
from app.models import Community, db
from app.forms import CommunityForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages

community = Blueprint('comm', __name__)

#all communities 
@community.route("/")
def index():
    comms = [comm.to_dict() for comm in Community.query.all()]

    return {"communities": comms}


#one community
@community.route("/<int:community_id>")
def one_community(community_id):
    comms = [comm.to_dict() for comm in Community.query.filter(Community.id == community_id)]

    return {"Community": comms}

#add community
@community.route("/", methods=["POST"])
@login_required
def create_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        
        comms = Community(
            name = form.data['name'],
            owner_id = current_user.id,
            community_img = form.data['community_img'],
            background_img = form.data['background_img'],
            description = form.data['description'],
        )
        db.session.add(comms)
        db.session.commit()
        return {"NewCommunity": comms.to_dict()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

#delte community
@community.route("/<int:community_id>", methods=["DELETE"])
@login_required
def del_community(community_id):
    community = Community.query.filter(Community.id == community_id).first()

    if current_user.id == Community.owner_id:
        db.session.delete(community)
        db.session.commit()

    return {"community": "Community was deleted"}

