from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Community

class UpdateCommunityForm(FlaskForm):
    community_img = StringField('community_img')
    background_img = StringField('background_img')
    description = StringField('description')