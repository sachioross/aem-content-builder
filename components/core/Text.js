const AbstractComponent = require('../AbstractComponent');

/**
 * The Text Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/text/v2/text
 */
class Text extends AbstractComponent {

    constructor(text) {
        super();
        if (text) {
            this.setText(title);
        }
        this.props["sling:resourceType"] = "core/wcm/components/text/v2/text";
    }

    setText(text) {
        this.props["text"] = text;
    }

    setIsRich(isRich) {
        this.props["textIsRich"] = isRich ? "true" : "false";
    }
}

module.exports = Text;