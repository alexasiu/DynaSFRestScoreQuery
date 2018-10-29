
// Gui initial values
var GUIText = function() {
  this.radius_A = 1;//getRadiusASize();
  this.radius_B = 1;//getRadiusBSize();
  this.inspection_score = 0;
  this.risk_cat = 'All';
  this.clear_all = clearAll();
};

/*
 * Add GUI and listeners for sliders when page has loaded
 */
window.onload = function() {
  var text = new GUIText();
  var gui = new dat.GUI();
  var radius_A = gui.add(text, 'radius_A', 0, 4.5).name("Radius A (mi.)");
  var radius_B = gui.add(text, 'radius_B', 0, 4.5).name("Radius B (mi.)");
  var inspection_score = gui.add(text, 'inspection_score', 0, 100).name("Above Inspection Score");
  var risk_cat = gui.add(text, 'risk_cat', ['All', 'Low Risk', 'Moderate Risk', 'High Risk' ] ).name("Risk Category");
  var clear_button = gui.add(text, 'clear_all').name("Clear");

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
      setInspectionScoreThreshold(value);
    }
  );

  risk_cat.onChange(
    function(value) {
      filterRiskCategory(value);
    }
  );

};
