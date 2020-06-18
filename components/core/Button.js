const AbstractComponent = require('../AbstractComponent');

/**
 * The Button Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/button/v1/button
 */
class Button extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/button/v1/button";
    }

    setTitle(title) {
        this.props["jcr:title"] = title;
    }

    setLink(link) {
        this.props["link"] = link;
    }

    setIcon(icon) {
        this.props["icon"] = icon;
    }

    setAccessibilityLabel(accessibilityLabel) {
        this.props["accessibilityLabel"] = accessibilityLabel;
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = Button;