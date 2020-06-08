const Component = require('../core/Component');

class Title extends Component {

    constructor() {
        super();
        this.props["sling:resourceType"] = "core/wcm/components/title/v2/title";
    }
}