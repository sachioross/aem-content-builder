const aem = require('../index');

test('Can set text', () => {
    let test = new aem.components.core.Text();
    test.setText("<h1>This is some test content</h1>");
    
    let expected = {
        props: {
            "jcr:primaryType":"nt:unstructured",
            "sling:resourceType":"core/wcm/components/text/v2/text", 
            "text": "<h1>This is some test content</h1>"
        },
        content: {}
    }

    expect(test).toEqual(expected);

    test.setText("The text has changed");
    expected.props.text = "The text has changed";
    expect(test).toEqual(expected);
});

test('Can set and deset richText', () => {
    let test = new aem.components.core.Text();
    test.setIsRich(true)
    
    let expected = {
        props: {
            "jcr:primaryType":"nt:unstructured",
            "sling:resourceType":"core/wcm/components/text/v2/text", 
            "textIsRich": "true"
        },
        content: {}
    }

    expect(test).toEqual(expected);

    test.setIsRich(false);
    expected.props.textIsRich = "false";
    expect(test).toEqual(expected);
});