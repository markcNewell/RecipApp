import random

from django import forms

from example.models import People
from ktag.fields import TagField


class TagForm(forms.Form):
    ingredients = TagField(label='', place_holder='Write your ingredients...', delimiters=' ',
                      data_list=['courgette', 'tomato', 'cucumber', 'pepper', 'chicken',
                      'beef', 'flour', 'broccoli', 'garlic', 'soy sauce', 'onion',
                      'salt', 'egg', 'rice', 'milk','bread','peppers','avocado','salad'], initial='')


class PeopleAdminForm(forms.ModelForm):
    class Meta:
        model = People
        fields = '__all__'

    ingredients = TagField(label='ingredients', place_holder='write your ingredients', delimiters=',',
                      data_list=['courgette', 'tomato', 'cucumber', 'pepper', 'chicken',
                      'beef', 'flour', 'broccoli', 'garlic', 'soy sauce', 'onion',
                      'salt', 'egg', 'rice', 'milk'])


def random_number():
    return [random.randint(10, 19), random.randint(10, 19), random.randint(10, 19), random.randint(10, 19), ]


class dataListFuncTestForm(forms.Form):
    number = TagField(label='number', place_holder='write your number', delimiters=' ',
                      data_list=random_number)
