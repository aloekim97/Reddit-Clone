from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

class UpdateCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])