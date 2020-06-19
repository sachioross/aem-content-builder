const AbstractComponent = require('../AbstractComponent');

/**
 * The Form Hidden Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/form/hidden/v2/hidden
 */

 class FormHidden extends AbstractComponent {

 	constructor() {
 		super();
 		this.props["sling:resourceType"] = "core/wmc/components/form/hidden/v2/hidden"
 	}

 	setName(name) {
 		this.props["name"] = name;
 	}

 	setValue(value) {
 		this.props["value"] = value;
 	}

 	setID(id) {
 		this.props["id"] = id;
 	}
 }

 module.exports = FormHidden;