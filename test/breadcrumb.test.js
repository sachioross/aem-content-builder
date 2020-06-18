const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/breadcrumb/v2/breadcrumb",
        "id": "abc",
        "startLevel": 0,
        "showHidden": false,
        "hideCurrent": false,
        "disableShadowing": true,
    }

    let breadcrumb = new aem.components.core.Breadcrumb();

    breadcrumb.setStartLevel(0);
    breadcrumb.setShowHidden(false);
    breadcrumb.setHideCurrent(false);
    breadcrumb.setDisableShadowing(true);
    breadcrumb.setID("abc");

    expect(breadcrumb.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/breadcrumb/v2/breadcrumb"
    }

    let breadcrumb = new aem.components.core.Breadcrumb();

    expect(breadcrumb.getData()).toStrictEqual(testContent);
});