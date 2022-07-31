import {Component, Fragment} from "react";
import DefaultCart from "../../components/pages/CartManageFormat";

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <DefaultCart></DefaultCart>
            </Fragment>
        )
    }
}

export default HomePage