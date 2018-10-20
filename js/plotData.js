/*
 * Functions to plot data and A and B locations
 *
 */

var ABlocations = [];  // store user specified location svgs
var ABradius = [];     // store radius svg

var radiusValues = [30, 60];

/*
 * Plot user specified location
 */
function plotLocation(x, y) {

	// Assume radius A first
	var currRadius = radiusValues[0];

	// If user has already specified two locations
	if (ABlocations.length == 2) {
		// remove svg from canvas
		ABlocations[0].remove();
		ABradius[0].remove();
		// remove  stored value
		ABlocations.shift();
		ABradius.shift();

		// shift to replot B, so use B radius
		currRadius = radiusValues[1];
	} else if (ABlocations.length == 1) {
		// use B radius
		currRadius = radiusValues[1];
	}

	let svg = getMapSvg();
	let circle = svg.append('circle')
				  .attr('cx', x)
				  .attr('cy', y)
				  .style("fill", "blue")
				  .attr('r', 3);
	let radius = svg.append('circle')
				  .attr('cx', x)
				  .attr('cy', y)
				  .style("fill", "blue")
				  .style("opacity", 0.3)
				  .attr('r', currRadius);
	ABlocations.push(circle);
	ABradius.push(radius);

}

/* 
 * Plots all business coordinates as circles
 */
function plotAllCoordsData() {
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