const fetch = require('cross-fetch');
const POST = require('./Post');

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
    if (opts.logRequest) {
        console.log("ISSUING REQUEST");
        console.dir(req, {depth: 5});
    }

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
                reject(err);
            })
    })
}

function login(host, user, pass, opts) {

    opts = opts ? opts : {};

    let login = new POST(`${host}/libs/granite/core/content/login.html/j_security_check`);
    login.payload({
        j_username : user, 
        j_password : pass, 
        j_validate: "true"
    })
    return new Promise((resolve, reject) => {
        handle(login.build())
            .then(res => {
                if (opts.logResponse) {
                    console.dir(res, {depth: 5});
                }
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function deletePage(path, loginCookie, opts) {

    opts = opts ? opts : {};
 
    let deleteRequest = new POST(`${host}/bin/wcmcommand`);
    deleteRequest.payload({
        _charset_: "UTF-8",
        force : true, 
        checkChildren : false, 
        cmd: "deletePage", 
        path: path
    }).setCookie(loginCookie);

    return new Promise((resolve, reject) => {
        handle(deleteRequest.build())
            .then(res => {
                if (opts.logResponse) {
                    console.dir(res, {depth: 5});
                }
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {
    handle: handle,
    login: login,
    deletePage: deletePage
}