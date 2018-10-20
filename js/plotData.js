// Functions to plot data

function plotALoc(x, y) {
	let proj = getProjection();
	let svg = getMapSvg();
	let circle = svg.append('circle')
	  .attr('cx', x)
	  .attr('cy', y)
	  .style("fill", "blue")
	  .attr('r', 3);
}

function plotBLoc() {
	
}

// Plots all business coordinates as circles
function plotAllCoordsData() {

	// This is the mapping between <longitude, latitude> position to <x, y> pixel position on the map
	// projection is a function and it has an inverse:
	// projection([lon, lat]) returns [x, y]
	// projection.invert([x, y]) returns [lon, lat]
	let coordsData = getCoordsData().then( 
		function(data) {
			data.forEach( 
				function(businessCoord) {
					let proj = getProjection();
					let svg = getMapSvg();
					// Data is [latitute, longitude] but 
					// projection takes [longitude, latitute] thus index 1 and 0 
					let projectedLocation = proj( [ businessCoord[1], businessCoord[0] ] );
					// console.log(projectedLocation);
					let circle = svg.append('circle')
					  .attr('cx', projectedLocation[0])
					  .attr('cy', projectedLocation[1])
					  .style("fill", "red")
					  .attr('r', 3);
				}
			); //foreach
		} //function(data)
	);//then

}