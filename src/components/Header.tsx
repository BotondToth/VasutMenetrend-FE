import React from 'react';
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from '@material-ui/icons/Search';
import { compose } from "recompose";
import { withRouter } from "react-router"
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogOutIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ChartIcon from '@material-ui/icons/InsertChart';
import { openDialog, DIALOG_LOGIN } from '../reducers/dialogs';
import { onUserLogout } from '../reducers/user';

const styles = theme =>
    createStyles({
        root: {
            position: "relative",
            width: "100%"
        },
        headerText: {
            position: "absolute",
            left: 0,
            color: "white"
        },
        loginButton: {
            position: "absolute",
            right: 0,
            color: "white",
            height: "100%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer"
        },
        search: {
            width: "600px",
            position: 'relative',
            margin: "0 auto",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            }
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        searchButton: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRoot: {
            color: 'inherit',
            width: "600px"
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        }
    })

const mapStateToProps = (store) => {
    return { 
        user: store.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openLogin: () => {
            dispatch(openDialog(DIALOG_LOGIN));
        },
        userLogout: () => {
            dispatch(onUserLogout());
        }
    };
};

interface State {
    search: string;
}

interface OwnProps extends WithStyles<typeof styles> {
    history;
}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
class Header extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        }
    }

    handleInputChange(e) {
        this.setState({
            search: e.target.value
        });
    }

    handleKeyDown(e) {
        if (e.keyCode === 13 && this.state.search.length > 0) {
            this.props.history.push(`/search?to=${encodeURIComponent(this.state.search)}`);
        }
    }

    handleUserClick() {
        if (this.props.user.token != null) {
            this.props.history.push(`/user`);
        } else {
            this.props.openLogin();
        }
    }

    handleUserLogout() {
        this.props.userLogout();
    }

    handleReports() {
        this.props.history.push(`/report`);
    }

    render() {
        const { classes } = this.props;

        const isLoggedIn = (this.props.user.token != null)

        return <AppBar position="sticky">
            <Toolbar>
                <div className={classes.root}>
                    <Link to="/">
                        <Typography variant="h6" className={classes.headerText}>Vasútmenetrend</Typography>
                    </Link>
                    <div className={classes.loginButton}>
                        <div onClick={this.handleUserClick.bind(this)}>
                            <AccountCircle />
                        </div>
                        {
                                isLoggedIn ?
                                <>
                                    <div onClick={this.handleReports.bind(this)}>
                                        <ChartIcon />
                                    </div>
                                    <div onClick={this.handleUserLogout.bind(this)}>
                                        <LogOutIcon />
                                    </div>
                                </>
                                : null
                        }
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder={"Hova szeretne utazni?"}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            onChange={this.handleInputChange.bind(this)}
                            onKeyDown={this.handleKeyDown.bind(this)}
                        />
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    }
}

export default compose(
    withRouter,
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(Header);
