from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .forms import TagForm


def index(request):

	if request.method == 'POST':
		form = TagForm(request.POST)
		if form.is_valid():
			print(form.cleaned_data['ingredients'])
			ingredients = form.cleaned_data['ingredients']
			return render(request, 'frontend/index.html', {'form': form, 'ingredients':ingredients})
	else:
		form = TagForm()
	return render(request, 'frontend/static/index.html', {'form': form})



	# template = loader.get_template('frontend/index.html')
	# return HttpResponse(template.render({}, request))


	

