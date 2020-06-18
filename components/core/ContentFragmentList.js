const AbstractComponent = require('../AbstractComponent');

/**
 * The Content Fragment List Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/contentfragmentlist/v1/contentfragmentlist
 */
class ContentFragmentList extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/contentfragmentlist/v1/contentfragmentlist";
    }

    setModelPath(modelPath) {
        this.props["modelPath"] = modelPath;
    }

    setParentPath(parentPath) {
        this.props["parentPath"] = parentPath;
    }

    setTagNames(tagNames) {
        this.setMultiValueProp("tagNames",tagNames);
    }

    setOrderBy(orderBy) {
        this.props["orderBy"] = orderBy;
    }

    setSortOrder(sortOrder) {
        this.props["sortOrder"] = sortOrder;
    }

    setMaxItems(maxItems) {
        this.props["maxItems"] = maxItems;
    }

    setElementNames(elementNames) {
        this.setMultiValueProp("elementNames",elementNames);
    }

    setID(id) {
        this.props["id"] = id;
    }
}

module.exports = ContentFragmentList;