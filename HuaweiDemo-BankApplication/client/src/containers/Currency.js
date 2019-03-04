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

class Currency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        var currencyRows = [];
        this.getCurrency().then(({data}) => {
            for (key in  data.rates) {
                if ( data.rates.hasOwnProperty(key)) {
                    console.log(key + " = " + data.rates[key]);
                    currencyRows.push(this.createData(key, data.rates[key],  <div><Button variant="contained" href="#contained-buttons" style={{ marginRight: 5 }}>
                        Sell
                    </Button>
                        <Button variant="contained" href="#contained-buttons" >
                            Buy
                        </Button></div>));
                }
            }
            this.setState({data: currencyRows});
        })
    }

    async getCurrency() {
        let data = await axios.get('https://api.exchangeratesapi.io/latest?base=TRY');
        return data;

    }

    createData(cur, val, button) {
        id += 1;
        return {id, cur, val, button};
    }


    goToRegister = () => {
        this.props.history.push('/Register');
    }

    goToTransaction = () => {
        this.props.history.push('/Transactions');
    }

    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">#</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell align="right">{row.cur}</TableCell>
                                <TableCell align="right">{row.val}</TableCell>
                                <TableCell align="right">{row.button}</TableCell>
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

export default Currency;
