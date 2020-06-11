const AbstractComponent = require('../AbstractComponent');

/**
 * The Carousel Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/carousel/v1/carousel
 */
class Carousel extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/carousel/v1/carousel";
    }

    setAutoplay(autoplay) {
        this.props["autoplay"] = autoplay;
    }

    setDelay(delay) {
        this.props["delay"] = delay;
    }

    setAutopauseDisabled(autopauseDisabled) {
        this.props["autopauseDisabled"] = autopauseDisabled;
    }

    setAccessibilityLabel(accessibilityLabel) {
        this.props["accessibilityLabel"] = accessibilityLabel;
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = Carousel;