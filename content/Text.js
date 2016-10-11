var Component = require("../Component.js");

var Text = function(path, text) {
  Component.call(this, path);
  this.content['textIsRich'] = true;
  this.content['text'] = text;
}

Text.prototype = Object.create(Component.prototype, {

  model : {
    value : "Text",
    enumerable : true
  },

  resourceType : {
    value: 'wcm/foundation/components/text',
    enumerable: true
  },

  parse : {
    value : function($) {
      return this;
    }
  },

  setText : {
    value : function(text) {
      this.setProperty("text", text);
      return this;
    }
  }
});

Text.getRoots = function() {
  return {
    aem : "",
    legacy : ""
  }
};

module.exports = Text;
