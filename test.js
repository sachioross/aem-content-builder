var request = require("request");
var Definitions = require("./index.js");
var Components = Definitions.componentFactory;
var Pages = Definitions.pageFactory;

var Component = Definitions.Component;
var Par = Components.get("par");
var Text = Components.get("text");
var Page = Pages.get("page");

var aemRequest = request.defaults({
    'auth': {
        'user': 'admin',
        'pass': 'admin',
        'sendImmediately': false
    },
    'useQuerystring' : true
  }
);

var page = new Page("/content/test", "Test Migration Page");
page.addComponent("par", new Par().addComponent("text", new Text(null, "<h1>Hello World</h1>")));
console.log(page);

// { path: '/content/test',
//   content:
//    { 'jcr:primaryType': 'cq:Page',
//      'jcr:content/jcr:primaryType': 'cq:PageContent',
//      'jcr:content/jcr:title': 'Test Migration Page',
//      'jcr:content/sling:resourceType': 'wcm/foundation/components/page',
//      'jcr:content/jcr:mixinTypes': [ 'mix:versionable' ],
//      'jcr:content/cq:template': '',
//      'jcr:content/par/jcr:primaryType': 'nt:unstructured',
//      'jcr:content/par/sling:resourceType': 'foundation/components/parsys',
//      'jcr:content/par/text/jcr:primaryType': 'nt:unstructured',
//      'jcr:content/par/text/sling:resourceType': 'wcm/foundation/components/text',
//      'jcr:content/par/text/textIsRich': true,
//      'jcr:content/par/text/text': '<h1>Hello World</h1>' },
//   title: 'Test Migration Page' }



page.post(aemRequest, "http://localhost:4506/content/test");
var par = new Par();
par.post(aemRequest, "http://localhost:4506/content/test/jcr:content/par2");
