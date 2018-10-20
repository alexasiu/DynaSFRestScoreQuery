// Functions to parse and deal with data

// Returns promise with entire dataset
function getAllData() {

	let data = d3.csv("data/restaurant_scores.csv", function(d) {
		// Format data properly into strings and numbers where apropriate
		return {
			business_id: +d.business_id,
			business_name: d.business_name,
			business_address: d.business_address,
			business_postal_code: +d.business_postal_code,
			business_latitude: +d.business_latitude,
			business_longitude: +d.business_longitude,
			business_location: d.business_location,
			business_phone_number: +d.business_phone_number,
			inspection_id: d.inspection_id,
			inspection_date: d.inspection_date,
			inspection_score: +d.inspection_score,
			violation_id: d.violation_id,
			violation_description: d.violation_description,
			risk_category: d.risk_category
		};
	});

	// console.log(data);
	return data;

}

// Returns promise with only latitude and longitude data
function getCoordsData() {

	let allData = getAllData();

	// console.log(allData);

	//this promise returns an array with lattitude and longitude
	let coordsData = allData.then(
		function(value) {
	   return Promise.all(value.map(function(results){
	   return [results.business_latitude, results.business_longitude]; 
	    }))});

	// console.log(coordsData);

	return coordsData;
}

// Returns promise with only business inspection score
function getInspectionScoreData() {
	let allData = getAllData();

	//this promise returns an array with lattitude and longitude
	let scoreData = allData.then(function(value) {
	   return Promise.all(value.map(function(results){
	   return [results.inspection_score]; 
	    }))});

	console.log(scoreData);

	return scoreData;
}









