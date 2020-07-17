const aem = require('../../index');
const targets = require('./config'); 

let get = new aem.request.GET(`${targets.host}/content/wknd/us/en/adventures/ski-touring-mont-blanc.html`);

aem.request.Handler.login(targets.host, targets.user, targets.pw)
    .then(res => {
        let loginToken = res.headers.get("set-cookie");
    
        
        get.setCookie(loginToken);
        
        aem.request.Handler.handle(get.build())
            .then(getRes => getRes.text())
            .then(html => { console.log(html) })
            .catch(err => console.log(err));
    })
    .catch(err => {
        console.log(err);
    })
