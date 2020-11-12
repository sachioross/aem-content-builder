const fetch = require('cross-fetch');
const POST = require('./Post');

/**
 * Allows for the posting of an AEM component to a target AEM system.
 * The {@code request} object should respect the standard FETCH API 
 * Request object
 * @param {string} req The Fetch API Request object with URL;
 * @param {object} cof url 
 */
function handle(req, conf) {

    conf = conf ? conf : {};

    // Form requestID (datestamp + url?)
    if (conf.logRequest) {
        console.log("ISSUING REQUEST");
        console.dir(req, {depth: 5});
    }

    return new Promise((resolve, reject) => {
        fetch(req)
            .then(res => {
                if (conf.logResponse) {
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

/**
 * Will login to a target AEM system using the provided user and pass. This method can be used to 
 * return a full login response object. If only the login token is required, callers are 
 * encourged to use the `getLoginToken` method.
 * @param {string} host The fully qualified host (e.g. http://localhost:4502) 
 * @param {string} user The username to use for login (e.g. 'admin')
 * @param {string} pass The pass to use for the loing (e.g. 'admin')
 * @param {object} conf An optional configuration object that can adjust functionality, 
 *            such as logging the response to the console during execution
 */
function login(host, user, pass, conf) {

    conf = conf ? conf : {};

    let login = new POST(`${host}/libs/granite/core/content/login.html/j_security_check`);
    login.payload({
        j_username : user, 
        j_password : pass, 
        j_validate: "true"
    })
    return new Promise((resolve, reject) => {
        handle(login.build())
            .then(res => {
                if (conf.logResponse) {
                    console.dir(res, {depth: 5});
                }
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    })
}

/**
 * Wrapper method that will call the `login` method, but only return the required login token cookie
 * @param {string} host The fully qualified host (e.g. http://localhost:4502) 
 * @param {string} user The username to use for login (e.g. 'admin')
 * @param {string} pass The pass to use for the loing (e.g. 'admin')
 * @param {object} conf An optional configuration object that can adjust functionality, 
 *            such as logging the response to the console during execution
 */
function getLoginToken(host, user, pass, opts) {
    return new Promise((resolve, reject) => {
        login(host, user, pass, opts)
        .then(res => {
            resolve(res.headers.get('set-cookie'));
        })
        .catch(err => {
            reject(err);
        })
    })
    
}

/**
 * 
 * @param {string} host The fully qualified host (e.g. http://localhost:4502) 
 * @param {string} path The path of the page to delete, no extension (e.g. /my/page/path)
 * @param {string} loginCookie The login token to use for the operation
 * @param {object} conf An optional configuration object that can adjust functionality, 
 *            such as logging the response to the console during execution
 */
function deletePage(host, path, loginCookie, conf) {

    conf = conf ? conf : {};
 
    let deleteRequest = new POST(`${host}/bin/wcmcommand`);
    deleteRequest.payload({
        _charset_: "UTF-8",
        force : "true", 
        checkChildren : "false", 
        cmd: "deletePage", 
        path: path
    }).setCookie(loginCookie);

    return new Promise((resolve, reject) => {
        handle(deleteRequest.build())
            .then(res => {
                if (conf.logRequest) {
                    console.dir(deleteRequest, {depth: 5});
                }
                if (conf.logResponse) {
                    console.dir(res, {depth: 5});
                }
                resolve(res);
            })
            .catch(err => {
                if (conf.logRequest) {
                    console.dir(deleteRequest, {depth: 5});
                }
                reject(err);
            })
    })
}

module.exports = {
    handle: handle,
    login: login,
    deletePage: deletePage,
    getLoginToken: getLoginToken
}