window.onresize = function() {
	checkWindowSize();
}

window.onload = function() {

	checkWindowSize();

	var url_string = window.location.href; //window.location.href
	var url = new URL(url_string);
	var ingredients = url.searchParams.get("ingredients");

	ingredientsList = ingredients.split(" ");

	if (ingredientsList.length > 0) {
		makeAPIRequest(ingredientsList);
	}
}

function checkWindowSize() {
	var desktopBackground = document.getElementsByClassName("background")[0];
	var mobileBackground = document.getElementsByClassName("background")[1];

	if (window.innerWidth < 700) {		
		desktopBackground.style.display = "none";
		mobileBackground.style.display = "block";
	}
	else {
		mobileBackground.style.display = "none";
		desktopBackground.style.display = "block";
	}
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

	autoScroll();
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

function autoScroll() {
	var windowHeight = window.innerHeight;
	window.scrollTo(0,windowHeight);
}
