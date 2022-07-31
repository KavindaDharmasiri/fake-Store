import {Component, Fragment} from "react";
import DefaultDashBoard from "../../components/pages/DashBoardFormat";

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <DefaultDashBoard></DefaultDashBoard>
            </Fragment>
        )
    }
}

export default HomePage