var ComponentFactory = require("./content");
var PageFactory = require("./structure");
var Component = require("./Component.js");
var Page = require("./PageComponent.js");

function define(cmp, cmpDef) {
  cmp.prototype = Object.create(Component.prototype, cmpDef);
  return cmp;
}

function definePage(cmp, cmpDef) {
  cmp.prototype = Object.create(Page.prototype, cmpDef);
  return cmp;
}

module.exports = {
  componentFactory : ComponentFactory,
  pageFactory : PageFactory,
  Component : Component,
  Page : Page,
  Define : define,
  DefinePage : definePage
}
