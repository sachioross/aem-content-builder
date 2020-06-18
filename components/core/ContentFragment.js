const AbstractComponent = require('../AbstractComponent');

/**
 * The Content Fragment Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/contentfragment/v1/contentfragment
 */
class ContentFragment extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/contentfragment/v1/contentfragment";
    }

    setFragmentPath(fragmentPath) {
        this.props["fragmentPath"] = fragmentPath;
    }

    setVariationName(variationName) {
        this.props["variationName"] = variationName;
    }

    setElementNames(elementNames) {
        this.setMultiValueProp("elementNames", elementNames);
    }

    setParagraphScope(paragraphScope) {
        this.props["paragraphScope"] = paragraphScope;
    }

    setParagraphRange(paragraphRange) {
        this.props["paragraphRange"] = paragraphRange;
    }

    setParagraphHeadings(paragraphHeadings) {
        this.setMultiValueProp("paragraphHeadings",paragraphHeadings);
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = ContentFragment;