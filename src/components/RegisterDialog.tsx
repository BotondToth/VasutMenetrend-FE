import React from 'react';
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, CircularProgress } from '@material-ui/core';
import { closeDialog, DIALOG_LOGIN, DIALOG_REGISTER, openDialog } from '../reducers/dialogs';
import { withStyles, WithStyles, createStyles } from "@material-ui/core";
import styled from 'styled-components';
import { compose } from "recompose";
import { RegisterUser } from "../models/AuthUserResponse";
import {register} from "../api/authApi";
import { Alert } from '@material-ui/lab';

const mapStateToProps = (store) => {
    return {
        dialogs: store.dialogs
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeRegister: () => {
            dispatch(closeDialog(DIALOG_REGISTER));
        },
        openLogin: () => {
            dispatch(closeDialog(DIALOG_REGISTER));
            dispatch(openDialog(DIALOG_LOGIN));
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
    loading: boolean,
    registrationFailed: boolean
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & WithStyles<typeof styles>
class RegisterDialog extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            registrationFailed: false
        }
    }

    handleClose() {
        this.props.closeRegister();
    }

    handleLogin() {
        this.props.openLogin();
    }

    handleRegister() {
        this.setState({
            loading: true
        });
        // @ts-ignore
        const usernameValue = document.getElementById('username').value;
        // @ts-ignore
        const passwordValue = document.getElementById('password').value;
        // @ts-ignore
        const emailValue = !!document.getElementById('email').value;
        // @ts-ignore
        const nameValue = document.getElementById('name').value;

        const user = {
            username: usernameValue ? usernameValue : "",
            password: passwordValue ? passwordValue : "",
            email: emailValue ? emailValue : "",
            name: nameValue ? nameValue : ""
        } as RegisterUser;

        register(user).then(res => {
                this.setState({
                    loading: false,
                    registrationFailed: res !== 200
                });
                this.handleClose();
            }
        );

    }

    render() {
        const { classes } = this.props;

        return this.state.registrationFailed ?
            (
                <Alert severity="error">A regisztráció nem sikerült, kérem próbálja újra!</Alert>
            )
            :

            (<Dialog open={this.props.dialogs.registerOpen} onBackdropClick={this.handleClose.bind(this)}>
            <DialogTitle className={classes.header}>Regisztráció</DialogTitle>
            <BaseContent dividers>
                <TableWrapper>
                    <Row>
                        <TextField id="email" className={classes.input} fullWidth label="Email cím" />
                    </Row>
                    <Row>
                        <TextField id="name" className={classes.input} fullWidth label="Név" />
                    </Row>
                    <Row>
                        <TextField id="username" className={classes.input} fullWidth label="Felhasználó név" />
                    </Row>
                    <Row>
                        <TextField id="password" className={classes.input} fullWidth label="Jelszó" />
                    </Row>
                </TableWrapper>
            </BaseContent>
            <DialogActions className={classes.footer} >
                {
                    this.state.loading ?
                        (
                            <CircularProgress />
                        )
                        :
                        (
                            <React.Fragment>
                                <Button variant="contained" color="secondary" onClick={this.handleRegister.bind(this)}>
                                    Regisztráció
                </Button>
                                <Typography variant="body2" className={classes.regText} onClick={this.handleLogin.bind(this)}>
                                    <u>Inkább bejelentkezek</u>
                                </Typography>
                            </React.Fragment>
                        )
                }
            </DialogActions>
        </Dialog>);
    }
};

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(RegisterDialog);
