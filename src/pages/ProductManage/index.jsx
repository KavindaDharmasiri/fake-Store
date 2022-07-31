import {Component, Fragment} from "react";
import DefaultProduct from "../../components/pages/ProductManageFormat";

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <DefaultProduct></DefaultProduct>
            </Fragment>
        )
    }
}

export default HomePage