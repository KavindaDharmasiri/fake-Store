import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import jwt_decode from "jwt-decode";
import PostService from "../../../services/PostService";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

class DefaultLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                username: '',
                password: ''
            },
            token: '',
            alert: ''
        }
    }


    render() {
        const {classes} = this.props;

        const login = async (res) => {
            console.log(res)
            const user = jwt_decode(res)

            const newWindow = window.open('http://localhost:3000/dashBoard?id=' + this.state.formData.username, '_self', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }

        const loginUser = async values => {

            let response = await PostService.createPostUserLogin(this.state.formData);

            if (response.status === 200) {
                console.log('ok')

                login(response.data.token)

                console.log('no')
                this.setState({
                    alert: "log"
                })

                setTimeout(() => {
                    this.setState({
                        alert: ''
                    })
                }, 2000)

            } else {
                console.log('no')

                this.setState({
                    alert: "error"
                })

                setTimeout(() => {
                    this.setState({
                        alert: ''
                    })
                }, 2000)
            }
        }

        return (
            <div style={style.main}>

                {this.state.alert === "log" ?
                    <Alert severity="success" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Success</AlertTitle>
                        User Login Success — <strong>check it out!</strong>
                    </Alert> : null
                }


                {this.state.alert === "error" ?
                    <Alert severity="error" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Error</AlertTitle>
                        User Login UnSuccess — <strong>check it out!</strong>
                    </Alert> : null
                }

                <div style={style.submain}>
                    <div>
                        <div>
                            <h1 style={style.h1}>Login</h1>
                            <div>

                                <input style={style.input} type="text" placeholder="user name"
                                       onChange={(e) => {
                                           let formData = this.state.formData
                                           formData.username = e.target.value
                                           this.setState({formData})
                                       }}/>
                            </div>
                            <div style={style.secondinput}>

                                <input style={style.input} type="password" placeholder="Password"
                                       onChange={(e) => {
                                           let formData = this.state.formData
                                           formData.password = e.target.value
                                           this.setState({formData})
                                       }}/>
                            </div>
                            <div style={style.loginbutton}>
                                <button style={style.button} type={"button"} onClick={loginUser}>Login</button>
                            </div>

                            <p style={style.link}>
                                <h4>Create new User Account? <a style={style.a} href="/register">click here</a></h4>
                            </p>


                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withStyles(style)(DefaultLogin)