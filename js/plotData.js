/*
 * Functions to plot data and A and B locations
 *
 */

// ** Constants **
const locPointSize = 3;
const locRadiusOpacity = 0.3;


// ** Variables **
var allDataSvg = []; // store all the svg of locations

var locationA = {    // store user defined location A
	pointSvg: null,
	radiusSvg: null,
	pos: null,
	radiusSize: 50,
	color: "green",
	id: "locationA"
}

var locationB = {   // store user defined location A
	pointSvg: null,
	radiusSvg: null,
	pos: null,
	radiusSize: 100,
	color: "blue",
	id: "locationB"
}

/*
 * Plot only data within radius A and radius B
 */
function refreshData() {

	// only refresh data if user has specified both A and B
	if ( locationA.pointSvg == null || locationB.pointSvg == null ) return;

	let svg = getMapSvg();

	// go through all the points
	for( i=0; i<allDataSvg.length; i++ ) {

		let currPoint = allDataSvg[i];
		currPoint.svg.style("fill", "gray"); //reset their color

		// Check if the curr loc is inside radius A and radius B
		if ( checkInsideCircle( currPoint.pos, locationA ) 
		  && checkInsideCircle( currPoint.pos, locationB ) ) {
		  	// change the color to red if it lies in the intersection
		  	currPoint.svg.style("fill", "red");
		}
	
	}

}

/* 
 * Function to check if pos lies inside circle object
 */
function checkInsideCircle(newLoc, locObj) {
	d = Math.sqrt( Math.pow( newLoc[0] - locObj.pos[0], 2 ) 
		         + Math.pow( newLoc[1] - locObj.pos[1], 2 ) );

	return ( Math.pow(d,2) <= Math.pow( locObj.radiusSize,2 ) );
}

/*
 * Plot user specified location
 */
function plotLocation(x, y) {

	// plot only the first time
	if (locationA.pointSvg != null && locationB.pointSvg != null ) return;

	let svg = getMapSvg();
	if (locationA.pointSvg == null) {
		locationA.pos = [x,y];
		plotNewLoc(svg, locationA);
	} else if (locationB.pointSvg == null) {
		locationB.pos = [x,y];
		plotNewLoc(svg, locationB);
	}

    refreshData();

}

// Plots both point and radius for given location
function plotNewLoc(svg, locObj) {
	if (locObj.pos == null) return;
	locObj.pointSvg = plotLocPoint(svg, locObj);
	locObj.radiusSvg = plotLocRadius(svg, locObj);
	return locObj;
}

// Plots location point
function plotLocPoint(svg, locObj) {
	let locSvg = svg.append('circle')
			  .attr('cx', locObj.pos[0])
			  .attr('cy', locObj.pos[1])
			  .style("fill", locObj.color)
			  .attr('r', locPointSize);
	return locSvg;
}

// Plots point radius
function plotLocRadius(svg, locObj, idname) {
	let locRadiusSvg = svg.append('circle')
			  .attr('cx', locObj.pos[0])
			  .attr('cy', locObj.pos[1])
			  .attr("id", locObj.id)
			  .style("fill", locObj.color)
			  .style("opacity", locRadiusOpacity)
			  .attr('r', locObj.radiusSize);
	return locRadiusSvg;
}

function getRadiusASize() {
	return locationA.radiusSize;
}

function getRadiusBSize() {
	return locationB.radiusSize
}

function setRadiusASize(newRadius) {
	locationA.radiusSize = newRadius;
	d3.select("#locationA").remove();
	// replot A
	svg = getMapSvg();
	plotLocRadius(svg, locationA);
	refreshData();
}

function setRadiusBSize(newRadius) {
	locationB.radiusSize = newRadius;
	d3.select("#locationB").remove();
	// replot B
	svg = getMapSvg();
	plotLocRadius(svg, locationB);
	refreshData();
}

/* 
 * Plots all business coordinates as red circles
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
					let circle = svg.append('circle')
					  .attr('cx', projectedLocation[0])
					  .attr('cy', projectedLocation[1])
					  .style("fill", "gray")
					  .attr('r', 3);
					let dataObj = {
						svg: circle,
						pos: [projectedLocation[0], projectedLocation[1]],
						color: "gray"
					}
					allDataSvg.push(dataObj);
				}
			); //foreach
		} //function(data)
	);//then
}