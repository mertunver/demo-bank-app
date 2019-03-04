import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from "prop-types";
import Currency from "./Currency";
import Transfer from "./Transfer";
import TransactionHistory from "./TransactionHistory";
import LoggedInUser from "./LoggedInUser";
import Button from "@material-ui/core/Button";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});



class Transactions extends React.Component {
    state = {
        value: 0,
        loggedUserBalance:0
    };

    componentDidMount() {
        this.setState({loggedUserBalance:LoggedInUser.getBalance()})
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    updateBalance(loggedUserBalance) {
        this.setState({ loggedUserBalance:loggedUserBalance })
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <NoSsr>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                            <LinkTab label="Currency" href="/Currency" />
                            <LinkTab label="Transfer" href="/Transfer" />
                            <LinkTab label="Transaction History" href="/TransactionHistory" />
                            <Button
                                disabled={true}
                                style={{ marginRight: 2}}
                            >
                                Current Balance:{this.state.loggedUserBalance} TRY
                            </Button>
                        </Tabs>

                    </AppBar>
                    {value === 0 && <TabContainer><Currency /></TabContainer>}
                    {value === 1 && <TabContainer><Transfer updateBalance={this.updateBalance} /></TabContainer>}
                    {value === 2 && <TabContainer><TransactionHistory/></TabContainer>}
                </div>
            </NoSsr>
        );
    }
}

Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Transactions);
