const AbstractPage = require('../AbstractPage');

class Page extends AbstractPage {
    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/page";
    }
}

module.exports = Page;