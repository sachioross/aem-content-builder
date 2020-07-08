const AbstractComponent = require('../AbstractComponent');

/**
 * The Language Navigation Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/languagenavigation/v1/languagenavigation
 */

 class LanguageNavigation extends AbstractComponent {

 	constructor() {
 		super();
 		this.props["sling:resourceType"] = "core/wcm/components/languagenavigation/v1/languagenavigation"
 	}

 	setNavigationRoot(navRoot) {
 		this.props["navigationRoot"] = navRoot;
 	}

 	setStructureDepth(depth) {
 		this.props["structureDepth"] = depth;
 	}

 	setID(id) {
 		this.props["id"] = id;
 	}
}

module.exports = LanguageNavigation;
