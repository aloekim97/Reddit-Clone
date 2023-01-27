from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

class PostUpdateForm(FlaskForm):
    content = StringField('content')
    title = StringField('title', validators=[DataRequired()])