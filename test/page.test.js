const Page = require('../core/Page');
const Component = require('../core/Component');

test('Page Instantiation', () => {
    let testContent = {
        "jcr:primaryType":"cq:Page",
        "sling:resourceType":"core/wcm/components/page"
    }
    
    let p = new Page();
    expect(p.getData()).toStrictEqual(testContent);
});

test('Adding Component and Content', () => {
    let testContent = {
        "jcr:primaryType":"cq:Page",
        "sling:resourceType":"core/wcm/components/page",
        "jcr:content/new-title/jcr:primaryType":"nt:unstructured",
        "jcr:content/new-title/title":"New Component",
        "jcr:content/new-prop":"New Prop Value"
    }

    let p = new Page();
    let c = new Component();

    c.setProperty("title", "New Component");
    p.addComponent("new-title",c);
    p.setContent("new-prop","New Prop Value");

    expect(p.getData()).toStrictEqual(testContent);
});