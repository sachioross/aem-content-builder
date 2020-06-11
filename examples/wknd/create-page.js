const aem = require('../../index');
const targets = require('./config');

// Create a Page class for WKND
class ContentPage extends aem.components.core.Page {

    constructor(title) {
        super();
        this.props["jcr:content/sling:resourceType"] = "wknd/components/structure/page";
        this.setContent("jcr:title", title ? title : "TITLE MISSING"); 
    }
}

// Instantiate a new page titled, "Migrated Page". This will be an empty page for now.
let cp = new ContentPage("Auto-Generated Page");

// Set a multi-value property
cp.setMultiValueProp("jcr:content/migratedTags", ["one", "two", 3]);

// Instantiate a new AEM request with the proper target location
// Default will create a url akin to: http://localhost:4502/content/wknd/us/en/auto-generated-1591832077915
let req = new aem.request.POST(`${targets.host}${targets.page}${targets.timestamp ? "-" + new Date().getTime() : ""}`); 


// Add the appropriate credentials and payload
req.credentials(targets.user, targets.pw).payload(cp.getData());

// Create the new page in the targeted instance
aem.request.Handler.handle(req.build());