from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

class PostForm(FlaskForm):
    community_id = IntegerField('community_id', validators=[DataRequired()])
    content = StringField('content')
    title = StringField('title', validators=[DataRequired()])