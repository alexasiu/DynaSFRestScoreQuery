/*
 * Functions relating to map setup and display
 */

// *** Variables *** //
var projection = null; //reference to projection function
	// This is the mapping between <longitude, latitude> position to <x, y> pixel position on the map
	// projection is a function and it has an inverse:
	// projection([lon, lat]) returns [x, y]
	// projection.invert([x, y]) returns [lon, lat]
var mapSvg = null; // reference to the map svg

var mapWidth = 750;
var mapHeight = 750;

var mapCenter = [-122.433701, 37.767683];

var mapScale = 225000;

// *** Functions *** //
function getMapSvg() {
	return mapSvg;
}

function getProjection() {
	return projection;
}

function makeMap() {

	// Set up projection that the map is using
	projection = d3.geoMercator()
	  .center(mapCenter) // San Francisco, roughly
	  .scale(mapScale)
	  .translate([mapWidth / 2, mapHeight / 2]);

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

function pixelLength(miles) {

	if  (projection == null) { 
		projection = getProjection(); 
	}

	// Calculates the window pixel length for a given map distance in miles
	let min_coords = projection.invert( [0, mapHeight] );  //[lon, lat]
	let max_coords = projection.invert( [mapWidth, 0] );

	let actual_map_bounds = [ min_coords, max_coords ]; //d3.geoBounds(projection); 

	var radians = d3.geoDistance( actual_map_bounds[0], actual_map_bounds[1] );
	var earth_radius = 3959;  // miles
	var arc_length = earth_radius * radians;  // s = r * theta

	var projected_map_bounds = [ 
				projection(actual_map_bounds[0]), 
				projection(actual_map_bounds[1]) 
			];

	var projected_map_width = projected_map_bounds[1][0] - projected_map_bounds[0][0];
	var projected_map_height = projected_map_bounds[0][1] - projected_map_bounds[1][1];
	var projected_map_hypotenuse = Math.sqrt(
	(Math.pow(projected_map_width, 2)) + (Math.pow(projected_map_height, 2))
	);

	var pixels_per_mile = projected_map_hypotenuse / arc_length;
	var pixel_distance = pixels_per_mile * miles;

	return pixel_distance;
}



