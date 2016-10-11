# Adobe Experience Manager Content Builder

This is a nodeJS module that is intended to assist with the creation and migration
of content from legacy websites into new AEM installations and projects. This tool
utilizes the Sling POST methods of content manipulation in AEM.

### Program Usage

In general, this package is a combination of an API and a built-in posting framework for
all component definitions. It is intended that this package can act as a starting
point for migration efforts or test content creation. This is not intended to be
used without modification specific to a client development needs and components.

In the majority of cases: this package will be a dependency for an associated content
creator or migration framework. As such, usage of this package will be through extending
the objects already defined in this library, with some exception.

### Developer Notes

The target of this framework is to enable rapid development of new content creation
and migration tools. Single or multi-value property setting, adding child-components,
and the actual POSTing of data, are accounted for in the base Component.js and
PageComponent.js files. Developers should only need to extend one of these two
objects in order to achieve basic functionality.

For simple content creation, there should be very little effort needed to complete
a content framework. For migration, an addition method has been added to the base
Component.js file:

`parse($)`

This method has not been implemented in the base component, leaving the specifics
of the parsing of the $ object up to the needs of the implementation, per component.

In general, it is recommended to use the [cheerio library](https://github.com/cheeriojs/cheerio) as it makes the parsing implementation fairly simple.

#### This is a builder

This library has been designed to be used in a builder-like, chainable fashion. As such, all currently implemented methods return the `this` object after performing its function. This should be maintained for specific-implementations. 

### Example 

The below example is a rudimentary test-script that demonstrates basic usage of this library. 

```javascript
// Declare the objects we'll need
var request = require("request");
var Definitions = require("./index.js");
var Pages = Definitions.pageFactory;
var Page = Pages.get("page");
var Components = Definitions.componentFactory;
var Par = Components.get("par");
var Text = Components.get("text");

// Set the defaults for any requests. 
// This is considered the minimum required request object that includes auth and
// useQuerystring parameters (the last is important for setting multi-value properties)

var aemRequest = request.defaults({
    'auth': {
        'user': 'admin',
        'pass': 'admin',
        'sendImmediately': false
    },
    'useQuerystring' : true
  }
);

// Create a new page, setting expected path and title
var page = new Page("/content/test", "Test Migration Page");

// Add a Par component to the page that also includes a child Text component 
// with the phrase "Hello World" wrapped in an h1 tag, as allowed by the text component
page.addComponent("par", new Par().addComponent("text", new Text(null, "<h1>Hello World</h1>")));

// Create the page in the local AEM instance
page.post(aemRequest, "http://localhost:4502/content/test");

// Add a par to the page created above (note, this is a simplistic example, and might 
// occasionally have an issue with the fact that NodeJS fires functions asynchronously).
// A proper implementation should try to promisify this type of interaction. 
var par = new Par();
par.post(aemRequest, "http://localhost:4502/content/test/jcr:content/par2");
```
