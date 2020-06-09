const AbstractRequest = require('./AbstractRequest');

class PostRequest extends AbstractRequest {

    constructor(url) {
        super(url);
        this.method = "POST";
    }
}

module.exports = PostRequest;