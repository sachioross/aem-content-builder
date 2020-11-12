const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"core/wcm/components/title/v2/title", 
        "id":"abc", 
        "type":"h2",
        "jcr:title":"My Title", 
        "linkURL": "/content/test/page"
    }

    let title = new aem.components.core.Title();

    title.setTitle("My Title");
    title.setHeaderType("h2");
    title.setLink("/content/test/page");
    title.setId("abc");

    expect(title.getData()).toStrictEqual(testContent);
});

test('Test instantiation with title', () => {
    let testContent = {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"core/wcm/components/title/v2/title",
        "jcr:title":"My Title"
    }

    let title = new aem.components.core.Title("My Title");

    expect(title.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType":"nt:unstructured",
        "sling:resourceType":"core/wcm/components/title/v2/title"
    }

    let title = new aem.components.core.Title();

    expect(title.getData()).toStrictEqual(testContent);
});