const AbstractComponent = require('../AbstractComponent');

const ACTION_PROP_REGEX = /actions\/item([0-9]{1,})\/(.*)/;

/**
 * The Teaser Core Component. In addition to the Component methods, this component provides several 
 * convience methods to set known properties. 
 * 
 * Based on the documentation found at:
 * https://github.com/adobe/aem-core-wcm-components/tree/master/content/src/content/jcr_root/apps/core/wcm/components/teaser/v1/teaser
 */
class Teaser extends AbstractComponent {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/teaser/v1/teaser";
    }

    setTitle(title) {
        this.props["jcr:title"] = title;
    }

    setPreTitle(preTitle) {
        this.props["pretitle"] = preTitle;
    }

    setTitleType(type) {
        this.props["type"] = type;
    }

    setTitleFromPage(fromPage) {
        this.props["titleFromPage"] = fromPage ? "true" : "false";
    }

    setDescription(desc) {
        this.props["jcr:description"] = desc;
    }

    setDescriptionFromPage(fromPage) {
        this.props["descriptionFromPage"] = fromPage ? "true" : "false";
    }

    setLinkURL(linkURL) { 
        this.props["linkURL"] = linkURL;
    }

    setFileReference(fileReference) {
        this.props["fileReference"] = fileReference;
    }

    setActionsEnabled(enabled) {
        this.props["actionsEnabled"] = enabled ? "true" : "false";
    }

    addAction(action) {
        let currentActions = {};
        
        Object.keys(this.props)
            .filter(propKey =>  propKey.startsWith("actions"))
            .map(propKey => {
                let matches = ACTION_PROP_REGEX.exec(propKey)
                if (matches) {
                    let item = `item${matches[1]}`;
                    currentActions[item] = currentActions[item] || {};
                    currentActions[item][matches[2]] = this.props[propKey];
                } else {
                    console.debug(`doesn't match: ${propKey}`);
                }
            })
        
        let newActions = Object.keys(currentActions).map(item => {
            return currentActions[item];
        })
        newActions.push({
            "jcr:primaryType": action["jcr:primaryType"] ? action["jcr:primaryType"] : "nt:unstructured",
            link: action.link, 
            text: action.text
        })
        this.setActions(newActions);
    }

    createAction(link, text) {
        return {
            "jcr:primaryType": "nt:unstructured",
            link: link, 
            text: text
        }
    }

    setActions(actions) {

        // Erase all existing actions
        let existingActions = Object.keys(this.props).filter(key => key.startsWith("actions")); 
        existingActions.forEach(act => {
            delete this.props[act];
        })

        let actionIndex = 0;
        actions.forEach(action => {
            this.props[`actions/item${actionIndex}/jcr:primaryType`] = "nt:unstructured";
            this.props[`actions/item${actionIndex}/link`] = action.link ? action.link : "";
            this.props[`actions/item${actionIndex}/text`] = action.text ? action.text : "";
            actionIndex++;
        })
    }
}

module.exports = Teaser;