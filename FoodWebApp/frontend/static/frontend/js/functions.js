var GLOBAL_TAGS = 

window.onresize = function() {
	checkWindowSize();
}

window.onload = function() {

	checkWindowSize();

	$("#searchbtn").click(() => {

		$('#modal').modal('show');

		var tags = $(document).find("tag");
		var values = [];

		if (tags.length > 0) {
			tags.each(function(index, element) {
			var el = $(element).find("span");
				values.push($(el[0]).html());
			});

			GLOBAL_TAGS = values;

			makeAPIRequest(values);
		}
		else {
			$('#modal').modal('hide');
		}
	});

	$("#filterbtn").click(() => {

		var filterInputs = $("#filters").find("input");
		var filters = ""

		filterInputs.each(function(index, element) {
			var name = $(element).attr("name");
			var value = $(element).val();
		});

		makeAPIRequest(GLOBAL_TAGS, filters);

	});
}






function checkWindowSize() {

	if (window.innerWidth < 600) {
		$($(".background")[0]).css("display", "none");
		$($(".background")[1]).css("display", "block");
		$($(".ad")[0]).css("display", "none");
	}
	else {
		$($(".background")[1]).css("display", "none");
		$($(".background")[0]).css("display", "block");
		$($(".ad")[0]).css("display", "block");
	}
	
}






function makeAPIRequest(ingredientsList, filters=null) {
	var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=2&ranking=1&ingredients=";
	//var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=2&offset=1&search=";

	location += ingredientsList[0]; //add the first element
	for (var i = 1; i < ingredientsList.length; i++) {
		var ingredient = ingredientsList[i].replace(' ', '+');
		location += "%2C+" + ingredient;
	}

	if (filters != null) {
		location += filters;
		alert(location);
	}


	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			displayResults(JSON.parse(this.responseText), ingredientsList);
		}
	};
	xhttp.open("GET", location, true);
	xhttp.setRequestHeader("X-RapidAPI-Key", "afffc09374mshd6fd056ddf7a02cp1404a7jsnbda4416806e8");
	xhttp.send();
}







function makeRecipeRequest(obj, id, values) {
	var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			createRow(obj,JSON.parse(this.responseText), values);
		}
	};
	xhttp.open("GET", location, true);
	xhttp.setRequestHeader("X-RapidAPI-Key", "afffc09374mshd6fd056ddf7a02cp1404a7jsnbda4416806e8");
	xhttp.send();

}






function displayResults(obj, values) {

	var list = $($(".resultsTable")[0]);

	/*Inefficient but fine for now*/
	list.empty();

	//obj = obj["results"];

	for (var i = 0; i < obj.length; i++) {

		/*Create an entry into the table for each recipie*/
		makeRecipeRequest(obj[i], obj[i]["id"], values);

	}

	displayRecipes();

	autoScroll();

	$('#modal').modal('hide');
}



function createRow(obj, details, values) {
	var list = $($(".resultsTable")[0]);

	var row = $("<tr></tr>");
	var column1 = $("<td></td>");
	var column2 = $("<td></td>");

	var thumbnail = $("<img>");
	thumbnail.attr("src", obj["image"]);

	var title = $("<h2></h2>");
	title.html(obj["title"]);

	

	var sourceURL = details["sourceUrl"];
	var ingredients = details["extendedIngredients"];

	row.click(() => {
		location = sourceURL;
	});


	column1.addClass("imgColumn");
	thumbnail.addClass("thumbnail");
	title.addClass("result_title");
	column2.addClass("relative");
	

	column1.append(thumbnail);
	column2.append(title);

	var ingredientsList = $("<ul class='list'></ul>");

	for (var i = 0; i < ingredients.length; i++) {
		var span = $("<span class='label label-warning'>" + ingredients[i]['name'] + "</span>");
		var item = $("<li></li>");

		for (var j = 0; j < values.length; j++) {
			//remove whitespace
			var name = values[j].replace(/\s/g,'');

			if (ingredients[i]['name'].includes(name)) {
				span.removeClass("label-warning");
				span.addClass("label-success");
			}
		}
		
		item.append(span);
		ingredientsList.append(item);
	}

	column2.append(ingredientsList);

	row.append(column1);
	row.append(column2);
	list.append(row);

	console.log(details);
}


function elementAdd() {
	var textBox = document.getElementById("searchText");
}


function displayRecipes() {
	var section = document.getElementsByClassName("recipesSection")[0];
	section.style.display = "block";
}

function autoScroll() {
	var windowHeight = window.innerHeight;
	window.scrollTo(0,windowHeight);
}
