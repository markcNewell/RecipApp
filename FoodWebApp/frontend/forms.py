from django import forms
from ktag.fields import TagField

class TagForm(forms.Form):

    ingredients = TagField(label='', place_holder='Ingredients', delimiters=' ',
                      data_list=['courgette', 'tomato', 'cucumber', 'pepper', 'chicken',
                      'beef', 'flour', 'broccoli', 'garlic', 'soy sauce', 'onion',
                      'salt', 'egg', 'rice', 'milk'], max_tags=5)

