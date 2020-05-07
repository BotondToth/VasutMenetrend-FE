import React from 'react';
import { connect } from "react-redux";
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';

import TrainIcon from '@material-ui/icons/Train';
import TimeIcon from '@material-ui/icons/WatchLater';
import DistanceIcon from '@material-ui/icons/NearMe';
import MoneyIcon from '@material-ui/icons/AttachMoney';

import { ReactComponent as CircleFillIcon } from "../svg/circle_fill.svg";
import { ReactComponent as CircleLineIcon } from "../svg/circle_outline.svg";
import { ReactComponent as DoubleMoneyIcon } from "../svg/double_money.svg";
import { formatTime } from '../utils';
import { openDialog, DIALOG_TICKETING } from '../reducers/dialogs';

import * as moment from 'moment';

const CardBase = styled(Card)`{
    width: 100%;
    margin-bottom: 15px;
}`;

export const ButtonRow = styled.div`{
    display: flex;
    align-items: center;
    margin-top: 10px;
}`;
export const ContentRow = styled.div`{
    display: flex;
    align-items: center;
    height: 80px;
}`;
export const IconSpace = styled.div`{
    flex: 1 1 auto;
    text-align: center;
}`;

export const DataLeft = styled.div`{
    flex: 1 1 auto;
    text-align: left;
}`;
export const DataCenter = styled.div`{
    flex: 1 1 auto;
    text-align: center;
}`;
export const DataRight = styled.div`{
    flex: 1 1 auto;
    text-align: right;
}`;

export const TopSpacing = styled.div`{
    margin-top: 20px;
}`;

const Align = styled.div`{
    display: flex;
}`;

const IconContent = styled.div`{
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
}`;

const mapStateToProps = (store) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        openTicketDialog: (tid: string) => {
            dispatch(openDialog(DIALOG_TICKETING, {
                ticketId: tid
            }));
        }
    };
};

interface OwnProps {
    train: any;
    isTicket?: boolean;
    ticketInfo?: any;
}

const ticketTypes = [
    "",
    "(Nyugdíjas)",
    "(Diák)"
]

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
class TrainCard extends React.Component<Props> {
    buyTicket() {
        this.props.openTicketDialog(this.props.train.ticket.id);
    }

    render() {
        const { train } = this.props;
        const { start, end, stops, ticket, date, duration } = train;
        return (
            <CardBase elevation={2}>
                <CardContent>
                    <ContentRow>
                        <TrainIcon style={{ fontSize: "48px" }} />
                        <Typography variant="h6" style={{ display: "inline-block" }}>Vonat</Typography>
                    </ContentRow>
                    <ContentRow>
                        <IconSpace><CircleFillIcon /></IconSpace>

                        <IconSpace><CircleLineIcon /></IconSpace>
                        <IconSpace><CircleLineIcon /></IconSpace>
                        <IconSpace><CircleLineIcon /></IconSpace>

                        <IconSpace><CircleFillIcon /></IconSpace>

                        <IconSpace><CircleLineIcon /></IconSpace>
                        <IconSpace><CircleLineIcon /></IconSpace>
                        <IconSpace><CircleLineIcon /></IconSpace>

                        <IconSpace><CircleFillIcon /></IconSpace>
                    </ContentRow>
                    <ContentRow>
                        <DataLeft>
                            <Typography variant="h6">Indul</Typography>
                            <Typography variant="body1">{start.city}</Typography>
                            <Typography variant="body1">{start.name}</Typography>
                        </DataLeft>
                        {/*<DataCenter>
                            <Typography variant="h6">Felszállás</Typography>
                            <Typography variant="body1">?????????</Typography>
                        </DataCenter>*/}
                        <DataRight>
                            <Typography variant="h6">Érkezés</Typography>
                            <Typography variant="body1">{end.city}</Typography>
                            <Typography variant="body1">{end.name}</Typography>
                        </DataRight>
                    </ContentRow>
                    <TopSpacing>
                        <Align>
                            {
                                this.props.isTicket === true ?
                                    (
                                        <>
                                            <IconContent>
                                                <TimeIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{formatTime(duration)}</Typography>
                                            </IconContent>
                                            <IconContent>
                                                <DistanceIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{Math.ceil(parseInt(ticket.distance) / 1000)}km</Typography>
                                            </IconContent>
                                            <IconContent>
                                                <DoubleMoneyIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{this.props.ticketInfo.price}Ft {ticketTypes[this.props.ticketInfo.ticketType]}</Typography>
                                            </IconContent>
                                            <IconContent>
                                                <TimeIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{moment.default(this.props.ticketInfo.date).format("YYYY-MM-DD HH:mm")}</Typography>
                                            </IconContent>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <IconContent>
                                                <TimeIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{formatTime(duration)}</Typography>
                                            </IconContent>
                                            <IconContent>
                                                <DistanceIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{Math.ceil(parseInt(ticket.distance) / 1000)}km</Typography>
                                            </IconContent>
                                            <IconContent>
                                                <DoubleMoneyIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{ticket.firstClassPrice}Ft</Typography>
                                            </IconContent>
                                            <IconContent>
                                                <MoneyIcon style={{ display: "inline-block" }} />
                                                <Typography style={{ display: "inline-block" }}>{ticket.secondClassPrice}Ft</Typography>
                                            </IconContent>
                                        </>
                                    )
                            }
                        </Align>
                    </TopSpacing>
                    {
                        this.props.isTicket === true ?
                            null
                            :
                            (
                                <ButtonRow>
                                    <DataRight>
                                        <Button variant="outlined" color="secondary" onClick={this.buyTicket.bind(this)}>Jegyvásárlás</Button>
                                    </DataRight>
                                </ButtonRow>
                            )
                    }
                </CardContent>
            </CardBase>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainCard);
