const aem = require('../../index');
const fs = require('fs');
const path = require('path');
const targets = require('../wknd/config');;

const filePath = path.resolve(__dirname, 'assets/smooth-black.png');

aem.request.Handler.login(targets.host, targets.user, targets.pw)
    .then(res => {

        let damReq = new aem.request.POST(`${targets.host}/api/assets/${path.basename(filePath)}`)
            .addBinary(path.basename(filePath), filePath); 
            damReq.setCookie(res.headers.get('set-cookie'));
            
        aem.request.Handler.handle(damReq.build(), {logRequest: true})
            .then(damRes => {
                console.log(damRes);
            })
            .catch(err => {
                console.log(err);
            })
    })
    .catch(err => {
        console.log(err);
    });