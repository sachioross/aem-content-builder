const aem = require('../index');

test('Framework wiring', () => {
    
    // Validate Component object is instantiated correctly
    let componentObject = {
        "jcr:primaryType": "nt:unstructured"
    }

    let c = new aem.components.Component();
    expect(c.getData()).toStrictEqual(componentObject);
    
    
    // Validate the Page object is instantiated correctly    
    let pageObject = {
        "jcr:primaryType":"cq:Page",
        "sling:resourceType":"core/wcm/components/page"
    }

    let p = new aem.components.core.Page();
    expect(p.getData()).toStrictEqual(pageObject);
})