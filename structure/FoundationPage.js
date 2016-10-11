var PageComponent = require("../PageComponent.js");

function Page(path, title) {
  PageComponent.call(this, path, title);
};

PageComponent.prototype = Object.create(PageComponent.prototype, {
  resourceType : {
    value : 'wcm/foundation/components/page',
    enumerable : true
  },
  template : {
    value : '',
    enumerable : true
  }
})

module.exports = PageComponent;
