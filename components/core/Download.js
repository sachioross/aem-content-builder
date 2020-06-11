const AbstractComponent = require('../AbstractComponent');

/**
 * The Download Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/download/v1/download
 */
class Download extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/download/v1/download";
    }

    setFileReference(fileReference) {
        this.props["fileReference"] = fileReference;
    }

    setInline(inline) {
        this.props["inline"] = inline;
    }

    setTitle(title) {
        this.props["jcr:title"] = title;
    }

    setTitleFromAsset(titleFromAsset) {
        this.props["titleFromAsset"] = titleFromAsset;
    }

    setDescription(description) {
        this.props["jcr:description"] = description;
    }

    setDescriptionFromAsset(descriptionFromAsset) {
        this.props["descriptionFromAsset"] = descriptionFromAsset;
    }

    setActionText(actionText) {
        this.props["actionText"] = actionText;
    }
}

module.exports = Download;