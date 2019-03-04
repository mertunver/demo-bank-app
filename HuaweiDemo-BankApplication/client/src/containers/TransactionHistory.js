import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as React from "react";
import axios from "axios";
import {Component} from "react";
import Button from "@material-ui/core/es/Button";
import LoggedInUser from "./LoggedInUser";

let id = 0;
var key;

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class TransactionHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.getHistory();
    }


    getHistory() {
        var apiBaseUrl = "http://localhost:8080/transactionHistory";
        var historyRows = [];
        var self = this;
        var key;
        var payload = {
            "tcNo": LoggedInUser.getTcNo(),
        }
        axios.post(apiBaseUrl, payload).then(function (response) {
            console.log(response);
            if (response.status == 200) {
                for (key in  response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        console.log(key + " = " + response.data[key].operation);
                        historyRows.push(self.createData(response.data[key].operation));
                    }
                }
                self.setState({data: historyRows});
            } else if (response.status == 204) {
                console.log("Exception occured");
                alert("Exception occured")
            } else {
                console.log("Exception occured");
                alert("Exception occured");
            }
        })
            .catch(function (error) {
                alert("Exception occured no history found");
                console.log(error);
            });


    }

    createData(ops) {
        id += 1;
        return {id, ops};
    }


    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">History</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.ops}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

const style = {
    margin: 15,
};

export default TransactionHistory;
