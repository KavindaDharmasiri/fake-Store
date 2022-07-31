import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import {Col, Form, Input,  Row} from 'antd'

class DefaultLogin extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <div style={style.main}>
                <div style={style.submain}>
                    <div>
                        <div>
                            <h1 style={style.h1}>Login</h1>
                            <div>

                                <input  style={style.input} type="text" placeholder="user name" />
                            </div>
                            <div  style={style.secondinput}>

                                <input  style={style.input} type="password" placeholder="user name"  />
                            </div>
                            <div  style={style.loginbutton}>
                                <button  style={style.button}>Login</button>
                            </div>

                            <p  style={style.link}>
                                <h4>Create new User Account? <a style={style.a} href="#">click here</a></h4>
                            </p>


                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withStyles(style)(DefaultLogin)