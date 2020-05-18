const Component = require('../Component');

test('Instantiate new component', () => {
    let initialProps = {
        "jcr:primaryType": "cq:Component"
    }
    
    let c1 = new Component();
    expect(c1.getPrimaryType()).toBe("cq:Component");
    expect(c1.getProperties()).toStrictEqual(initialProps);

    let constructorProps = {
        "jcr:primaryType": "cq:Component",
        "name":"component",
        "jcr:content/title": "My Title"
    }
    let c2 = new Component({name:"component"},{"jcr:content/title":"My Title"});
    expect(c2.getData()).toStrictEqual(constructorProps);
});

test('Ensure property setting', () => {
    let targetProps = {
        "jcr:primaryType": "cq:Component",
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
        "jcr:primaryType": "cq:Component",
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
        "jcr:primaryType":"cq:Component",
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
        "jcr:primaryType":"cq:Component", 
        "jcr:content/title":"Parent",
        "child/jcr:primaryType":"cq:Component",
        "child/jcr:content/title":"Child"
    }

    let parent = new Component(null, {"jcr:content/title":"Parent"});
    let child = new Component(null, {"jcr:content/title":"Child"});
    parent.addComponent("child", child);
    expect(parent.getData()).toStrictEqual(targetResult);
});