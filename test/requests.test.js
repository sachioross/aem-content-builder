const aem = require('../index');
const fetch = require('cross-fetch');

const b64creds = "YWRtaW46YWRtaW4=";
const testURL = `http://localhost:4502/content/wknd/us/en/test`;

function createPayload() {
    let c = new aem.components.AbstractComponent();
    c.setProperty("title", `Title ${new Date().getTime()}`);
    c.setResourceType("wknd/components/content/title");

    return c;
}

test('Instantiation and usage of the AbstractRequest', () => {

    let req = new aem.request.AbstractRequest(testURL); 
    req.changeMethodTo("POST").credentials("admin","admin").payload(createPayload().getData());
    
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
        body: req.data
    })

    expect(req.build()).toStrictEqual(targetRequest);
});

test('GET extension', () => {

    let req = new aem.request.GET(testURL); 
    req.credentials("admin","admin");
    
    let targetRequest = new fetch.Request(testURL, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': `Basic ${b64creds}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })

    expect(req.build()).toStrictEqual(targetRequest);
});

test('POST extension', () => {

    let req = new aem.request.POST(testURL); 
    req.credentials("admin","admin").payload(createPayload().getData());
    
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
        body: req.data
    })

    expect(req.build()).toStrictEqual(targetRequest);
});

test('Static methods', () => {
    expect(aem.request.AbstractRequest.encode("admin","admin")).toBe(b64creds);
});