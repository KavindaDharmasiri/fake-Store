import {Component, Fragment} from "react";
import DefaultRegister from "../../components/pages/RegisterFormat";

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <DefaultRegister></DefaultRegister>
            </Fragment>
        )
    }
}

export default HomePage