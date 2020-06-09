const aem = require('../index');
const fetch = require('cross-fetch');

const b64creds = "YWRtaW46YWRtaW4=";

test('Instantiation', () => {

    let targetRequest = new fetch.Request(testURL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': `Basic ${b64creds}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: builder.data
    })

    let c = new aem.components.AbstractComponent();
    c.setProperty("title", `Title ${new Date().getTime()}`);
    c.setResourceType("wknd/components/content/title")

    const testURL = `http://localhost:4502/content/wknd/language-masters/en/magazine/_jcr_content/root/responsivegrid/title-${new Date().getTime()}`;

    let builder = new aem.RequestBuilder(testURL); 
    builder.credentials("admin","admin").payload(c.getData());
    
    expect(builder.build()).toStrictEqual(targetRequest);

});

test('Static methods', () => {
    expect(aem.RequestBuilder.encode("admin","admin")).toBe(b64creds);
});