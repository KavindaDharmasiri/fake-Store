import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import {Col, Form, Input, message, Row} from 'antd'
import PostService from "../../../services/PostService";

class DefaultLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: '',
                password: ''
            }
        }
    }

    loginUser = async () =>{
        let response = await PostService.createPostUserLogin(this.state.formData);

        if (response.status === 200) {

            console.log(response.data.token)
            console.log('ok')

            setTimeout(() => {
                message.success('Register Success!!')
            }, 2000);

        } else {
            console.log('no')
            setTimeout(() => {
                message.error('Register Failed!!')
            }, 2000);
        }
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

                                <input  style={style.input} type="text" placeholder="user name"
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.username = e.target.value
                                            this.setState({ formData })
                                        }}/>
                            </div>
                            <div  style={style.secondinput}>

                                <input  style={style.input} type="password" placeholder="Password"
                                        onChange={(e) => {
                                            let formData = this.state.formData
                                            formData.password = e.target.value
                                            this.setState({ formData })
                                        }}/>
                            </div>
                            <div  style={style.loginbutton}>
                                <button  style={style.button} type={"button"} onClick={this.loginUser}>Login</button>
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