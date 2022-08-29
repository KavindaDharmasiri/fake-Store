import {Component} from "react";
import {withStyles} from "@mui/styles";
import {style} from "./style";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import GetService from "../../../services/GetService";
import PostService from "../../../services/PostService";
import DeleteService from "../../../services/DeleteService";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

let temp = 0;

class DefaultRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            formData: {
                address: {
                    city: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    },
                    number: '',
                    street: '',
                    zipcode: ''
                },
                email: '',
                id: '',
                name: {
                    firstname: '',
                    lastname: ''
                },
                password: '',
                phone: '',
                username: ''
            },
            alert: '',
            openModel: '',
            useId: ''
        }
    }


    async deleteUser(value) {

        let res = await DeleteService.deleteUser(value);

        if (res.status === 200) {
            this.setState({
                alert: "delete"
            })


            setTimeout(() => {
                this.setState({
                    alert: ''
                })
            }, 2000)

        } else {
            console.log("fetching error: " + res)

            this.setState({
                alert: "no"
            })


            setTimeout(() => {
                this.setState({
                    alert: ''
                })
            }, 2000)
        }

    }


    async getAllUsers() {
        let res = await GetService.fetchAllUsers();

        temp = res.data[res.data.length - 1].id
        temp = temp + 1;

        let formData = this.state.formData
        formData.id = temp
        this.setState({formData})

        console.log(temp)

        this.setState({
            data: res.data,
        })

        if (res.status === 200) {

        } else {
            console.log("fetching error: " + res)
        }
    }

    componentDidMount() {
        this.getAllUsers()
    }

    clearFields = () => {
        this.setState({
            formData: {
                address: {
                    city: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    },
                    number: '',
                    street: '',
                    zipcode: ''
                },
                email: '',
                id: '',
                name: {
                    firstname: '',
                    lastname: ''
                },
                password: '',
                phone: '',
                username: ''
            }
        });
    };

    updateUser = (user) => {
        this.setState({
            formData: {
                address: {
                    city: user.address.city,
                    geolocation: {
                        lat: user.address.geolocation.lat,
                        long: user.address.geolocation.long
                    },
                    number: user.address.number,
                    street: user.address.street,
                    zipcode: user.address.zipcode
                },
                email: user.email,
                id: user.id,
                name: {
                    firstname: user.name.firstname,
                    lastname: user.name.lastname
                },
                password: user.password,
                phone: user.phone,
                username: user.username
            }
        });
    };

    render() {
        const {classes} = this.props;

        const buttonHandler = async values => {

            console.log("save")
            let response = await PostService.createPostUser(this.state.formData);

            if (response.status === 200) {
                console.log('ok')

                this.setState({
                    alert: "success"
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

        let users = this.state.data

        console.log(users)

        return (
            <div style={style.body}>

                <hr/>

                {this.state.alert === "success" ?
                    <Alert severity="success" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Success</AlertTitle>
                        User Adding Success — <strong>check it out!</strong>
                    </Alert> : null
                }

                {this.state.alert === "error" ?
                    <Alert severity="error" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Error</AlertTitle>
                        User Adding UnSuccess — <strong>check it out!</strong>
                    </Alert> : null
                }

                {this.state.alert === "delete" ?
                    <Alert severity="success" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Success</AlertTitle>
                        User Delete Success — <strong>check it out!</strong>
                    </Alert> : null
                }

                {this.state.alert === "no" ?
                    <Alert severity="error" style={{position: "fixed", width: "100%", zIndex: "99"}}>
                        <AlertTitle>Error</AlertTitle>
                        User Delete UnSuccess — <strong>check it out!</strong>
                    </Alert> : null
                }

                <ValidatorForm ref="form" className="pt-2">
                    <Grid container style={{textAlign: "center"}} className="pt-2" spacing={3}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <Typography variant="h2" style={{textAlign: "left"}}>User Registration</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="First Name"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.name.firstname}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.name.firstname = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Last Name"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.name.lastname}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.name.lastname = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Email"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.email}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.email = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="User Name"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.username}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.username = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Password"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.password}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.password = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="City"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.address.city}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.address.city = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Street"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.address.street}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.address.street = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Street No"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.address.number}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.address.number = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Zip Code"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.address.zipcode}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.address.zipcode = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Lat Value"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.address.geolocation.lat}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.address.geolocation.lat = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Long Value"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.address.geolocation.long}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.address.geolocation.long = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextValidator
                                id="outlinedbasic"
                                placeholder="Mobile No"
                                variant="outlined"
                                size="small"
                                style={{width: '80%', backgroundColor: "White"}}
                                value={this.state.formData.phone}
                                onChange={(e) => {
                                    let formData = this.state.formData
                                    formData.phone = e.target.value
                                    this.setState({formData})
                                }}
                                validators={['required']}
                            />
                        </Grid>
                    </Grid>
                    <div style={style.btnRight}>
                        <button style={style.btnSec} type={"button"} onClick={this.clearFields}>clear</button>
                        <button style={style.btnSec2} type={"button"} onClick={buttonHandler}>save</button>
                    </div>
                </ValidatorForm>

                <Grid contaner style={{marginTop: '15px'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="customer table">
                            <TableHead style={{backgroundColor: "rgb(117, 201, 250)"}}>
                                <TableRow>
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">User Name</TableCell>
                                    <TableCell align="left">Password</TableCell>
                                    <TableCell align="left">City</TableCell>
                                    <TableCell align="left">Street</TableCell>
                                    <TableCell align="left">Street No</TableCell>
                                    <TableCell align="left">Zip Code</TableCell>
                                    <TableCell align="left">Lat Value</TableCell>
                                    <TableCell align="left">Long Value</TableCell>
                                    <TableCell align="left">Mobile No</TableCell>
                                    <TableCell align="left">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    users.map((user) => (
                                        <TableRow>
                                            <TableCell align="left">{user.name.firstname}</TableCell>
                                            <TableCell align="left">{user.name.lastname}</TableCell>
                                            <TableCell align="left">{user.email}</TableCell>
                                            <TableCell align="left">{user.username}</TableCell>
                                            <TableCell align="left">{user.password}</TableCell>
                                            <TableCell align="left">{user.address.city}</TableCell>
                                            <TableCell align="left">{user.address.street}</TableCell>
                                            <TableCell align="left">{user.address.number}</TableCell>
                                            <TableCell align="left">{user.address.zipcode}</TableCell>
                                            <TableCell align="left">{user.address.geolocation.lat}</TableCell>
                                            <TableCell align="left">{user.address.geolocation.long}</TableCell>
                                            <TableCell align="left">{user.phone}</TableCell>

                                            <TableCell align="left">
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        onClick={() => {
                                                            console.log("edit icon clicked!")
                                                            this.updateUser(user);
                                                        }}
                                                    >
                                                        <EditIcon color="primary"/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        onClick={() => {
                                                            this.setState({
                                                                openModel: 'true',
                                                                useId: user.id
                                                            })
                                                        }}
                                                    >
                                                        <DeleteIcon color="error"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>


                {this.state.openModel === "true" ?

                    <div className="modelBackground" style={{
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(200, 200, 200)",
                        position: "fixed",
                        top: "65px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div className="modelContainer" style={{
                            width: "500px",
                            height: "500px",
                            borderRadius: "12px",
                            backgroundColor: "white",
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            display: "flex",
                            flexDirection: "column",
                            padding: "25px"
                        }}>
                            <div className="title" style={{
                                display: "inline-block",
                                textAlign: "center",
                                marginTop: "10px"
                            }}>
                                <h1>Are you sure you want to delete id= {this.state.useId} user?</h1>
                            </div>
                            <div className="body" style={{
                                flex: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "1.7rem",
                                textAlign: "center"
                            }}>
                                <p>confirm</p>
                            </div>
                            <div className="footer" style={{
                                flex: "20%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <button style={{
                                    width: "150px",
                                    height: "45px",
                                    margin: "10px",
                                    border: "none",
                                    backgroundColor: "cornflowerblue",
                                    color: "white",
                                    borderRadius: "8px",
                                    fontSize: "20px",
                                    cursor: "pointer"
                                }} type={"button"} onClick={() => {

                                    this.deleteUser(this.state.useId)

                                    this.setState({
                                        openModel: '',
                                    })
                                }}>
                                    yes
                                </button>

                                <button style={{
                                    backgroundColor: "crimson",
                                    width: "150px",
                                    height: "45px",
                                    margin: "10px",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "8px",
                                    fontSize: "20px",
                                    cursor: "pointer"
                                }} type={"button"} onClick={() => {
                                    this.setState({
                                        openModel: '',
                                    })
                                }}>
                                    no
                                </button>
                            </div>
                        </div>
                    </div> : null
                }

            </div>
        )
    }
}

export default withStyles(style)(DefaultRegister)