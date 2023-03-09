from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import Vote

class VoteForm(FlaskForm):
    post_id = IntegerField('post_id', validators=[DataRequired()])
    vote = IntegerField('vote')