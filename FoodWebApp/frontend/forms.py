from django import forms
from ktag.fields import TagField

class TagForm(forms.Form):
    ingredients = TagField(label='ingredients', place_holder='write your ingredients', delimiters=' ',
                          data_list=['apple', 'banana', 'watermelon', 'orange'], initial='grape coconut')
