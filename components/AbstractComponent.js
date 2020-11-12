const Sling = require('../sling');

class AbstractComponent extends Sling.Resource {

  constructor(props, content) {
    super(props, content);
  }

  setId(id) {
    this.props["id"] = id;
  }

  setResponsiveSetting(setting) {

    const key = setting.key ? setting.key : "default";

    this.props["cq:responsive/jcr:primaryType"] = "nt:unstructured";
    this.props[`cq:responsive/${key}/jcr:primaryType`] = "nt:unstructured";
    this.props[`cq:responsive/${key}/offset`] = (setting.offset ? setting.offset : 0).toString();
    this.props[`cq:responsive/${key}/width`] = (setting.width ? setting.width : 12).toString();
  }
}

module.exports = AbstractComponent;
