// Functions to parse and deal with data

function getData() {
	d3.csv("./data/restaurant_scores.csv").then( function(data) {
		console.log("data is ready");
	});
}