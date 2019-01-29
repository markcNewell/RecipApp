function makeAPIRequest(ingredientsList) {
	var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ingredients=";

	location += ingredientsList[0]; //add the first element
	for (var i = 1; i < ingredientsList.length; i++) {
		var ingredient = ingredientsList[i].replace(' ', '+');
		location += "%2C+" + ingredient;
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			displayResults(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", location, true);
	xhttp.setRequestHeader("X-RapidAPI-Key", "afffc09374mshd6fd056ddf7a02cp1404a7jsnbda4416806e8");
	xhttp.send();

}


function makeRecipeRequest(obj, id) {
	var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			createRow(obj,JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", location, true);
	xhttp.setRequestHeader("X-RapidAPI-Key", "afffc09374mshd6fd056ddf7a02cp1404a7jsnbda4416806e8");
	xhttp.send();

}


/*Made a mock object to avoid using the true API calls*/
function mockAPIRequest() {
	var object = {
		'recipies' : [
			{"name" : "Chicken Kiev"},
			{"name" : "Steak"},
			{"name" : "Beef Stew"}
		]
	};

	var object2 = [
		{
			"id":407000,
			"title":"Vegetarian Burgers",
			"image":"https://spoonacular.com/recipeImages/407000-312x231.jpg",
			"imageType":"jpg",
			"usedIngredientCount":3,
			"missedIngredientCount":3,
			"likes":0
		},
		{
			"id":479101,
			"title":"Vegetarian Burgers",
			"image":"https://spoonacular.com/recipeImages/407000-312x231.jpg",
			"imageType":"jpg",
			"usedIngredientCount":3,
			"missedIngredientCount":3,
			"likes":0
		}
	]


	displayResults(object2);
}