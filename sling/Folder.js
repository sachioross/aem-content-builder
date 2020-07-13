const Resource = require('./AbstractResource');

class Folder extends Resource {
    constructor() {
        super();
        this.props["jcr:primaryType"] = "sling:OrderedFolder";
        this.setMultiValueProp("jcr:mixinTypes", ["rep:AccessControllable"]);
    }
}

module.exports = Folder;