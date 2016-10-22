var Framework = require("../index.js");
var defineComponent = Framework.Define;
var definePage = Framework.DefinePage;
var Component = Framework.Component;
var PageCmp = Framework.Page;

var assert = require('assert');

describe('The framework', function() {

  describe('When defining new components', function() {
    it('should make it easy by using the "define" method', function() {

      // The component defintion will be part of the prototype,
      // and thus must use the JS property definition.
      var componentDef = {
          resourceType : {
            value : 'my/new/component',
            enumerable : true
          }
      };

      function NewComponent(title) {
        Component.call(this, title);
      }

      NewComponent = defineComponent(NewComponent, componentDef);
      assert.equal('my/new/component', new NewComponent().resourceType);
    });
  });

  describe('When defining new page components', function() {
    it('should make it easy to define a new page component', function() {

      // As there is no difference between page and 'regular' components
      // except for how properties are generally set, we use the same
      // pattern as would be done for a regular component
      var pageDef = {
        resourceType : {
          value : 'my/new/page',
          enumerable : false
        }
      };

      function NewPage(path, title) {
        PageCmp.call(this, path, title);
      }

      NewPage = definePage(NewPage, pageDef);

      var page = new NewPage('/', 'New Page');
      assert.equal("my/new/page", page.resourceType);
      assert.equal("New Page", page.title);
    });
  });
});
