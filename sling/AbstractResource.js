const fetch = require('cross-fetch');
const FormData = require('form-data');

class AbstractResource {

  constructor(props, content) {
    this.props = {
      "jcr:primaryType": "nt:unstructured"
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
  addChild(cmpName, cmpt) {

    let cmptData = cmpt.getData();
    for (let i in cmptData) {
      this.setProperty(cmpName + "/" + i, cmptData[i]);
    }
    return this;
  }

  getFormData() {
    let fd = new FormData();
    for (let i in this.props) {
      fd.append(i, this.props[i]);
    }
    for (let i in this.content) {
      fd.append(i, this.content[i]);
    }
    return fd;
  }
}

module.exports = AbstractResource;
