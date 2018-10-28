/*
 * Event handler functions
 */

function locationClickListener() {
	mapSvg = getMapSvg();

	mapSvg.on("click", function() {
	    var coords = d3.mouse(this);
	    plotLocation( coords[0], coords[1] );
	})

}
