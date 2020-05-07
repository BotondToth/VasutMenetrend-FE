import React from 'react';
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, MenuItem, Select, FormControl, InputLabel, CircularProgress, Button, Typography } from '@material-ui/core';
import { closeDialog, DIALOG_TICKETING } from '../reducers/dialogs';
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
        closeDialog: () => {
            dispatch(closeDialog(DIALOG_TICKETING));
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
    margin-bottom: 12px;
}`;

const ActionWrapper = styled.div`{
    display: flex;
}`;
const ActionButtonWrapper = styled.div`{
    margin-left: 5px;
    margin-right: 5px;
}`;

interface State {
    buying: boolean;
    buyresult: boolean;
    loading: boolean;
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & WithStyles<typeof styles>
class BuyTicketDialog extends React.Component<Props, State> {
    selectedTicketType: any;
    selectedNumber: any;

    constructor(props) {
        super(props);

        this.selectedTicketType = 0;
        this.selectedNumber = 1;
        this.state = {
            buying: false,
            buyresult: false,
            loading: false
        }
    }

    doClose() {
        this.props.closeDialog();
    }

    doBuy() {
        this.setState({
            loading: true,
            buying: true
        }, () => {
            const buyData = {
                userToken: localStorage.getItem('token'),
                ticketId: this.props.dialogs.ticketData.ticketId,
                count: this.selectedNumber,
                discountType: this.selectedTicketType
            };

            // ... buy

            /*
            this.setState({
                    loading: false,
                    buying: true,
                    buyresult: true/false
            })
            */
        });
    }

    render() {
        const { classes } = this.props;

        const renderActions = () => {
            if (this.state.buying) {
                return <ActionButtonWrapper>
                    <Button variant="contained" color="secondary" onClick={this.doClose.bind(this)}>
                        Rendben
                    </Button>
                </ActionButtonWrapper>;
            }

            return <React.Fragment>
                <ActionButtonWrapper>
                    <Button variant="contained" color="secondary" onClick={this.doBuy.bind(this)}>
                        Vásárlás
                    </Button>
                </ActionButtonWrapper>
                <ActionButtonWrapper>
                    <Button variant="outlined" color="secondary" onClick={this.doClose.bind(this)}>
                        Mégse
                    </Button>
                </ActionButtonWrapper>
            </React.Fragment>;
        }

        return <Dialog open={this.props.dialogs.ticketOpen}>
            <DialogTitle className={classes.header}>Jegyvásárlás</DialogTitle>
            <BaseContent dividers>
                {
                    this.state.buying ?
                        (
                            <Typography>
                                {this.state.buyresult ? "Sikeres vásárlás!" : "Hiba!"}
                            </Typography>
                        )
                        :
                        (
                            <TableWrapper>
                                <Row>
                                    <FormControl fullWidth>
                                        <InputLabel id="number-type-text">Fizetés</InputLabel>
                                        <Select
                                            labelId="number-type-text"
                                            id="number-type"
                                            defaultValue={1}
                                            onChange={(event, value) => {
                                                this.selectedNumber = event.target.value as any;
                                            }}
                                        >
                                            <MenuItem value={1}>1db</MenuItem>
                                            <MenuItem value={2}>2db</MenuItem>
                                            <MenuItem value={3}>3db</MenuItem>
                                            <MenuItem value={4}>4db</MenuItem>
                                            <MenuItem value={5}>5db</MenuItem>
                                        </Select>
                                        <FormHelperText>Darabszám</FormHelperText>
                                    </FormControl>
                                </Row >
                                <Row>
                                    <FormControl fullWidth>
                                        <InputLabel id="ticket-type-text">Kedvezmény</InputLabel>
                                        <Select
                                            labelId="ticket-type-text"
                                            id="ticket-type"
                                            defaultValue={0}
                                            onChange={(event, value) => {
                                                this.selectedTicketType = event.target.value as any;
                                            }}
                                        >
                                            <MenuItem value={0}>
                                                <em>Nincs</em>
                                            </MenuItem>
                                            <MenuItem value={1}>Nyugdíjas</MenuItem>
                                            <MenuItem value={2}>Diák</MenuItem>
                                        </Select>
                                        <FormHelperText>Válasszon kedvezményt!</FormHelperText>
                                    </FormControl>
                                </Row>
                                <Row>
                                    <FormControl fullWidth>
                                        <InputLabel id="payment-type-text">Fizetés</InputLabel>
                                        <Select
                                            labelId="payment-type-text"
                                            id="payment-type"
                                            defaultValue={0}
                                        >
                                            <MenuItem value={0}>PayPali</MenuItem>
                                            <MenuItem value={1}>OTB</MenuItem>
                                            <MenuItem value={2}>Bitcoin</MenuItem>
                                        </Select>
                                        <FormHelperText>Fizetési módszer</FormHelperText>
                                    </FormControl>
                                </Row>
                            </TableWrapper >
                        )
                }
            </BaseContent>
            <DialogActions className={classes.footer}>
                {
                    this.state.loading ?
                        (
                            <CircularProgress />
                        )
                        :
                        (
                            <ActionWrapper>
                                {renderActions()}
                            </ActionWrapper>
                        )
                }
            </DialogActions>
        </Dialog >;
    }
}

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps)
)(BuyTicketDialog);
