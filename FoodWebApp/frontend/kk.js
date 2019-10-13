var app = new dwv.App();
// initialise with the id of the container div
app.init({
    "containerDivId": "dwv"
});
// load dicom data
app.loadURLs(["https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm"]);
app.drawController = new dwv.drawController("dwv");

app.addEventListener("load-end", function () {
    var jsonUrl = "https://raw.githubusercontent.com/ivmartel/dwv/develop/tests/state/v0.3/state-ruler.json";
    $.getJSON( jsonUrl, function( data ) {
        console.log(data);
        var stateObj = new dwv.State();
        stateObj.apply( app, stateObj.fromJSON(JSON.stringify(data)) );
    });
});
