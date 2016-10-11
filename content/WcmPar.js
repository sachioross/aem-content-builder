var Component = require("../Component.js");

var WcmPar = function(path) {
  Component.call(this, path);
}

WcmPar.prototype = Object.create(Component.prototype, {

  model : {
    value : "WcmPar",
    enumerable : true
  },

  resourceType : {
    value: 'wcm/foundation/components/parsys',
    enumerable: true
  }
});

WcmPar.getRoots = function() {
  return {
    aem : "",
    legacy : ""
  }
};

module.exports = WcmPar;
