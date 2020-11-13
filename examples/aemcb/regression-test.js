const aem = require('../../index');

// Create our custom components by extending the Core components from the AEM Content Builder
class Teaser extends aem.components.core.Teaser {
    constructor() {
        super();
        this.setResourceType("aemcb/components/teaser");
    }
}

class Text extends aem.components.core.Text {
    constructor() {
        super();
        this.setResourceType("aemcb/components/text");
    }
}

class Container extends aem.components.core.Container {
    constructor() {
        super();
        this.setResourceType("aemcb/components/container");
    }
}

// Create our page, also by extending the Core Components
class ContentPage extends aem.components.core.Page {
    constructor(title) {
        super();
        this.setResourceType("aemcb/components/page");
        this.setTemplate("/conf/aemcb/settings/wcm/templates/page-content");
        this.setContent("jcr:title", title ? title : "TITLE MISSING"); 
    }
}

function createLandingPage(title) {
    
    // Create our title component; default behaviour is to take the title of the page is no title set
    let text = new Text();
    text.setText("This is our <em>landing page</em> for our <strong>regression test content</strong>.");
    text.setIsRich(true);
    
    // Create the teaser component
    let teaser_1 = new Teaser();
    teaser_1.setTitle("Our Landing Page Teaser");
    teaser_1.setFileReference('/content/dam/aemcb/asset.jpg');
    
    // Create the container component, add the title and teaser components
    let container_1 = new Container();
    container_1.addChild("text", text);
    container_1.addChild("teaser", teaser_1);

    // Create the page, add the container and return
    let page = new ContentPage(title);
    page.addComponent("root/container/container/container_1", container_1);
    return page;
}

function createChildPage(title) {
    // Create our title component; default behaviour is to take the title of the page is no title set
    let text = new Text();
    text.setText(`Welcome to ${title}, one of the child pages!`)
    text.setIsRich(true);
    
    // Create the first teaser component, set to half-width and on the left
    let teaser_1 = new Teaser();
    teaser_1.setTitle("Left Side Teaser");
    teaser_1.setFileReference('/content/dam/aemcb/asset.jpg');
    teaser_1.setResponsiveSetting({offset: 1, width: 5});

    // Create the second teaser component, set to half-width and on the right
    let teaser_2 = new Teaser();
    teaser_2.setTitle("Right Side Teaser");
    teaser_2.setFileReference('/content/dam/aemcb/asset.jpg');
    teaser_2.setResponsiveSetting({offset: 0, width: 5});
    
    // Create the container component, add the title and teaser components
    let container = new Container();
    container.setLayout("responsiveGrid");
    container.addChild("text", text);
    container.addChild("teaser_left", teaser_1);
    container.addChild("teaser_right", teaser_2);

    // Create the page, add the container and return
    let page = new ContentPage(title);
    page.addComponent("root/container/container/container_1", container);
    return page;
}

const host = "http://localhost:4502";
const root = "/content/aemcb/regression-test";

// This test will create two levels with a couple landing pages and child pages.
aem.request.Handler.getLoginToken(host, "admin", "admin")
    .then(token => {

        let pages = createLandingPage("Regression Test Landing")
        .addChild("child-1", createChildPage("Child One"))
        .addChild("child-2", createChildPage("Child Two"));

        // To ensure our content is clean, delete the root of our test content on each run
        aem.request.Handler.deletePage(host, root, token)
            .then(res => {
                // Create a request to make our new pages
                let post = new aem.request.POST(`${host}${root}`)
                    .payload(pages.getData())
                    .setCookie(token);

                // Build the request and pass to the handler
                aem.request.Handler.handle(post.build())
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

