import React from 'react';
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, MenuItem, Select, FormControl, InputLabel, CircularProgress, Button, Typography } from '@material-ui/core';
import { closeDialog, DIALOG_TICKETING } from '../reducers/dialogs';
import { withStyles, WithStyles, createStyles } from "@material-ui/core";
import styled from 'styled-components';
import { compose } from "recompose";
import { getDiscounts } from '../api/discountApi';
import { PurchaseInfo, doPurchase } from '../api/purchaseApi';

const mapStateToProps = (store) => {
    return {
        dialogs: store.dialogs,
        user: store.user
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

    loadingDiscounts: boolean;
    discounts: any[];
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
            loading: false,
            loadingDiscounts: false,
            discounts: []
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
            const discountItem = this.state.discounts.find(x => x.id == this.selectedTicketType);
            const timetableID = this.props.dialogs.ticketData.id;

            const purchase: PurchaseInfo = {
                discount: discountItem.percentage,
                quantity: this.selectedNumber,
                timetableId: timetableID,
                userId: this.props.user.uid
            }

            doPurchase(purchase).then(x => {
                this.setState({
                    loading: false,
                    buying: true,
                    buyresult: x
                });
            });
        });
    }

    componentWillMount() {
        this.setState({
            loadingDiscounts: true,
            loading: false,
            buying: false
        }, () => {
            getDiscounts().then(data => {
                this.setState({
                    loadingDiscounts: false,
                    discounts: data
                })
                this.selectedTicketType = this.state.discounts[0].id;

                this.forceUpdate();
            })
        })
    }

    onEnter() {
        this.selectedNumber = 1;
        if (this.state.discounts != null && this.state.discounts.length > 0) {
            this.selectedTicketType = this.state.discounts[0].id;
        }
        this.setState({
            loading: false,
            buying: false
        });
    }

    getDiscountValue() {
        const discountItem = this.state.discounts.find(x => x.id == this.selectedTicketType);
        return (discountItem.percentage / 100.);
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

        return <Dialog open={this.props.dialogs.ticketOpen} onEnter={this.onEnter.bind(this)}>
            <DialogTitle className={classes.header}>Jegyvásárlás</DialogTitle>
            <BaseContent dividers>
                {
                    this.state.buying ?
                        (
                            this.state.loading ? null :
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
                                                this.forceUpdate();
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
                                            defaultValue={this.state.discounts.length > 0 ? this.state.discounts[0].id : 0}
                                            onChange={(event, value) => {
                                                this.selectedTicketType = event.target.value as any;
                                                this.forceUpdate();
                                            }}
                                        >
                                            {
                                                this.state.discounts.map((discount, index) => {
                                                    return <MenuItem key={index} value={discount.id}>{discount.title}</MenuItem>;
                                                })
                                            }
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
                                <Row>
                                    {
                                        this.props.dialogs.ticketData != null ?
                                        <Typography>Fizetendő: <b>{ this.props.dialogs.ticketData.ticket.firstClassPrice * this.selectedNumber * this.getDiscountValue() }Ft</b></Typography>
                                        : null
                                    }
                                </Row>
                            </TableWrapper >
                        )
                }
            </BaseContent>
            <DialogActions className={classes.footer}>
                {
                    (this.state.loading || this.state.loadingDiscounts) ?
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
