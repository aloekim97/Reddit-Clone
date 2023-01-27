from flask import Blueprint, jsonify, session, request
from app.models import Community, db
from app.forms import CommunityForm
from flask_login import current_user, login_user, logout_user, login_required
from .auth_routes import validation_errors_to_error_messages

community = Blueprint('community', __name__)

#all communities 
@community.route("/")
def index():
    comms = [comm.to_dict() for comm in Community.query.all()]

    return {"Communities": comms}


#one community
@community.route("/<int:community_id>")
def one_community(community_id):
    comms = Community.query.get(community_id)

    return comms.to_dict()


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
        return {"Community": comms.to_dict()}

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# update community
@community.route("/<int:community_id>", methods = ["PUT"])
@login_required
def edit_community(community_id):
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comms = Community.query.filter(Community.id == community_id).one()
        
        comms.name = form.data['name']
        comms.community_img = form.data['community_img']
        comms.background_img = form.data['background_img']
        comms.description = form.data['description']

        db.session.commit()
        return comms.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



#delete community
@community.route("/<int:community_id>", methods=["DELETE"])
@login_required
def del_community(community_id):
    community = Community.query.get(community_id)

    if community:
        db.session.delete(community)
        db.session.commit()

        return {"Community": "Community was deleted"}
    else:
        return {'errors': "error"}, 400

