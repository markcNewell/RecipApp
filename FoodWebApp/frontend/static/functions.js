
document.onload = function() {
	var btn = document.getElementsByClassName("btn")[0];
	btn.addEventListener("click",searchBtn);


	document.getElementsByClassName('contactForm')[0].submit(function () {
		 elementAdd();
		 return false;
	};
			
function searchBtn(){
	mockAPIRequest();
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

	displayResults(object);
}


function APIRequest(location) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	displayResults(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", location, true);
  xhttp.send();
}


function displayResults(obj) {

	var length = Object.keys(obj["recipies"]).length;
	var list = document.getElementsByClassName("resultsTable")[0];

	/*Inefficient but fine for now*/
	list.innerHTML = "";

	for (var i = 0; i < length; i++) {
		/*Create an entry into the table for each recipie*/
		createResult(obj["recipies"][i]);
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