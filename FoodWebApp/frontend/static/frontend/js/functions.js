var GLOBAL_TAGS = []
var GLOBAL_OFFSET = 0
var GLOBAL_PAGESIZE = 2
var GLOBAL_OBJECTS = ""

window.onresize = function() {
	checkWindowSize();
}

window.onload = function() {

	checkWindowSize();

	$("#searchbtn").click(() => {

		GLOBAL_OFFSET = 0;

		$('#modal').modal('show');
		$($('.resultsTable')[0]).empty();

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

		GLOBAL_OFFSET = 0;

		var filterInputs = $("#filters").find("input:checked");
		var filters = ""

		filterInputs.each(function(index, element) {
			var name = $(element).attr("name");
			var value = $(element).attr("checked");


			if (name == "ranking") {
				value = "2";
			}

			filters += name + "=" + value + "&";
			
			
		});

		makeAPIRequest(GLOBAL_TAGS, filters);

	});


	$("#loadmorebtn").click(() => {
		GLOBAL_OFFSET += GLOBAL_PAGESIZE;
		displayResults(JSON.parse(GLOBAL_OBJECTS), GLOBAL_TAGS);
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
		$($(".ad")[0]).css("display", "none");
	}
	
}






function makeAPIRequest(ingredientsList, filters=null) {
	var location = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ingredients=";
	
	location += ingredientsList[0].replace(/\s/g,''); //add the first element
	for (var i = 1; i < ingredientsList.length; i++) {
		var ingredient = ingredientsList[i].replace(/\s/g,'');
		location += "%2C+" + ingredient;
	}

	if (filters != null) {
		location += "&" + filters;
	}
	else {
		location += "&ranking=1"
	}


	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			GLOBAL_OBJECTS = this.responseText;
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

	$('#modal').modal('show');
	$($(".recipesSection")[0]).css("display","none");

	//obj = obj["results"];

	var newPage = (GLOBAL_OFFSET + GLOBAL_PAGESIZE);

	if (newPage < obj.length) {
		for (var i = GLOBAL_OFFSET; i < newPage; i++) {
			/*Create an entry into the table for each recipie*/
			makeRecipeRequest(obj[i], obj[i]["id"], values);

		}
	}

	displayRecipes();

	if (GLOBAL_OFFSET == 0) {
		autoScroll();
	}

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
    $('html, body').animate({
        scrollTop: $(document).height()
    }, 'slow');
    return false;
}
