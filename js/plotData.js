/*
 * Functions to plot data and A and B locations
 */

// ** Constants **
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

var locationAExists = false;
var locationBExists = false;

var inspectionScoreThreshold = 0;

var shouldFilterRisk = false;
var riskCategory = "All"

// *** Functions *** //

/*
 * Plot only data within radius A and radius B
 */
function refreshData() {

	// only refresh data if user has specified both A and B
	if ( locationAExists == false || locationBExists == false ) return;

	let svg = getMapSvg();
	var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

	// go through all the points
	svg.selectAll(".restaurant").remove();

	console.log("called");

	svg.selectAll(".restaurant")
		.data(allDataSvg)
		.enter()
		.append("circle")
		.attr("class", "restaurant")
		.style("fill",	function(d) {
			if (( checkInsideCircle( d.pos, locationA )
				&& checkInsideCircle( d.pos, locationB ) )
				&& d.inspectionScore >= inspectionScoreThreshold
			) {
				if (shouldFilterRisk) {
					if (d.riskCategory == riskCategory) {
						return "red";
					} else {
						return "grey";
					}
				} else {
					return "red";
				}
			} else {
				return "grey";
			}
		})
		.attr("r",	3)
		.attr("cx",	function(d)	{ return d.x; })
		.attr("cy",	function(d)	{	return d.y;	})
		.attr("inspectionScore", function(d) { return d.inspectionScore; })
		.on("mouseover", function(d) {
			console.log("zcxv");
      div.transition()
          .duration(20)
          .style("opacity", .9);
      div .html(
				"<p>Name: " + d.name
				+ "</p><p>Address: "+d.address
				+"</p><p>Risk: "+d.riskCategory
				+"</p><p>Inspection Score: "+d.inspectionScore+"</p>"
			)
	    .style("left", (d3.event.pageX) + "px")
	    .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

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
	if (locationAExists == false) {
		locationA.pos = [x,y];
		plotLocationA(svg, locationA);
	} else if (locationBExists == false) {
		locationB.pos = [x,y];
		plotLocationB(svg, locationB);
	}
    refreshData();

}

function plotLocationA(svg, locObj) {
	if (locObj.pos == null) return;

	function on_circle_drag(d) {
		d3.select(this)
		.attr("cx",	d3.event.x)
		.attr("cy",	d3.event.y);
		locationA.pos = [d3.event.x, d3.event.y];
		refreshData();
	}

	let locSvg = svg
				.append('circle')
			  .attr('cx', locationA.pos[0])
			  .attr('cy', locationA.pos[1])
				.attr("class", "locationA")
			  .style("fill", locationA.color)
				.style("opacity", locRadiusOpacity)
			  .attr('r', locationA.radiusSize)
				.call(d3.drag().on("drag", on_circle_drag));
	locationAExists = true
	return locSvg;
}

function plotLocationB(svg, locObj) {
	if (locObj.pos == null) return;

	function on_circle_drag(d) {
		d3.select(this)
		.attr("cx",	d3.event.x)
		.attr("cy",	d3.event.y);
		locationB.pos = [d3.event.x, d3.event.y];
		refreshData();
	}

	let locSvg = svg
				.append('circle')
			  .attr('cx', locationB.pos[0])
			  .attr('cy', locationB.pos[1])
				.attr("class", "locationB")
			  .style("fill", locationB.color)
				.style("opacity", locRadiusOpacity)
			  .attr('r', locationB.radiusSize)
				.call(d3.drag().on("drag", on_circle_drag));
	locationBExists = true
	refreshData();
	return locSvg;
}

// Plots both point and radius for given location
function plotNewLoc(svg, locObj) {
	if (locObj.pos == null) return;
	locObj.pointSvg = plotLocPoint(svg, locObj);
	// locObj.radiusSvg = plotLocRadius(svg, locObj);
	return locObj;
}

// Plots location point
function plotLocPoint(svg, locObj) {
	function on_circle_drag(d) {
		d3.select(this)
		.attr("cx",	d3.event.x)
		.attr("cy",	d3.event.y);
	}

	let locSvg = svg.append('circle')
			  .attr('cx', locObj.pos[0])
			  .attr('cy', locObj.pos[1])
				.attr("class", "locPoint")
			  .style("fill", locObj.color)
				.style("opacity", locRadiusOpacity)
			  .attr('r', locObj.radiusSize)
				.call(d3.drag().on("drag", on_circle_drag));
	return locSvg;
}

function removePoints() {
	return function() {
		locationA = {    // store user defined location A
			pointSvg: null,
			radiusSvg: null,
			pos: null,
			radiusSize: locationA.radiusSize,
			color: "green",
			id: "locationA"
		}

		locationB = {   // store user defined location A
			pointSvg: null,
			radiusSvg: null,
			pos: null,
			radiusSize: locationB.radiusSize,
			color: "blue",
			id: "locationB"
		}

		allDataSvg = [];
		d3.select("#locationA").remove();
		d3.select("#locationB").remove();
		plotAllData();
	};
}

function getRadiusASize() {
	return locationA.radiusSize;
}

function getRadiusBSize() {
	return locationB.radiusSize
}

function setRadiusASize(newRadius) {
	locationA.radiusSize = newRadius;
	let svg = getMapSvg();
	svg.select(".locationA").remove();
	plotLocationA(svg, locationA);
	refreshData();
}

function setRadiusBSize(newRadius) {
	locationB.radiusSize = newRadius;
	let svg = getMapSvg();
	svg.select(".locationB").remove();
	plotLocationB(svg, locationB);
	refreshData();
}

function setInspectionScoreThreshold(newScore) {
	inspectionScoreThreshold = Math.round(newScore);
	refreshData();
}

function filterRiskCategory(newRiskCategory) {
	riskCategory = newRiskCategory;
	shouldFilterRisk = (newRiskCategory != 'All');
	refreshData();
}

function clearAll() {
	return function() {
		let svg = getMapSvg();
		svg.selectAll("circle").remove();

		locationA = {    // store user defined location A
			pointSvg: null,
			radiusSvg: null,
			pos: null,
			radiusSize: 50,
			color: "green",
			id: "locationA"
		};

		locationB = {   // store user defined location A
			pointSvg: null,
			radiusSvg: null,
			pos: null,
			radiusSize: 100,
			color: "blue",
			id: "locationB"
		};

		locationAExists = false;
		locationBExists = false;
		plotAllData();

		console.log("clear");
	}
}

/*
 * Plots all business coordinates as red circles
 */
function plotAllData() {
	let coordsData = getPointsData().then(
		function(data) {
			counter = 0;
			data.forEach(
				function(businessCoord) {
					let proj = getProjection();
					let projectedLocation = proj( [ businessCoord[1], businessCoord[0] ] );
					let dataObj = {
						// svg: circle,
						pos: [projectedLocation[0], projectedLocation[1]],
						color: "gray",
						x: projectedLocation[0],
						y: projectedLocation[1],
						inspectionScore: businessCoord[2],
						riskCategory: businessCoord[3],
						name: businessCoord[4],
						address: businessCoord[5],
						location: businessCoord[6]
					};
					console.log(businessCoord);
					allDataSvg.push(dataObj);
					counter += 1;
					if (counter == data.length) {
						let svg = getMapSvg();
						svg.selectAll("circle")
							.data(allDataSvg)
							.enter()
							.append("circle")
							.attr("class", "restaurant")
							.style("fill", "grey")
							.attr("r",	3)
							.attr("cx",	function(d)	{ return d.x; })
							.attr("cy",	function(d)	{	return d.y;	})
							.attr("inspectionScore", function(d) { return d.inspectionScore; })
							.attr("riskCategory", function(d) { return d.riskCategory; })
							.attr("name", function(d) { return d.name; })
							.attr("address", function(d) { return d.address; })
							.attr("location", function(d) { return d.location; })
					}
				}
			); //foreach
 		} //function(data)
	);//then
}
