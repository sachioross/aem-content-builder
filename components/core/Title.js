const AbstractComponent = require('../AbstractComponent');

/**
 * The Title Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/title/v2/title
 */
class Title extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/title/v2/title";
    }

    setTitle(title) {
        this.props["jcr:title"] = title;
    }

    setHeaderType(type) {
        this.props["type"] = type;
    }

    setLink(link) { 
        this.props["linkURL"] = link;
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = Title;