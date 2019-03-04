import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

export const NUMBER = /^[0-9]*$/;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tcNo: '',
            userName: '',
            password: '',
            errorText: '',
            validationSucces: false,
            openDialog: false
        }
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:8080/register";
        var self = this;
        var payload = {
            "tcNo": this.state.tcNo,
            "username": this.state.username,
            "password": this.state.password
        }
        var err = this.state.validationSucces;

        if (err) {
            axios.post(apiBaseUrl, payload)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 200) {
                        console.log("registration successfull");
                        self.setState({openDialog:true});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    window.location.reload();
                });
        }
    }


    handleClose = (event) => {
        this.setState({open: false});
        this.props.history.push('/');
    };

    goToLogin(event) {
        this.props.history.push('/');
    }

    onChangeTc(event) {
        if (event.target.value.toString().length != 11 || !NUMBER.test(event.target.value.toString())) {
            this.setState({
                tcNo: event.target.value.toString(),
                errorText: 'Length should be 11 and numerical',
                validationSucces: false
            })

        } else {
            this.setState({errorText: '', validationSucces: true,tcNo: event.target.value.toString()})

        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />

                        <Dialog
                            open={this.state.openDialog}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        > <DialogTitle id="alert-dialog-title">{"Registration Status"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Successful registration !
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <RaisedButton label="Confirm" onClick={this.handleClose.bind(this)} />

                            </DialogActions>
                        </Dialog>

                        <form>
                            <Grid container
                                  direction="column"
                                  justify="center"
                                  alignItems="center">
                                <TextField
                                    required
                                    hintText="Enter your TC No"
                                    floatingLabelText="TC No"
                                    type={"text"}
                                    errorText={this.state.errorText}
                                    onChange={this.onChangeTc.bind(this)}
                                />
                                <br/>
                                <TextField
                                    required
                                    error={true}
                                    hintText="Enter your Last Name"
                                    floatingLabelText="User Name"
                                    type={"text"}
                                    onChange={(event, newValue) => this.setState({username: newValue})}
                                />
                                <br/>
                                <TextField
                                    required
                                    error="true"
                                    type="password"
                                    hintText="Enter your Password"
                                    floatingLabelText="Password"
                                    onChange={(event, newValue) => this.setState({password: newValue})}
                                />
                                <br/>
                                <RaisedButton label="Submit" primary={true} style={style}
                                              onClick={(event) => this.handleClick(event)}/>
                            </Grid>
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default withRouter(Register);