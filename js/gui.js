
// Gui initial values
var GUIText = function() {
  this.radius_A = getRadiusASize();
  this.radius_B = getRadiusBSize();
  this.inspection_score = 100;
};

/*
 * Add GUI and listeners for sliders when page has loaded
 */
window.onload = function() {
  var text = new GUIText();
  var gui = new dat.GUI();
  var radius_A = gui.add(text, 'radius_A', 3, 300).name("Radius A");
  var radius_B = gui.add(text, 'radius_B', 3, 300).name("Radius B");
  var inspection_score = gui.add(text, 'inspection_score', 0, 100).name("Inspection Score");

  radius_A.onChange( 
    function(value) {
      setRadiusASize(value);
    }
  );

  radius_B.onChange( 
    function(value) {
      setRadiusBSize(value);
    }
  ); 

  inspection_score.onChange(
    function(value) {
      //Add filtering call
    }
  );

};
  

