import {Redirect, Route} from "react-router";
import React, {Component} from "react";
import LoggedInUser from "./LoggedInUser";

class ProtectedRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props => (
                    LoggedInUser.getName() != "" ?
                        <Component {...props} /> :
                        <Redirect to='/' />
                )}
            />
        )
    }
}
export default ProtectedRoute;