import React from 'react';
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, CircularProgress } from '@material-ui/core';
import { closeDialog, DIALOG_LOGIN, DIALOG_REGISTER, openDialog } from '../redux/dialogs';
import { withStyles, WithStyles, createStyles } from "@material-ui/core";
import styled from 'styled-components';
import { compose } from "recompose";

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
    loading: boolean
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & WithStyles<typeof styles>
class RegisterDialog extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
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
        })
    }

    render() {
        const { classes } = this.props;

        return <Dialog open={this.props.dialogs.registerOpen} onBackdropClick={this.handleClose.bind(this)}>
            <DialogTitle className={classes.header}>Regisztráció</DialogTitle>
            <BaseContent dividers>
                <TableWrapper>
                    <Row>
                        <TextField className={classes.input} fullWidth label="Email cím" />
                    </Row>
                    <Row>
                        <TextField className={classes.input} fullWidth label="Név" />
                    </Row>
                    <Row>
                        <TextField className={classes.input} fullWidth label="Felhasználó név" />
                    </Row>
                    <Row>
                        <TextField className={classes.input} fullWidth label="Jelszó" />
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
        </Dialog>;
    }
};

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(RegisterDialog);
