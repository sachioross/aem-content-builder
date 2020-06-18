const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/container/v1/container",
        "id": "abc",
        "backgroundImageReference": "/content/test/hero",
        "backgroundColor": "black",
    }

    let container = new aem.components.core.Container();

    container.setBackgroundImageReference("/content/test/hero");
    container.setBackgroundColor("black");
    container.setID("abc");

    expect(container.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/container/v1/container"
    }

    let container = new aem.components.core.Container();

    expect(container.getData()).toStrictEqual(testContent);
});