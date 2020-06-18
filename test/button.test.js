const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/button/v1/button",
        "id": "abc",
        "jcr:title": "My Title",
        "link": "/content/test/page",
        "icon": "/content/test/icon",
        "accessibilityLabel": "My Label",
    }

    let button = new aem.components.core.Button();

    button.setTitle("My Title");
    button.setLink("/content/test/page");
    button.setIcon("/content/test/icon");
    button.setAccessibilityLabel("My Label");
    button.setID("abc");

    expect(button.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/button/v1/button"
    }

    let button = new aem.components.core.Button();

    expect(button.getData()).toStrictEqual(testContent);
});