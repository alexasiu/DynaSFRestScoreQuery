// Functions to plot data


// Plots all business coordinates as circles
function plotAllCoordsData() {

	// This is the mapping between <longitude, latitude> position to <x, y> pixel position on the map
	// projection is a function and it has an inverse:
	// projection([lon, lat]) returns [x, y]
	// projection.invert([x, y]) returns [lon, lat]
	let coordsData = getCoordsData().then( 
		function(data) {
			// console.log(data);
			data.forEach( 
				function(businessCoord) {
					let proj = getProjection();
					let svg = getMapSvg();
					// var test = [37.78659, -122.429815]
					let projectedLocation = proj( [ businessCoord[0], businessCoord[1] ] );
					let circle = svg.append('circle')
					  .attr('cx', projectedLocation[0])
					  .attr('cy', projectedLocation[1])
					  .style("fill", "blue")
					  .attr('r', 3);
				}
			); //foreach
		} //function(data)
	);//then

}