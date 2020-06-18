const aem = require('../index');

test('Component Functions - Happy Path', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/contentfragmentlist/v1/contentfragmentlist",
        "modelPath": "/content/test/page",
        "parentPath": "/content/test/page",
        "orderBy": "main",
        "sortOrder": "desc",
        "maxItems": 5,
        "id": "abc",

        tagNames: ["tag1", "tag2", "tag3"],
        elementNames: ["main", "main", "head"],
    }

    let contentFragmentList = new aem.components.core.ContentFragmentList();

    contentFragmentList.setModelPath("/content/test/page");
    contentFragmentList.setParentPath("/content/test/page");
    contentFragmentList.setOrderBy("main");
    contentFragmentList.setSortOrder("desc");
    contentFragmentList.setMaxItems(5);
    contentFragmentList.setID("abc");

    let m1 = ["tag1", "tag2", "tag3"];
    contentFragmentList.setMultiValueProp("tagNames", m1);

    let m2 = ["main", "main", "head"];
    contentFragmentList.setMultiValueProp("elementNames", m2);

    expect(contentFragmentList.getData()).toStrictEqual(testContent);
});

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "nt:unstructured",
        "sling:resourceType": "core/wcm/components/contentfragmentlist/v1/contentfragmentlist"
    }

    let contentFragmentList = new aem.components.core.ContentFragmentList();

    expect(contentFragmentList.getData()).toStrictEqual(testContent);
});