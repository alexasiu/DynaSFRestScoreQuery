

function addABclickListeners() {

	mapSvg = getMapSvg();

	mapSvg.on("click", function() {
	    var coords = d3.mouse(this);
	    console.log(coords);
	    plotALoc( coords[0], coords[1] );
	})

}