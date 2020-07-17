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
let pagePath = `${targets.host}${targets.page}${targets.timestamp ? "-" + new Date().getTime() : ""}`;
let req = new aem.request.POST(pagePath); 


// Add the appropriate credentials and payload
req.payload(cp.getData());

// Create the new page in the targeted instance, and then follows with creating a secondary child page
aem.request.Handler.login(targets.host, targets.user, targets.pw)
    .then(res => {
        loginToken = res.headers.get("set-cookie");
        req.setCookie(loginToken);
        aem.request.Handler.handle(req.build(), {logRequest: true, logResponse: true})
            .then(res => {
                let child = new ContentPage("Auto-Generated Child");
                let childReq = new aem.request.POST(`${pagePath}/child`); 
                childReq.setCookie(loginToken).payload(child.getData());
                aem.request.Handler.handle(childReq.build())
                    .then(res => {
                        console.log(res.status);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch (err => {
                console.log(err);
            })
    })
    .catch(err => {
        console.log(err);
    })
