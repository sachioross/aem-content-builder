const fetch = require('cross-fetch');
const FormData = require('form-data');
const fs = require('fs');

class AbstractRequest {

    static encode(username, password) {
        return Buffer.from(`${username}:${password}`).toString('base64');
    }

    constructor(url) {
        this.url = url;
        this.data = '';
    }

    payload(data) {
        if (typeof data !== "object") {
            JSON.parse(data);
        }
        let fd = new FormData();
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                data[key].forEach(nested => {
                    fd.append(key, nested);
                })
            } else {
                fd.append(key, data[key]);
            }
        })
        this.data = fd
        return this;
    }

    changeMethodTo(method) {
        this.method = method;
        return this;
    }

    destination(url) {
        this.url = url;
        return this;
    }

    setCookie(cookie) {
        this.cookie = cookie;
        return this;
    }

    addBinary(name, filePath) {
        this.data = this.data ? this.data : new FormData();
        this.data.append(name, fs.createReadStream(filePath));
        return this;
    }

    credentials(username, password) {
        this.user = username;
        this.pass = password;
        return this;
    }

    build() {
        // Most of the FETCH request is based on default values, however maintaining 
        // the settings here to ensure interaction clarity

        let opts = {
            method: this.method, 
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            headers: {
                // Allow FETCH to set Content-Header, especially for multi-part form data
                'Authorization': `Basic ${AbstractRequest.encode(this.user,this.pass)}`
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }

        if (this.method === "POST") {
            opts.body = this.data;
        }

        if (this.cookie) {
            opts.headers.cookie = this.cookie;
        }

        return new fetch.Request(this.url, opts);
    }
}

module.exports = AbstractRequest;