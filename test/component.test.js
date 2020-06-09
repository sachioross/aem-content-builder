const Component = require('../index').components.AbstractComponent;

test('Instantiate new component', () => {
    let initialProps = {
        "jcr:primaryType": "nt:unstructured"
    }
    
    let c1 = new Component();
    expect(c1.getPrimaryType()).toBe("nt:unstructured");
    expect(c1.getProperties()).toStrictEqual(initialProps);

    let constructorProps = {
        "jcr:primaryType": "nt:unstructured",
        "name":"component",
        "jcr:content/title": "My Title"
    }
    let c2 = new Component({name:"component"},{"jcr:content/title":"My Title"});
    expect(c2.getData()).toStrictEqual(constructorProps);
});

test('Ensure property setting', () => {
    let targetProps = {
        "jcr:primaryType": "nt:unstructured",
        "testProp":"testVal",
        "chainedProp":"chainedVal"
    }

    let c = new Component();
    // Test setting and chaining
    c.setProperty("testProp", "testVal")
        .setProperty("chainedProp", "chainedVal");

    expect(c.getProperties()).toStrictEqual(targetProps);
    expect(c.getProperty("testProp")).toBe("testVal");
});

test('Ensure multi-value property handling', () => {
    let targetProps = {
        "jcr:primaryType": "nt:unstructured",
        multiOne: ["a","b","c"],
        multiTwo: ["1","2","3"],
        multiThree: ["{\"a\":1,\"b\":2}"]
    };

    let c = new Component();

    let m1 = ['a','b','c'];
    let m2 = [1,2,3];
    let m3 = [{"a":1,"b":2}];

    c.setMultiValueProp("multiOne", m1)
        .setMultiValueProp("multiTwo", m2)
        .setMultiValueProp("multiThree", m3);

    expect(c.getProperties()).toStrictEqual(targetProps);
});

test('Ensure content setting', () => {
    let targetContent = {
        "jcr:content/title": "Test Title",
        "jcr:content/name": "testComponent"
    }

    let c = new Component();
    // Test setting and chaining
    c.setContent("title", "Test Title")
        .setContent("name","testComponent");

    expect(c.getContents()).toStrictEqual(targetContent);
    expect(c.getContent("title")).toBe("Test Title");
});

test('Verify getData returns all data', () => {
    let targetResult = {
        "jcr:primaryType":"nt:unstructured",
        "testProp":"testVal", 
        "jcr:content/title": "My Title"
    }

    let c = new Component(); 
    c.setProperty("testProp", "testVal")
        .setContent("title", "My Title");
    expect(c.getData()).toStrictEqual(targetResult);
});

test('Add component', () => {
    let targetResult = {
        "jcr:primaryType":"nt:unstructured", 
        "jcr:content/title":"Parent",
        "child/jcr:primaryType":"nt:unstructured",
        "child/jcr:content/title":"Child"
    }

    let parent = new Component(null, {"jcr:content/title":"Parent"});
    let child = new Component(null, {"jcr:content/title":"Child"});
    parent.addChild("child", child);
    expect(parent.getData()).toStrictEqual(targetResult);
});

test('Can be extended', () => {
    let targetData = {
        "jcr:primaryType": "nt:unstructured",
        "jcr:content/title": "Extended",
        "sling:resourceType": "my/new/component"
    }

    class ExtendedComponent extends Component {
        constructor() {
            super();
            this.props['sling:resourceType'] = "my/new/component"
        }
    }

    let nc = new ExtendedComponent();
    nc.setContent("title", "Extended");

    expect(nc.getData()).toStrictEqual(targetData);
})