
window.onload = function() {

	// document.getElementsByClassName('contactForm')[0].submit(function () {
	// 	 elementAdd();
	// 	 return false;
	// });

	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var ingredients = url.searchParams.get("ingredients");

	ingredientsList = ingredients.split(" ");

	if (ingredientsList.length > 0) {
		makeAPIRequest(ingredientsList);
	}
}

function searchBtn(){
	alert();
	mockAPIRequest();
	//makeAPIRequest(["aubergine", "soya chunks", "carrots"]);
}

function makeAPIRequest(ingredientsList) {
	var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=1&ranking=1&ingredients=";

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



function displayResults(obj) {

	var list = document.getElementsByClassName("resultsTable")[0];

	/*Inefficient but fine for now*/
	list.innerHTML = "";

	for (var i = 0; i < obj.length; i++) {

		/*Create an entry into the table for each recipie*/
		createResult(obj[i]);

	}

	displayRecipes();

}


function createResult(obj) {

	makeRecipeRequest(obj, obj["id"]);
	//Should be used for real implementation
	//createRow(obj, null);

}

function createRow(obj, details) {
	var list = document.getElementsByClassName("resultsTable")[0];

	var row = document.createElement("tr");
	var column1 = document.createElement("td");
	var column2 = document.createElement("td");
	var column3 = document.createElement("td");

	var thumbnail = document.createElement("img");

	thumbnail.src = obj["image"];

	var sourceURL = details["sourceUrl"];

	row.onclick = function() {
		location = sourceURL;
	};

	column1.classList.add("imgColumn");
	thumbnail.classList.add("thumbnail");
	column2.innerHTML = obj["title"];

	column1.appendChild(thumbnail);

	row.appendChild(column1);
	row.appendChild(column2);
	list.appendChild(row);
}


function elementAdd() {
	var textBox = document.getElementById("searchText");

	alert(textBox.value);
}


function displayRecipes() {
	var section = document.getElementsByClassName("recipesSection")[0];
	section.style.display = "block";
}
