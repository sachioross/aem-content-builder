var Component = require("../index.js").Component;
var Page = require("../index.js").pageFactory.get("page");
var assert = require('assert');

describe('A component', function() {

  describe('When created', function() {

    it('should have no resourceType and a primaryType of nt:unstructured', function() {
      assert.equal("nt:unstructured", new Component().primaryType);
      assert.equal("", new Component().resourceType);
    });

    it('should a property with the value "test" once set', function() {
      assert.equal("test", new Component().setProperty("test", "test").content["test"]);
    });

    it('should have an array of size 3 for a multi-value property "test" once set', function() {
      assert.equal(3, new Component().setMultiValueProp("test", ["a", "b", "c"]).content["test"].length);
    });

    it('should have another component at the path of "component-a" when a new component is added at that path', function(){
      var c = new Component().addComponent("component-a", new Component());
      assert.equal("nt:unstructured", c.content["component-a/jcr:primaryType"]);
    });

  });

});

describe('A page component', function() {

  describe('When created', function() {

    it('should have a resource type of "wcm/foundation/components/page"', function() {
      assert.equal("wcm/foundation/components/page", new Page("/", "Test Page").content["jcr:content/sling:resourceType"]);
    });

    it('should have a primary type of "cq:Page"', function() {
      assert.equal("cq:Page", new Page("/", "Test Page").primaryType);
    });

    it('should have a title of "Test Page" when instantiated with "Test Page" in constructor', function() {
      assert.equal("Test Page", new Page("/", "Test Page").content["jcr:content/jcr:title"]);
    });

  });

});
