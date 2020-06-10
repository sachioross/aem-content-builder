const Component = require('./AbstractComponent');

class AbstractPage extends Component {

    constructor() {
        super();
        this.props["jcr:primaryType"] = "cq:Page";
        this.props["jcr:content/jcr:primaryType"] = "cq:PageContent";
        this.props["jcr:content/jcr:mixinTypes"] = ["mix:versionable"];
    }

  /**
    Allows for the addition of a component to this component.
    Will iterate through all items in the content node and add
    them to this component
  */
  addComponent(cmpName, cmpt) {

    let cmptData = cmpt.getData();
    for (let i in cmptData) {
      this.setContent(cmpName + "/" + i, cmptData[i]);
    }
    return this;
  }
}

module.exports = AbstractPage;