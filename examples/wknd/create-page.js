const aem = require('../../index');

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

// Instantiate a new AEM request with the proper target location
const target = "http://localhost:4502"
let req = new aem.request.POST(`${target}/content/wknd/us/en/auto-generated`); 

// Add the appropriate credentials and payload
req.credentials("admin", "admin").payload(cp.getData());

// Create the new page in the targeted instance
aem.request.Handler.handle(req.build());