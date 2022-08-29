import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Grid, Typography} from "@mui/material";
import GetService from "../../../services/GetService";
import PostService from "../../../services/PostService";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

class DefaultCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
            user: [],
            product: [],
            formData: {
                userId: '',
                date: '',
                products: [
                    {
                        productId: '',
                        quantity: ''
                    }
                ],
            },
            alert: ''
        }

    }

    async loadUserName() {
        let res = await GetService.fetchAllUsers();

        this.setState({
            user: res.data
        })

        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    async loadProductTitle() {
        let res = await GetService.fetchAllProducts();

        this.setState({
            product: res.data
        })

        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    componentDidMount() {
        this.loadUserName()
        this.loadProductTitle()
    }

    buttonHandler = async () => {
        console.log("save")
        let response = await PostService.createPostCart(this.state.formData);

        if (response.status === 200) {
            console.log('ok')

            this.setState({
                alert: "success"
            })

            setTimeout(() => {
                this.setState({
                    alert: 'no'
                })
            }, 2000)

        } else {
            console.log('no')
            this.setState({
                alert: "error"
            })

            setTimeout(() => {
                this.setState({
                    alert: 'no'
                })
            }, 2000)
        }
    }

    setUserId = async (e) => {
        console.log(e.target.value)

        for (let i = 0; i < this.state.user.length; i++) {
            if (this.state.user[i].username === e.target.value) {
                let formData = this.state.formData
                formData.userId = this.state.user[i].id
                this.setState({formData})
            }
        }
    }

    setProductId = async (e) => {
        console.log(e.target.value)

        for (let i = 0; i < this.state.product.length; i++) {
            if (this.state.product[i].title === e.target.value) {
                let formData = this.state.formData
                console.log(this.state.product[i].id)
                formData.products[0].productId = this.state.product[i].id
                this.setState({formData})
            }
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div style={style.body}>

                {this.state.alert === "success" ?
                    <Alert severity="success" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Success</AlertTitle>
                        Cart Adding Success — <strong>check it out!</strong>
                    </Alert> : null
                }

                {this.state.alert === "error" ?
                    <Alert severity="error" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Error</AlertTitle>
                        Cart Adding UnSuccess — <strong>check it out!</strong>
                    </Alert> : null
                }


                <ValidatorForm ref="form" className="pt-2">
                    <Grid container style={{textAlign: "center"}} className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <Typography variant="h2" style={{textAlign: "left"}}>Cart Manage</Typography>
                        </Grid>


                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <select style={{backgroundColor: "white", width: "80%", height: "150%"}} onChange={(e) => {
                                this.setUserId(e)
                            }}>

                                {this.state.user.map((use) => (
                                    <option value={use.username}>{use.username}</option>
                                ))}

                            </select>

                        </Grid>


                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <input style={{backgroundColor: "white", width: "80%", height: "150%"}} type="date"
                                   rules={[{required: true}]}
                                   onChange={(e) => {
                                       let formData = this.state.formData
                                       formData.date = e.target.value
                                       this.setState({formData})
                                   }}/>
                        </Grid>


                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <select style={{backgroundColor: "white", width: "80%", height: "80%"}} onChange={(e) => {
                                this.setProductId(e)
                            }}>
                                {this.state.product.map((pro) => (
                                    <option value={pro.title}>{pro.title}</option>
                                ))}


                            </select>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Qty"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.quantity}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.products[0].quantity = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>

                    </Grid>
                    <div style={style.btnRight}>
                        <button style={style.btnSec}>clear</button>
                        <button style={style.btnSec2} onClick={this.buttonHandler}>save</button>
                    </div>
                </ValidatorForm>


            </div>
        )
    }
}

export default withStyles(style)(DefaultCart)