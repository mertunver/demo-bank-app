import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Router} from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Transactions from "./containers/Transactions";
import Currency from "./containers/Currency";
import Transfer from "./containers/Transfer";
import ProtectedRoute from "./containers/ProtectedRoute";
import TransactionHistory from "./containers/TransactionHistory";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: [],
            uploadScreen: []
        }
    }

    componentWillMount() {
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route path="/Register" component={Register}/>
                    <ProtectedRoute path="/Transactions" component={Transactions}/>
                    <ProtectedRoute path="/Currency" component={Currency}/>
                    <ProtectedRoute path="/Transfer" component={Transfer}/>
                    <ProtectedRoute path="/TransactionHistory" component={TransactionHistory}/>

                </div>

            </BrowserRouter>
        )
            ;
    }
}

const style = {
    margin: 15,
};
export default App;