const Sling = require('../sling');

class AbstractComponent extends Sling.Resource {

  constructor(props, content) {
    super(props, content);
  }

  setId(id) {
    this.props["id"] = id;
  }
}

module.exports = AbstractComponent;
