const Sling = require('../sling');

class AbstractComponent extends Sling.Resource {

  constructor(props, content) {
    super(props, content);
  }
}

module.exports = AbstractComponent;
