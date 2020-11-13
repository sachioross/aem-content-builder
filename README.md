# Adobe Experience Manager Content Builder

This is a nodeJS module that is intended to assist with the creation and migration
of content from legacy websites into new AEM installations and projects. This tool
utilizes the Sling POST methods of content manipulation in AEM.

> :exclamation: This will now be released as version 2.x.x. This is major breaking changes to previous releases and has no compatibility with previous usage-scenarios. Apologies to anyone whom has used this repository that this will impact; however it was deemed necessary and the benefits outweighed the current usage. Future updates will follow proper notices. 

## Context

This package is to be used as the bases for creating customized content building systems. This package will maintain consistency with release [AEM Core Components](https://github.com/adobe/aem-core-wcm-components), however the expectation is that implementors will use this package as a basis and then create extensions of the core components in a similar manner to how AEM projects structures using core components. See the [examples](examples/) folder for details on usage. 

## Usage Notes

The target of this framework is to enable rapid development of new content creation and migration tools. Single or multi-value property setting and the setting of properties and content (e.g. adding under `jcr:content`) are accounted for in the [AbstractComponent](./components/AbstractComponent.js). The [AbstractPage](./components/AbstractPage.js) adds the ability to add components and page-related properties, such as the associated template, as would be expected in an AEM Page. 

## Structure

The current component structure is provided via a single framework entry-point at [index.js](./index.js). Calling `require` on this module will return the following object: 

```javascript
{
  components: {
    core: {
      Accordian,
      Breadcrumb,
      Button,
      Carousel,
      Commons,
      Container,
      ContentFragment,
      ContentFragmentList,
      Download,
      Image,
      Page,
      Teaser,
      Text,
      Title
    },
    AbstractComponent,
    AbstractPage
  },
  sling: {
    Resource,
    Folder
  }, 
  request: {
    AbstractRequest,
    GET, 
    POST,
    Handler
  }
}
```

## Usage

The below is an example of how implementations are expected to utilize this script, including use of extension.

```javascript
// Declare the objects we'll need
const aem = require('aem-content-builder');

// Create new component for the implementation
class MyComponent extends aem.components.AbstractComponent {
  constructor() {
    super();
    this.setResourceType("my/resource/type");
  }
}

// Create new page for the implementation
class MyPage extends aem.components.core.Page {
  construtor() {
    super();
    this.setResourceType("my/project/structure/page");
  }
}

// Instantiate and add components
let page = new MyPage();
page.setContent("jcr:title", "About Us"); 
let component = new MyComponent();
page.addComponent(component);

// Build new AEM request
const pageUrl = "http://localhost:4502/content/wknd/us/en/about";
let req = new aem.request.POST(pageUrl);
req.credentails("admin","admin").payload(page.getData());

aem.request.Handler.handle(req.build());
```

## Running Examples

> :exclamation: Some examples depend on having specific AEM projects, such as the [AEM WKND tutorial](https://github.com/adobe/aem-guides-wknd) installed. See the README in the root of each example set.

Users can run the [examples](examples/) by navigating to the folder and running `node <file>` (e.g. `node create-page.js`). 

Note that this is all clear-text, so don't store sensative or real passwords in this configuration; it's only for local testing! 
