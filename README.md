# Adobe Experience Manager Content Builder

This is a nodeJS module that is intended to assist with the creation and migration
of content from legacy websites into new AEM installations and projects. This tool
utilizes the Sling POST methods of content manipulation in AEM.

> :construction: This project is undergoing serious updates and changes to meet newer standards and patterns. Changes are expected over the next several months. 

> :exclamation: This will now be released as version 2.x.x. This is major breaking changes to previous releases and has no compatibility with previous usage-scenarios. Apologies to anyone whom has used this repository that this will impact; however it was deemed necessary and the benefits outweighed the current usage. Future updates will follow proper notices. 

## Context

This package is to be used as the bases for creating customized content building systems. This package will maintain consistency with release (AEM Core Components)[https://github.com/adobe/aem-core-wcm-components], however the expectation is that implementors will use this package as a basis and then create extensions of the core components in a similar manner to how AEM projects structures using core components. See the (examples)[./examples/] folder for details on usage. 

## Usage Notes

The target of this framework is to enable rapid development of new content creation and migration tools. Single or multi-value property setting, setting of properties and content (e.g. adding under `jcr:content`), and the actual POSTing of data; are accounted for in the (AbstractComponent)[./components/AbstractComponent.js]. The (AbstractPage)[./components/AbstractPage.js] adds the ability to add components, as would be expected in an AEM Page. 

While this framework can be used independently to help perform automated content creation within an AEM system as part of a testing or local-development workflow, it was designed to support content migration from legacy systems where the only sufficient option was to parse existing data (in most cases, HTML). As-such, the (AbstractComponent)[./components/AbstractComponent.js] provides the `parse` function. This method is not implemented in the AbstractComponent. Any implementation that intends to use this method is expected to implement this method for each component created. 

It is expected that the `parse` method can handle all needs of the component to dynamically set the required properities. In most cases, the expected flow for migration-related content build would be: 

  1. Collected the content to be parsed
  2. Pass the chunk of content that relates to this component into the `parse` method
  3. Repeat until all content is properly parsed
  4. Create a new (POST request)[./reuqest/Post.js] with the target destination
  4. `POST` the request to an AEM instance using the `handle` method from the (Handler)[./request/Handler.js]

For HTML migrations, this implemenation recommends using the [cheerio library](https://github.com/cheeriojs/cheerio) as it makes the parsing implementation fairly simple.

## Structure

The current component structure is provided via a single framework entry-point at (index.js)[./index.js]. Calling `require` on this module will return the following object: 

```javascript
{
  components: {
    core: {
      Page,
      Title
    },
    AbstractComponent,
    AbstractPage
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
    this.props["sling:resourceType"] = "my/resource/type";
  }
}

// Create new page for the implementation
class MyPage extends aem.components.core.Page {
  construtor() {
    super();
    this.props["sling:resourceType"] = "my/project/structure/page";
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
