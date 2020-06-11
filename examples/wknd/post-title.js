const aem = require('../../index');
const targets = require('./config'); 

// Create a Page class for WKND
class Title extends aem.components.core.Title {

    constructor(title) {
        super();
        this.props["sling:resourceType"] = "wknd/components/content/title";
        if (title) {
            this.setTitle(title);
        }
    }

}

// Instantiate a new component and auto-set title
let title = new Title("Auto Generated Title");

// Instantiate a new AEM request with the proper target location

// Use dynamically created page once container components have been made..
// let destination = (`${targets.host}${targets.page}${targets.timestamp ? "-" + new Date().getTime() : ""}`); 
let destination = "/content/wknd/us/en/adventures/ski-touring-mont-blanc/jcr:content/root/responsivegrid/responsivegrid";
let req = new aem.request.POST(`${targets.host}${destination}/title-${new Date().getTime()}`); 

// Add the appropriate credentials and payload
req.credentials("admin", "admin").payload(title.getData());

// Create the new page in the targeted instance
aem.request.Handler.handle(req.build());

