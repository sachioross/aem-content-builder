
const aem = require('../index');

test('Test basic instantiation', () => {
    let testContent = {
        "jcr:primaryType": "sling:OrderedFolder",
        "jcr:mixinTypes": ["rep:AccessControllable"],
        "jcr:title": "My New Folder"
    }

    let folder = new aem.sling.Folder();

    folder.setProperty("jcr:title", "My New Folder");

    expect(folder.getData()).toStrictEqual(testContent);
});