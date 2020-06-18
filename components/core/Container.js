const AbstractComponent = require('../AbstractComponent');

/**
 * The Container Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/container/v1/container
 */
class Container extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/container/v1/container";
    }

    setLayout(layout) {
        this.props["layout"] = layout;
    }

    setBackgroundImageReference(backgroundImageReference) {
        this.props["backgroundImageReference"] = backgroundImageReference;
    }

    setBackgroundColor(backgroundColor) {
        this.props["backgroundColor"] = backgroundColor;
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = Container;