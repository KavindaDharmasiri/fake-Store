import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Grid, Typography} from "@mui/material";
import GetService from "../../../services/GetService";
import PostService from "../../../services/PostService";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

class DefaultProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
            proImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            cato: [],
            formData: {
                id: '',
                title: '',
                price: '',
                description: '',
                category: '',
                image: null,
                rating: {
                    rate: 3.9,
                    count: 120
                }
            },
            alert: ''
        }

    }

    clearProduct = async () => {
        this.setState({
            proImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            formData: {
                id: '',
                title: '',
                price: '',
                description: '',
                category: '',
                image: null,
                rating: {
                    rate: 3.9,
                    count: 120
                }
            }
        })
    }

    saveProduct = async () => {

        if (this.state.formData.title !== '' && this.state.formData.price !== '' && this.state.formData.description !== '') {
            console.log("save")
            let response = await PostService.createPostProduct(this.state.formData);

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
    }

    async loadCato() {
        let res = await GetService.fetchAllProductCategories();

        this.setState({
            cato: res.data,
        })

        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    async loadAllCato() {
        let res = await GetService.fetchAllProducts();

        let temp = 0;
        temp = res.data[res.data.length - 1].id
        console.log('temp ' + temp)
        temp = temp + 1;

        let formData = this.state.formData
        formData.id = temp
        this.setState({formData})

        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    componentDidMount() {
        this.loadCato();
        this.loadAllCato();
    }

    handleFile(e) {
        let file = e.target.files[0];
        this.setState({
            file: file
        })
    }

    showImg(e) {
        const urlImg = URL.createObjectURL(e)
        console.log(urlImg)
        this.setState({
            proImg: urlImg
        })
    }

    render() {
        const {classes} = this.props;

        const catagory = this.state.cato;

        return (
            <div style={style.body}>

                {this.state.alert === "success" ?
                    <Alert severity="success" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Success</AlertTitle>
                        Product Adding Success — <strong>check it out!</strong>
                    </Alert> : null
                }

                {this.state.alert === "error" ?
                    <Alert severity="error" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Error</AlertTitle>
                        Product Adding UnSuccess — <strong>check it out!</strong>
                    </Alert> : null
                }


                <ValidatorForm ref="form" className="pt-2">
                    <Grid container style={{textAlign: "center"}} className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <Typography variant="h2" style={{textAlign: "left"}}>Product Manage</Typography>
                        </Grid>


                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Title"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.title}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.title = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Price"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.price}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.price = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>

                            <select style={{backgroundColor: "white", width: "80%", height: "80%"}} onChange={(e) => {
                                let formData = this.state.formData
                                formData.category = e.target.value
                                this.setState({formData})
                            }}>

                                {
                                    catagory.map((cat) => (
                                        <option value={cat}>{cat}</option>
                                    ))}

                            </select>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Description"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.description}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.description = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div>
                                <img style={style.image} src={this.state.proImg} alt=""/>
                            </div>
                            <input style={style.btnimg} type="file" name={"imageUpload"} id={"input"}
                                   accept={"image/*"}
                                   onChange={(e) => {
                                       let formData = this.state.formData
                                       formData.image = e.target.files[0]
                                       this.setState({formData})

                                       this.showImg(e.target.files[0])
                                   }}/>
                        </Grid>

                    </Grid>
                    <div style={style.btnRight}>
                        <button style={style.btnSec} onClick={this.clearProduct}>clear</button>
                        <button style={style.btnSec2} onClick={this.saveProduct}>save</button>
                    </div>
                </ValidatorForm>


            </div>
        )
    }
}

export default withStyles(style)(DefaultProduct)