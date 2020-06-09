const AbstractComponent = require('../AbstractComponent');

/**
 * The Accordian Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/accordion/v1/accordion
 */
class Accordian extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core-components-examples/components/accordion/v1/accordian";
    }

    setExpandedItems(items) {
        this.props["expandedItems"] = items;
    }

    setSingleExpansion(boolean) {
        this.props["singleExpansion"] = boolean;
    }

    setHeadingElement(heading) { 
        this.props["headingElement"] = heading;
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = Title;