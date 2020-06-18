const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"core/wcm/components/accordion/v1/accordion", 
        "id":"abc", 
        "expandedItems":"header",
        "singleExpansion":false,
        "headingElement": "h3"
    }

    let accordion = new aem.components.core.Accordion();

    accordion.setExpandedItems("header");
    accordion.setSingleExpansion(false);
    accordion.setHeadingElement("h3");
    accordion.setID("abc");

    expect(accordion.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/accordion/v1/accordion"
    }

    let accordion = new aem.components.core.Accordion();

    expect(accordion.getData()).toStrictEqual(testContent);
});