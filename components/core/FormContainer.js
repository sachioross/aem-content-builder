const AbstractComponent = require('../AbstractComponent');

/**
 * The Form Buttom Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/form/container/v2/container
 */

 class FormContainer extends AbstractComponent {

 	constructor() {
 		super();
 		this.props["sling:resourceType"] = "core/wcm/components/form/container/v2/container"
 	}

 	setActionType(type) {
 		this.props["actionType"] = type;
 	}

 	setWorkflowModel(model) {
 		this.props["workflowModel"] = model;
 	}

 	setRedirect(redirect) {
 		this.props["redirect"] = redirect;
 	}

 	setID(id) {
 		this.props["id"] = id;
 	}
 }

 module.exports = FormContainer;
