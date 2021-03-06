const aem = require('../index');

test('Page Instantiation', () => {
    let testContent = {
        "jcr:primaryType":"cq:Page",
        "jcr:content/sling:resourceType":"core/wcm/components/page",
        "jcr:content/jcr:primaryType":"cq:PageContent",
        "jcr:content/jcr:mixinTypes": [
            "mix:versionable"
        ],
    }
    
    let p = new aem.components.core.Page();
    expect(p.getData()).toStrictEqual(testContent);
});

test('Adding Component and Content', () => {
    let testContent = {
        "jcr:primaryType":"cq:Page",
        "jcr:content/sling:resourceType":"core/wcm/components/page",
        "jcr:content/jcr:primaryType":"cq:PageContent",
        "jcr:content/jcr:mixinTypes": [
            "mix:versionable"
        ],
        "jcr:content/new-title/jcr:primaryType":"nt:unstructured",
        "jcr:content/new-title/title":"New Component",
        "jcr:content/new-prop":"New Prop Value"
    }

    let p = new aem.components.core.Page();
    let c = new aem.components.AbstractComponent();

    c.setProperty("title", "New Component");
    p.addComponent("new-title",c);
    p.setContent("new-prop","New Prop Value");

    expect(p.getData()).toStrictEqual(testContent);
});

test('Extending Page from Core', () => {
    let testContent = {
        "jcr:primaryType":"cq:Page",
        "jcr:content/sling:resourceType":"wknd/components/structure/page",
        "jcr:content/jcr:title":"WKND Migration",
        "jcr:content/jcr:primaryType":"cq:PageContent",
        "jcr:content/jcr:mixinTypes": [
            "mix:versionable"
        ],
    }

    class ContentPage extends aem.components.core.Page {

        constructor(title) {
            super();
            this.props["jcr:content/sling:resourceType"] = "wknd/components/structure/page";
            this.setContent("jcr:title", title ? title : "TITLE MISSING"); 
        }
    
    }

    let p = new ContentPage("WKND Migration");

    expect(p.getData()).toStrictEqual(testContent);
});