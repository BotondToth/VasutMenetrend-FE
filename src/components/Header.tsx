import React from 'react';
import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import { withStyles, WithStyles, createStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from '@material-ui/icons/Search';
import { compose } from "recompose";
import { withRouter } from "react-router"

const styles = theme =>
    createStyles({
        root: {
            position: "relative",
            width: "100%"
        },
        headerText: {
            position: "absolute",
            left: 0
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

interface State {
    search: string;
}

interface Props extends WithStyles<typeof styles> {
    history;
}

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

    render() {
        const { classes } = this.props;

        return <AppBar position="sticky">
            <Toolbar>
                <div className={classes.root}>
                    <Typography variant="h6" className={classes.headerText}>Vasútmenetrend</Typography>
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
    withStyles(styles, { withTheme: true })
)(Header);
