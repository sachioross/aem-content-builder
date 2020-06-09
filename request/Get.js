const AbstractRequest = require('./AbstractRequest');

class GetRequest extends AbstractRequest {

    constructor(url) {
        super(url);
        this.method = "GET";
    }
}

module.exports = GetRequest;