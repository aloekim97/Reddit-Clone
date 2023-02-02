from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Community

def community_exists(form, field):
    # Checking if user exists
    name = field.data
    community = Community.query.filter(Community.name == name).first()
    if community:
        raise ValidationError('Community already exists')

class CommunityForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), community_exists])
    community_img = StringField('community_img')
    background_img = StringField('background_img')
    description = StringField('description')