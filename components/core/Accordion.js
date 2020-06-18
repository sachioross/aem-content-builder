const AbstractComponent = require('../AbstractComponent');

/**
 * The Accordion Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/accordion/v1/accordion
 */
class Accordion extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/accordion/v1/accordion";
    }

    setExpandedItems(items) {
        this.props["expandedItems"] = items;
    }

    setSingleExpansion(single) {
        this.props["singleExpansion"] = single;
    }

    setHeadingElement(heading) { 
        this.props["headingElement"] = heading;
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = Accordion;