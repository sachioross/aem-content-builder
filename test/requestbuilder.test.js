const RequestBuilder = require('../core/RequestBuilder');
const Component = require('../core/Component');
const fetch = require('cross-fetch');

const b64creds = "YWRtaW46YWRtaW4=";

test('Instantiation', () => {

    let c = new Component();
    c.setProperty("title", `Title ${new Date().getTime()}`);
    c.setResourceType("wknd/components/content/title")

    const testURL = `http://localhost:4502/content/wknd/language-masters/en/magazine/_jcr_content/root/responsivegrid/title-${new Date().getTime()}`;

    let builder = new RequestBuilder(testURL); 
    builder.credentials("admin","admin").payload(c.getData());

    let f = new fetch.Request(testURL, {
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

    expect(builder.build()).toStrictEqual(f);

});

test('Static methods', () => {

    expect(RequestBuilder.encode("admin","admin")).toBe(b64creds);
});