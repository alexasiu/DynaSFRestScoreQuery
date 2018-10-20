/*
 * Functions relating to map setup and display
 */
var projection = null; //reference to projection function
	// This is the mapping between <longitude, latitude> position to <x, y> pixel position on the map
	// projection is a function and it has an inverse:
	// projection([lon, lat]) returns [x, y]
	// projection.invert([x, y]) returns [lon, lat]
var mapSvg = null; // reference to the map svg

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

}