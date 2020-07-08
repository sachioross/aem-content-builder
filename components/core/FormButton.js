const AbstractComponent = require('../AbstractComponent');

/**
 * The Form Buttom Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/form/button/v2/button
 */

 class FormButton extends AbstractComponent {

 	constructor() {
 		super();
 		this.props["sling:resourceType"] = "core/wcm/components/form/button/v2/button"
 	}

 	setTitle(title) {
 		this.props["jcr:title"] = title;
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

 module.exports = FormButton;