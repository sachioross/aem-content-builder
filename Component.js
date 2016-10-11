var request = require("request");

var Component = function(path) {
    this.path = path;

    /**
      This object is a required element of all sub-implementations.
      To set these values through inheritance, add primaryType and
      resourceType property overrides in the sub-implementation's
      prototype.
    */
    this.content = {
      "jcr:primaryType" : this.primaryType,
      "sling:resourceType" : this.resourceType
    };
};

Component.prototype = {
  model : "Component",
  data : '',
  html : '',
  primaryType : 'nt:unstructured',
  resourceType : '',
  path : '',

  parse : function($) {
    return this;
  },

  /**
      Simplified property setter to add a property that
      would be appended to the jcr:content node. To set
      a 'root' property (a property on the node itself, rather
      than a content property), then use 'setRootProperty')

      @return the instance of the object to be used
              in a chained / builder fashion
  */
  setContentProperty : function(prop, value) {
    this.content["jcr:content/" + prop] = value;
    return this;
  },

  /**
    Allows for the settings of properties on the root node.
    To set content-related properties (i.e. properties on 'jcr:content'),
    use 'setProperty'.

    @return the instance of this object to be used
            in a chained / builder function
  */
  setProperty : function(prop, value) {
    this.content[prop] = value;
    return this;
  },

  /**
    Sets any multi-value property appropriately for a sling post
    request. In particular, ensures that a multi-value property
    has each value stringified if not already.
  */
  setMultiValueProp : function(prop, stuff) {
    var things = [];

    for (i in stuff) {
      if (typeof stuff[i] !== "string") {
        things.push(JSON.stringify(stuff[i]));
      } else {
        things.push(stuff[i]);
      }
    }

    this.setProperty(prop, things);

    return this;
  },


  /**
    Allows for the addition of a component to this component.
    Will iterate through all items in the content node and add
    them to this component
  */
  addComponent : function(name, cmpt) {
    for (i in cmpt.content) {
      this.setProperty(name + "/" + i, cmpt.content[i]);
    }
    return this;
  },

  post : function(req, url) {
    req.post(url, function(err, res, body) {
        if (err) {
          console.log("Error while posting to " + url);
          console.log(err);
        } else {
          console.log("Posted to " + url + " with a status of " + res.statusCode);
        }
    }).form(this.content);
  }
};

Component.getRoots = function() {
  return {
    aem : "/",
    legacy : "/"
  }
}

module.exports = Component;
