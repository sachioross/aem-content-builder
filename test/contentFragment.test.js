const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/contentfragment/v1/contentfragment",
        "fragmentPath": "/content/test/page",
        "variationName": "My Variation",
        "paragraphScope": "all",
        "paragraphRange": 3,
        "id": "abc",
        elementNames: ["main", "head", "main"],
        paragraphHeadings: ["Heading1", "Heading2", "Heading3"]
    }

    let contentFragment = new aem.components.core.ContentFragment();

    contentFragment.setFragmentPath("/content/test/page");
    contentFragment.setVariationName("My Variation");
    contentFragment.setParagraphScope("all");
    contentFragment.setParagraphRange(3);
    contentFragment.setID("abc");

    let m1 = ["main", "head", "main"];
    contentFragment.setMultiValueProp("elementNames", m1);

    let m2 = ["Heading1", "Heading2", "Heading3"];
    contentFragment.setMultiValueProp("paragraphHeadings",m2);

    expect(contentFragment.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/contentfragment/v1/contentfragment"
    }

    let contentFragment = new aem.components.core.ContentFragment();

    expect(contentFragment.getData()).toStrictEqual(testContent);
});