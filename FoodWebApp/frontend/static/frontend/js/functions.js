
document.onload = function() {
	var btn = document.getElementsByClassName("btn")[0];
	btn.addEventListener("click",searchBtn);


	document.getElementsByClassName('contactForm')[0].submit(function () {
		 elementAdd();
		 return false;
	});
}

function searchBtn(){
	//mockAPIRequest();
	makeAPIRequest(["aubergine", "soya chunks", "carrots"]);
}

function makeAPIRequest(ingredientsList) {
	var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=2&ranking=1&ingredients="

	location += ingredientsList[0]; //add the first element
	for (var i = 1; i < ingredientsList.length; i++) {
		var ingredient = ingredientsList[i].replace(' ', '+');
		location += "%2C+" + ingredient;
	}

	alert(location);
	/*
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert();
			displayResults(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", location, true);
	xhttp.setRequestHeader("X-RapidAPI-Key", "afffc09374mshd6fd056ddf7a02cp1404a7jsnbda4416806e8");
	xhttp.send();
	*/
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

	var object2 = {
		0: {
			"id":407000,
			"title":"Vegetarian Burgers",
			"image":"https://spoonacular.com/recipeImages/407000-312x231.jpg",
			"imageType":"jpg",
			"usedIngredientCount":3,
			"missedIngredientCount":3,
			"likes":0
		}
	}


	displayResults(object);
}



function displayResults(obj) {

	alert(JSON.stringify(obj));

	alert(JSON.stringify(obj[0]));


	var list = document.getElementsByClassName("resultsTable")[0];

	/*Inefficient but fine for now*/
	list.innerHTML = "";

	for (var i = 0; i < obj.length; i++) {

		var element = document.createElement("li");

		element.innerHTML = obj[i]["title"];

		list.appendChild(element);

		/*Create an entry into the table for each recipie*/
		//createResult(obj["recipies"][i]);
		
	}

}


function createResult(obj) {

	var list = document.getElementsByClassName("resultsTable")[0];

	var element = document.createElement("li");

	//element.classList.add(""); Will be used when needing to add classes to style the element
	element.innerHTML = obj["name"];

	list.appendChild(element);
}


function elementAdd() {
	var textBox = document.getElementById("searchText");

	alert(textBox.value);
}