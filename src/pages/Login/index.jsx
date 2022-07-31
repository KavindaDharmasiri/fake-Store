import {Component, Fragment} from "react";
import DefaultLogin from "../../components/pages/LoginFormat";

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <DefaultLogin></DefaultLogin>
            </Fragment>
        )
    }
}

export default HomePage