import React from 'react';
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, CircularProgress } from '@material-ui/core';
import { closeDialog, DIALOG_LOGIN, openDialog, DIALOG_REGISTER } from '../reducers/dialogs';
import { withStyles, WithStyles, createStyles } from "@material-ui/core";
import styled from 'styled-components';
import { compose } from "recompose";
import {getToken} from "../actions/authActions";
import {AuthUser} from "../models/AuthUserResponse";

const mapStateToProps = (store) => {
    return {
        dialogs: store.dialogs
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeLogin: () => {
            dispatch(closeDialog(DIALOG_LOGIN));
        },
        openRegister: () => {
            dispatch(closeDialog(DIALOG_LOGIN));
            dispatch(openDialog(DIALOG_REGISTER));
        }
    };
};

const styles = theme =>
    createStyles({
        header: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
        },
        footer: {
            color: theme.palette.common.black,
            display: "flex",
            flexFlow: "column",
            justifyContent: "center"
        },
        regText: {
            marginLeft: "0 !important",
            marginTop: "10px",
            cursor: "pointer",
            color: "black"
        },
        input: {
            marginBottom: "10px"
        }
    });

const BaseContent = styled(DialogContent)`{
    min-width: 300px;
    margin-bottom: 20px;
}`;

const TableWrapper = styled.div`{
    display: flex;
    width: 100%;
    flex-flow: column;
}`;

const Row = styled.div`{
    display: flex;
    flex-flow: row;
}`;

interface State {
    loading: boolean
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & WithStyles<typeof styles>
class LoginDialog extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    handleClose() {
        this.props.closeLogin();
    }

    async handleLogin() {
        this.setState({
            loading: true
        });
        // @ts-ignore
        const usernameValue = document.getElementById('username').value;
        // @ts-ignore
        const passwordValue = document.getElementById('password').value;
        const user = {
            username: usernameValue ? usernameValue : "",
            password: passwordValue ? passwordValue : ""
        } as AuthUser;
        getToken(user).then(res => {
                this.setState({
                    loading: false
                });
                this.handleClose()
            }
        );
        //localStorage.getItem('token')
    }

    handleRegister() {
        this.props.openRegister();
    }

    render() {
        const { classes } = this.props;

        return <Dialog open={this.props.dialogs.loginOpen} onBackdropClick={this.handleClose.bind(this)}>
            <DialogTitle className={classes.header}>Bejelentkezés</DialogTitle>
            <BaseContent dividers>
                <TableWrapper>
                    <Row>
                        <TextField id="username" className={classes.input} fullWidth label="Felhasználónév" />
                    </Row>
                    <Row>
                        <TextField id="password" className={classes.input} fullWidth label="Jelszó" />
                    </Row>
                </TableWrapper>
            </BaseContent>
            <DialogActions className={classes.footer}>
                {
                    this.state.loading ?
                        (
                            <CircularProgress />
                        )
                        :
                        (
                            <React.Fragment>
                                <Button variant="contained" color="secondary" onClick={this.handleLogin.bind(this)}>
                                    Bejelentkezés
                                </Button>
                                <Typography variant="body2" className={classes.regText} onClick={this.handleRegister.bind(this)}>
                                    <u>Nincs felhasználóm</u>
                                </Typography>
                            </React.Fragment>
                        )
                }
            </DialogActions>
        </Dialog>;
    }
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginDialog);
