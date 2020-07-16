const fetch = require('cross-fetch');

/**
 * Allows for the posting of an AEM component to a target AEM system.
 * The {@code request} object should respect the standard FETCH API 
 * Request object, set to the POST method.
 * @param {req} The Fetch API Request object with URL;
 * @param {url} url 
 */
function handle(req, opts) {

    opts = opts ? opts : {};

    // Form requestID (datestamp + url?)
    console.log(`Attempting to post ${JSON.stringify(req)}`);

    return new Promise((resolve, reject) => {
        fetch(req)
        .then(res => {
            if (opts.logResponse) {
                console.log(res);
            }
            if (res.ok) {
                console.log(`Posted to ${req.url} with a status of ${res.status}`);
            }
            resolve(res);
        })
        .catch(err => {
            console.log(`Error while attempting POST to ${req.url}`);
            console.log(err);
            console.log(req);
            reject(err);
        })
    })
}

module.exports = {
    handle: handle
}