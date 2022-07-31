import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {Grid,  Typography} from "@mui/material";
import logo from "../../../assets/img/pro.png";
class DefaultProduct extends Component {

    constructor(props) {
        super(props);

        this.state ={
            proImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div style={style.body}>
                <ValidatorForm ref="form" className="pt-2"  >
                    <Grid container style={{textAlign:"center"}} className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <Typography variant="h2" style={{textAlign:"left"}}>Product Manage</Typography>
                        </Grid>


                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="First Name"
                                variant="outlined"
                                size="small"
                                style={{ width: '80%' , backgroundColor:"White" } }
                                /*value={this.state.formData.id}*/
                                /*onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.id = e.target.value
                                    this.setState({ formData })
                                }}*/
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Last Name"
                                variant="outlined"
                                size="small"
                                style={{ width: '80%' , backgroundColor:"White" } }
                                /*value={this.state.formData.name}*/
                                /*onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.name = e.target.value
                                    this.setState({ formData })
                                }}*/
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <select style={{backgroundColor:"white" , width:"80%" , height:"80%"}} onChange={(e) => {
                                let formData = this.state.formData
                                formData.type = e.target.value
                                this.setState({formData})
                            }}>
                                <option value={"Admin"}>Admin</option>
                                <option selected value={"User"}>User</option>

                            </select>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="User Name"
                                variant="outlined"
                                size="small"
                                style={{ width: '80%' , backgroundColor:"White" } }
                                /*value={this.state.formData.salary}*/
                                /*onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.salary = e.target.value
                                    this.setState({ formData })
                                }}*/
                                validators={['required']}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div>
                                <img style={style.image} src={this.state.proImg} alt=""/>
                            </div>
                            <input style={style.btnimg} type="file" name={"imageUpload"} id={"input"} accept={"image/*"}/>
                        </Grid>

                    </Grid>
                    <div style={style.btnRight}>
                    <button style={style.btnSec}>clear</button>
                    <button style={style.btnSec2}>save</button>
                    </div>
                </ValidatorForm>


            </div>
        )
    }
}

export default withStyles(style)(DefaultProduct)