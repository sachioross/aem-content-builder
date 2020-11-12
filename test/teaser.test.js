const aem = require('../index');

test('Able to set standard fields: title, pretitle, description, linkUrl, and image', () => {
    let t1 = new aem.components.core.Teaser();
    t1.setTitle("My Test Teaser");
    t1.setDescription("My test description");
    t1.setPreTitle("My test pretitle");
    t1.setLinkURL("http://www.adobe.com");
    t1.setFileReference("/path/to/image.png");

    const expected = {
        props: {
            'jcr:primaryType': 'nt:unstructured',
            'sling:resourceType': 'core/wcm/components/teaser/v1/teaser',
            'jcr:title': 'My Test Teaser', 
            'jcr:description': 'My test description',
            'pretitle': 'My test pretitle',
            'fileReference': '/path/to/image.png',
            'linkURL': 'http://www.adobe.com'
        },
        content: {}
    }

    expect(t1).toEqual(expected);
});

test('Get set title/description from page', () => {
    let t1 = new aem.components.core.Teaser();
    t1.setTitleFromPage(true);
    t1.setDescriptionFromPage(true);

    const expected = {
        props: {
            'jcr:primaryType': 'nt:unstructured',
            'sling:resourceType': 'core/wcm/components/teaser/v1/teaser',
            'titleFromPage': 'true',
            'descriptionFromPage': 'true'
        },
        content: {}
    }

    expect(t1).toEqual(expected);
})

test('Able to set and reset actions', () => {
    let t1 = new aem.components.core.Teaser();
    t1.setActions([{text: "My new action", link: "/my/page"}, {text: "My second action", link: "/my/second/link"}]);
    t1.setActions([{text: "My first action", link: "/my/first/link"}, {text: "My second action", link: "/my/second/link"}]);
    
    // This should show up in the object output, but not in the addAction
    t1.setProperty("customProp", "customVal");

    t1.addAction({text: "My third action", link: "/my/third/link"});
    t1.addAction(t1.createAction("/my/fourth/link", "My fourth action"));

    const expected = {
        props: {
            'jcr:primaryType': 'nt:unstructured',
            'sling:resourceType': 'core/wcm/components/teaser/v1/teaser',
            'actions/item0/jcr:primaryType': 'nt:unstructured',
            'actions/item0/link': '/my/first/link',
            'actions/item0/text': 'My first action',
            'actions/item1/jcr:primaryType': 'nt:unstructured',
            'actions/item1/link': '/my/second/link',
            'actions/item1/text': 'My second action',
            'actions/item2/jcr:primaryType': 'nt:unstructured',
            'actions/item2/link': '/my/third/link',
            'actions/item2/text': 'My third action',
            'actions/item3/jcr:primaryType': 'nt:unstructured',
            'actions/item3/link': '/my/fourth/link',
            'actions/item3/text': 'My fourth action',
            'customProp': 'customVal'
        },
        content: {}
    }

    expect(t1).toEqual(expected);
})

test('Responsive settings', () => {
    let t1 = new aem.components.core.Teaser();
    t1.setResponsiveSetting({key: 'mobile', offset: 2, width: 4});

    const expected = {
        props: {
            'jcr:primaryType': 'nt:unstructured',
            'sling:resourceType': 'core/wcm/components/teaser/v1/teaser',
            'cq:responsive/jcr:primaryType': 'nt:unstructured',
            'cq:responsive/mobile/jcr:primaryType': 'nt:unstructured',
            'cq:responsive/mobile/offset': '2', 
            'cq:responsive/mobile/width': '4'
        },
        content: {}
    }

    expect(t1).toEqual(expected);
})