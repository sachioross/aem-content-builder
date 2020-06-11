const fetch = require('cross-fetch');
const FormData = require('form-data');

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
                    console.log(nested);
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

    credentials(username, password) {
        this.user = username;
        this.pass = password;
        return this;
    }

    build() {
        // Most of the FETCH request is based on default values, however maintaining 
        // the settings here to ensure interaction clarity

        if (this.method === "POST") {
            return new fetch.Request(this.url, {
                method: "POST", 
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    // Allow FETCH to set Content-Header, especially for multi-part form data
                    'Authorization': `Basic ${AbstractRequest.encode(this.user,this.pass)}`
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: this.data // body data type must match "Content-Type" header
            });
        } else {

            // FETCH request fields are read-only, thus simpler to create a new request rather 
            // than attempting to adjust request post-instantiation
            return new fetch.Request(this.url, {
                method: this.method, 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                    'Authorization': `Basic ${AbstractRequest.encode(this.user,this.pass)}`
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer', 
            });
        }
        
    }
}

module.exports = AbstractRequest;