from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

class PostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()]),
    content = StringField('content', validators=[DataRequired()])