var request = require("request");

class Component {

  constructor(props, content) {
    this.props = {
      "jcr:primaryType": "cq:Component"
    }
    this.content = {}
    if (props) {
      Object.assign(this.props, props);
    }
    if (content) {
      Object.assign(this.content, content);
    }
  }

  setProperty(key, val) {
    this.props[key] = val;
    return this;
  }

  setContent(key, val) {
    this.content[`jcr:content/${key}`] = val;
    return this;
  }

  getProperties() {
    return this.props;
  }

  getContents() {
    return this.content;
  }

  getProperty(key) {
    return this.props[key];
  }

  getContent(key) {
    return this.content[`jcr:content/${key}`];
  }

  getData() {
    let combined = {};
    Object.assign(combined, this.props);
    Object.assign(combined, this.content);
    return combined;
  }

  setResourceType(type) {
    this.setProperty("sling:resourceType", type);
  }

  setResourceSuperType(type) {
    this.setProperty("sling:resourceSuperType", type);
  }

  getResourceType() {
    return this.props["sling:resourceType"];
  }

  getPrimaryType() {
    return this.props["jcr:primaryType"];
  }

  parse($) {
    return "Not Implemenated";
  }

  /**
    Sets any multi-value property appropriately for a sling post
    request. In particular, ensures that a multi-value property
    has each value stringified if not already.
  */
  setMultiValueProp(prop, stuff) {
    var things = [];

    for (let i in stuff) {
      if (typeof stuff[i] !== "string") {
        things.push(JSON.stringify(stuff[i]));
      } else {
        things.push(stuff[i]);
      }
    }

    this.setProperty(prop, things);

    return this;
  }
  
  /**
    Allows for the addition of a component to this component.
    Will iterate through all items in the content node and add
    them to this component
  */
  addComponent(cmpName, cmpt) {

    let cmptData = cmpt.getData();
    for (let i in cmptData) {
      this.setProperty(cmpName + "/" + i, cmptData[i]);
    }
    return this;
  }
}

var OldComponent = function(path) {
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

OldComponent.prototype = {
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
