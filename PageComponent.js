var Component = require("./Component.js");

function PageComponent(path, title) {

  Component.call(this, path);
  this.title = title;

  this.content = {
    "jcr:primaryType" : this.primaryType,
    "jcr:content/jcr:primaryType" : "cq:PageContent",
    "jcr:content/jcr:title" : this.title,
    "jcr:content/sling:resourceType" : this.resourceType,
    "jcr:content/jcr:mixinTypes":["mix:versionable"],
    "jcr:content/cq:template": this.template,
  };

};

PageComponent.prototype = Object.create(Component.prototype, {
  primaryType : {
    value : "cq:Page",
    enumerable : true
  },
  resourceType : {
    value : 'wcm/foundation/components/page',
    enumerable : true
  },
  template : {
    value : '',
    enumerable : true
  },
  addComponent : {
    value : function(name, cmpt) {
      for (i in cmpt.content) {
        this.setProperty("jcr:content/" + name + "/" + i, cmpt.content[i]);
      }
      return this;
    }
  }
})

module.exports = PageComponent;
