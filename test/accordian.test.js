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

    let accordian = new aem.components.core.Accordion();

    accordian.setExpandedItems("header");
    accordian.setSingleExpansion(false);
    accordian.setHeadingElement("h3");
    accordian.setID("abc");

    expect(accordian.getData()).toStrictEqual(testContent);

});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/accordion/v1/accordion"
    }

    let accordian = new aem.components.core.Accordion();

    expect(accordian.getData()).toStrictEqual(testContent);
});