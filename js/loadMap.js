// Functions relating to map setup and display
var projection = null;
var mapSvg = null;

function getMapSvg() {
	return mapSvg;
}

function getProjection() {
	return projection;
}

function makeMap() {

	let mapWidth = 750;
	let mapHeight = 750;

	// Set up projection that the map is using
	projection = d3.geoMercator()
	  .center([-122.433701, 37.767683]) // San Francisco, roughly
	  .scale(225000)
	  .translate([mapWidth / 2, mapHeight / 2])

	 // Create the svg region
	mapSvg = d3.select( "#map_area" )
	    .append( "svg" )
	    .attr( "width", mapWidth )
	    .attr( "height", mapHeight );

	// Add SVG of map at correct size, assuming map is saved 
	mapSvg.append('image')
	  .attr('width', mapWidth)
	  .attr('height', mapHeight)
	  .attr('xlink:href', 'data/sf-map.svg');


	// let coordsData = getCoordsData().then( 
	// 	function(data) {
	// 		// console.log(data);
	// 		data.forEach( 
	// 			function(businessCoord) {
	// 				// var test = [37.78659, -122.429815]
	// 				let projectedLocation = projection( [ businessCoord[0], businessCoord[1] ] );
	// 				let circle = mapSvg.append('circle')
	// 				  .attr('cx', projectedLocation[0])
	// 				  .attr('cy', projectedLocation[1])
	// 				  .style("fill", "blue")
	// 				  .attr('r', 3);
	// 			}
	// 		); //foreach
	// 	} //function(data)
	// );//then


}