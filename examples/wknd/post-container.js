const aem = require('../../index');
const targets = require('./config'); 

// Create classes for the WKND components Container, Title, Accordion
class WkndContainer extends aem.components.core.Container {
    constructor() {
        super();
        this.props["sling:resourceType"] = "wknd/components/content/container";
    }
}

class Title extends aem.components.core.Title {
    constructor() {
        super();
        this.props["sling:resourceType"] = "wknd/components/content/title";
    }
}

class Accordion extends aem.components.core.Accordion {
    constructor() {
        super();
        this.props["sling:resourceType"] = "wknd/components/content/accordion";
    }
}

// Create several components and combine
let containerOne = new WkndContainer(); 
let containerTwo = new WkndContainer();

let titleOne = new Title();
titleOne.setTitle("Title One");
let titleTwo = new Title();
titleTwo.setTitle("Title Two");

let accordion = new Accordion();

containerOne.addChild("title", titleOne);
containerOne.addChild("accordion", accordion);

// Order of adds matters; this would not work reversed
containerTwo.addChild("title", titleTwo);
containerOne.addChild("container", containerTwo);

// Use dynamically created page once container components have been made..
// let destination = (`${targets.host}${targets.page}${targets.timestamp ? "-" + new Date().getTime() : ""}`); 
let destination = "/content/wknd/us/en/adventures/ski-touring-mont-blanc/jcr:content/root/responsivegrid/responsivegrid";
let req = new aem.request.POST(`${targets.host}${destination}/container-${new Date().getTime()}`); 

// Add the appropriate credentials and payload
req.credentials(targets.user, targets.pw).payload(containerOne.getData());

// Create the new page in the targeted instance
aem.request.Handler.handle(req.build());

