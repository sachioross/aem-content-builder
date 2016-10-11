var Text = require('./Text.js');
var WcmPar = require('./WcmPar.js');
var Par = require('./Par.js');

module.exports = {
  get : function(def) {
    switch (def) {
      case "wcmpar" :
        return WcmPar;
        break;
      case "par" :
        return Par;
        break;
      case "text" :
        return Text;
        break;
      default :
        return Par;
        break;
    }
  }
}
