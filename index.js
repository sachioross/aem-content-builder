const RequestBuilder = require('./core/RequestBuilder');
const Component = require('./core/Component');

let c = new Component();
c.setProperty("jcr:title", `Title ${new Date().getTime()}`);
c.setResourceType("wknd/components/content/title")

const testURL = `http://localhost:4502/content/wknd/language-masters/en/magazine/_jcr_content/root/responsivegrid/title-${new Date().getTime()}`;

let builder = new RequestBuilder(testURL); 
builder.credentials("admin","admin").payload(c.getFormData());

c.parse()


c.post(builder.build());
