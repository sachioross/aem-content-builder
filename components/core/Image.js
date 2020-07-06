const AbstractComponent = require('../AbstractComponent');

/**
 * The Image Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/image/v2/image
 */

 class Image extends AbstractComponent {

 	constructor() {
 		super();
 		this.props["sling:resourceType"] = "core/wmc/components/image/v2/image"
 	}

 	setFileReference(reference) {
 		this.props["fileReference"] = reference;
 	}

 	setIsDecorative(decorative) {
 		this.props["isDecorative"] = decorative;
 	}

 	setAlt(alt) {
 		this.props["alt"] = alt;
 	}

 	setLinkURL(url) {
 		this.props["linkURL"] = url;
 	}

 	setTitle(title) {
 		this.props["jcr:title"] = title;
 	}

 	setDisplayPopupTitle(popup) {
 		this.props["displayPopupTitle"] = popup;
 	}

 	setID(id) {
 		this.props["id"] = id;
 	}
  
 }

module.exports = Image;
