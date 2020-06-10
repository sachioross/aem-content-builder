const AbstractPage = require('../AbstractPage');

class Page extends AbstractPage {
    constructor() {
        super();
        this.props["jcr:content/sling:resourceType"] = "core/wcm/components/page";
    }
}

module.exports = Page;