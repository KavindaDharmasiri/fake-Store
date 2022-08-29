import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import {Grid} from "@mui/material";
import GetService from "../../../services/GetService";

class DefaultDashBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: '',
            cart: '',
            user: ''
        }
    }

    async loadProducts() {
        let res = await GetService.fetchAllProducts();

        this.setState({
            product: res.data.length
        })


        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    async loadCarts() {
        let res = await GetService.fetchAllCarts();

        this.setState({
            cart: res.data.length
        })


        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    async loadUsers() {
        let res = await GetService.fetchAllUsers();

        this.setState({
            user: res.data.length
        })

        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    componentDidMount() {
        this.loadProducts()
        this.loadCarts()
        this.loadUsers()
    }

    render() {
        const {classes} = this.props;

        return (
            <div style={style.body}>

                <div style={style.subMain}>
                    <Grid container style={{textAlign: "center"}} className="pt-2" spacing={3}>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div style={style.divBox}>
                                <h1>Products</h1>
                                <h1>{this.state.product}</h1></div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div style={style.divBox}>
                                <h1>Cart</h1>
                                <h1>{this.state.cart}</h1>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div style={style.divBox}>
                                <h1>Users</h1>
                                <h1>{this.state.user}</h1>
                            </div>
                        </Grid>

                    </Grid>

                </div>

            </div>
        )
    }
}

export default withStyles(style)(DefaultDashBoard)