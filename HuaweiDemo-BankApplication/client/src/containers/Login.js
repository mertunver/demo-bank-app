import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Grid from '@material-ui/core/Grid';
import * as React from "react";
import axios from "axios";
import {Redirect, Route, withRouter} from 'react-router-dom';
import LoggedInUser from './LoggedInUser';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            data : []
        }
    }



    handleClick(event) {
        var apiBaseUrl = "http://localhost:8080/login";
        var self = this;
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl, payload)
            .then(function (response) {
                console.log(response);
                if (response.status == 200) {

                    LoggedInUser.setIsLoggedIn(true);
                    LoggedInUser.setName( response.data.username);
                    LoggedInUser.setPassword(response.data.password);
                    LoggedInUser.setTcNo(response.data.tcNo);
                    LoggedInUser.setBalance(response.data.balance);

                    self.goToTransaction()

                } else if (response.status == 204) {
                    console.log("Username password do not match");
                    alert("username password do not match")
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
                alert("User does not exist");
                console.log(error);
            });
    }

    goToRegister = () => {
        this.props.history.push('/Register');
    }

    goToTransaction = () => {
        this.props.history.push('/Transactions');
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Login"
                    />
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center">

                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <div>
                            <RaisedButton label="Submit" primary={true} style={style}
                                          onClick={(event) => this.handleClick(event)}/>
                            <RaisedButton label="Sign Up" primary={true} style={style}
                                          onClick={this.goToRegister}/>


                        </div>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default withRouter(Login);