import React from 'react';

import * as ReactDOM from "react-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from "axios";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import LoggedInUser from './LoggedInUser';
import Button from "@material-ui/core/Button";
import Transactions from "./Transactions"


export const NUMBER = /^[0-9]*$/;


class Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiverTC: '',
            amount: 0,
            errorTextTC: '',
            errorTextAmount: '',
            labelWidth: 0,
            currency: "TRY",
            errorAmount:false,
            errorTC:false,
            open:false,
            openDialog:false,
            dialogMessage:''

        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({currency: event.target.value});
    };


    onChangeTc(event) {
        if (!NUMBER.test(event.target.value.toString())) {
            this.setState({
                errorTextTC: 'Length should be 11 and numerical',
                errorTC:true,
                validationSucces: false
            })

        } else {
            this.setState({
                receiverTC: event.target.value.toString(),
                errorTC:false,
                errorTextTC: '', validationSucces: true
            })

        }
    }

    onChangeAmount(event) {
        if (!NUMBER.test(event.target.value.toString())) {
            this.setState({
                errorAmount:true,
                errorTextAmount: 'Amount should be numerical',
                validationSucces: false
            })

        } else {
            this.setState({
                errorAmount:false,
                amount: event.target.value.toString(),
                errorTextAmount: '', validationSucces: true
            })

        }
    }

    handleClose(event) {
        this.setState({openDialog: false});
    }
    handleClick(event){
        var apiBaseUrl = "http://localhost:8080/transfer";
        var self = this;
        var payload = {
            "receiverUserTC": this.state.receiverTC,
            "currentUserTC": LoggedInUser.getTcNo(),
            "amount": this.state.amount
        }
        var err = this.state.validationSucces;

        if (err) {
            axios.post(apiBaseUrl, payload)
                .then(function (response) {
                    console.log(response);
                    if (response.status == 200) {
                        console.log("transfer successfull");
                        LoggedInUser.setBalance(response.data.balance)
                        self.setState({openDialog:true,dialogMessage:"Successful Transfer !"});
                        //self.props.updateBalance( LoggedInUser.getBalance())
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    self.setState({openDialog:true,dialogMessage:error.response.data});
                });
        }
    }

    render() {
        return (
                <Grid container
                      direction="column"
                      justify="center"
                      alignItems="flex-start">
                    <div style={{width: 908}}>
                        <TextField
                            id="outlined-full-width"
                            label="Receiver TC"
                            style={{margin: 8}}
                            placeholder="Receiver TC"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            helperText={this.state.errorTextTC}
                            error={this.state.errorTC}
                            value={this.state.receiverTC}
                            onChange={this.onChangeTc.bind(this)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <Dialog
                        open={this.state.openDialog}
                        onClose={this.handleClose.bind(this)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    > <DialogTitle id="alert-dialog-title">{"Transfer Status"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.dialogMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose.bind(this)}>
                            Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <br/>
                    <div>
                        <FormControl variant="outlined" style={{margin: 8, width: 80}}>
                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-simple"
                            >
                            </InputLabel>
                            <Select
                                value={this.state.currency}
                                onChange={this.handleChange}
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="cur"
                                        id="outlined-age-simple"
                                    />
                                }
                            >
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>
                                <MenuItem value={"TRY"}>TRY</MenuItem>
                                <MenuItem value={"USD"}>USD</MenuItem>
                                <MenuItem value={"EUR"}>EUR</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-full-width"
                            label="Amount"
                            style={{margin: 8, width: 800}}
                            placeholder="Amount"
                            margin="normal"
                            variant="outlined"
                            error={this.state.errorAmount}
                            helperText={this.state.errorTextAmount}
                            value={this.state.amount}
                            onChange={this.onChangeAmount.bind(this)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div style={{width:900}}>
                    <Button fullWidth variant="contained" color="primary" style={{margin:8}} onClick={(event) => this.handleClick(event)}>
                        Send
                    </Button>
                    <br/>
                    </div>

                </Grid>


        );
    }
}

export default Transfer;
