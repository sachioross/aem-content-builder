const AbstractComponent = require('../AbstractComponent');

/**
 * The Breadcrumb Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/breadcrumb/v2/breadcrumb
 */
class Breadcrumb extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/breadcrumb/v2/breadcrumb";
    }

    setStartLevel(level) {
        this.props["startLevel"] = level;
    }

    setShowHidden(showHidden) {
        this.props["showHidden"] = showHidden;
    }

    setHideCurrent(hideCurrent) { 
        this.props["hideCurrent"] = hideCurrent;
    }

    setDisableShadowing(disableShadowing) { 
        this.props["disableShadowing"] = disableShadowing;
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = Breadcrumb;