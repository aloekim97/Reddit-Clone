from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])