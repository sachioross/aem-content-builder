const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/download/v1/download",
        "jcr:title": "My Title",
        "fileReference": "/content/test/page",
        "inline": true,
        "titleFromAsset": false,
        "jcr:description": "My Description",
        "descriptionFromAsset": false,
        "actionText": "My Text"
    }

    let download = new aem.components.core.Download();

    download.setFileReference("/content/test/page");
    download.setInline(true);
    download.setTitle("My Title");
    download.setTitleFromAsset(false);
    download.setDescription("My Description");
    download.setDescriptionFromAsset(false);
    download.setActionText("My Text");

    expect(download.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/download/v1/download"
    }

    let download = new aem.components.core.Download();

    expect(download.getData()).toStrictEqual(testContent);
});