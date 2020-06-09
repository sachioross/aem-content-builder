const fetch = require('cross-fetch');
const FormData = require('form-data');

class AbstractComponent {

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

  /**
   * Allows for the posting of an AEM component to a target AEM system.
   * The {@code request} object should respect the standard FETCH API 
   * Request object, set to the POST method.
   * @param {req} The Fetch API Request object with URL;
   * @param {url} url 
   */
  post(req) {

    // Form requestID (datestamp + url?)
    // TODO: Create AEMRequest object set with defaults (auth, method, domain, port), but 
    // TODO: allow caller to set specific URL and FORM data
    console.log(`Attempting to post ${JSON.stringify(req)}`);

    fetch(req)
      .then(res => {
        console.log(res);
        if (res.ok) {
          console.log(`Posted to ${req.url} with a status of ${res.statusCode}`);
        }
        res.text();

      })
      .then(html => {
        console.log(html)
      })
      .catch(err => {
        console.log(`Error while attempting POST to ${req.url}`);
        console.log(err);
        console.log(req);
      })
  }
}

module.exports = AbstractComponent;
