const AbstractComponent = require('../AbstractComponent');

/**
 * The ExperienceFragment Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/experiencefragment/v1/experiencefragment
 */

 class ExperienceFragment extends AbstractComponent {

 	constructor() {
 		super();
 		this.props["sling:resourceType"] - "core/wcm/components/experiencefragment/v1/experiencefragment";
 	}

 	setFragmentVariationPath(variation_path) {
 		this.props["fragmentVariationPath"] = variation_path;
 	}

 	setID(id) {
 		this.props["id"] = id;
 	}
 }

 module.exports = ExperienceFragment;