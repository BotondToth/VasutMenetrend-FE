import React from 'react';
import { Typography, Card, CardContent, TextField, Button, CircularProgress, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as moment from 'moment';
import TrainCard from '../../TrainCard';

const PageWrapper = styled.div`{
    display: flex;
    margin-top: 10px;
}`;
const LeftColumn = styled.div`{
    flex: 1 1 auto;
    position: relative;
}`;
const MiddleColumn = styled.div`{
    flex: 0 0 600px;
}`;
const RightColumn = styled.div`{
    flex: 1 1 auto;
}`;

const SearchSettingsContainer = styled.div`{
    position: absolute;
    right: 0;
    padding-right: 20px;
    min-width: 300px;
}`;
const SearchRow = styled.div`{
    display: block;
    margin-bottom: 15px;
}`;
const SearchButtonRow = styled.div`{
    display: block;
    text-align: center;
}`;

const LoadingWrapper = styled.div`{
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}`;

const SpecialSearchPanel = styled(ExpansionPanel)`{
    margin-top: 20px;
}`;

const FlexContainer = styled.div`{
    display: flex;
    flex-flow: column;
    width: 100%;
}`;
const FlexRow = styled.div`{
    display: flex;
    flex-flow: row;
}`;

const DividerMargin = styled.div`{
    margin-top: 10px;
    margin-bottom: 10px;
}`;

interface Props {
    history;
    location;
}

interface State {
    loading: boolean;

    userName: string;
    realName: string;
    email: string;
    boughtTickets: any[];
}

class UserPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,

            userName: "",
            realName: "",
            email: "",
            boughtTickets: [
            ]
        }
    }

    componentDidMount() {
        if (localStorage.getItem("token") == null) {
            this.props.history.push("/");
            return;
        }

        this.fetchData();
    }

    async fetchData() {
        // ... fetch

        const exampleTrainData = `{"id":"5ea732d396d3e23afe678dea","start":{"id":"5ea2f71c8a9dee47416f1da6","postCode":1063,"name":"Nyugati Vasútállomás","city":"Budapest"},"end":{"id":"5ea2f7748a9dee47416f1da8","postCode":6724,"name":"Szegedi Vasútállomás","city":"Szeged"},"stops":[{"id":"5ea2f69a8a9dee47416f1da5","postCode":6900,"name":"Kecskemét vasútállomás","city":"Kecskemét"}],"train":{"id":"5e95e39789a3542554adca55","trainNum":"sz-001","limit":50},"ticket":{"id":"5ea46bf44b5e5039a13e8e29","distance":200,"firstClassPrice":10000,"secondClassPrice":6000,"bicyclePrice":500},"date":"2020-04-27T16:57:05.974Z","duration":120}`;
        this.setState({
            loading: false,
            userName: "USERNAME",
            realName: "REAL NAME",
            email: "xd@lol.asd",
            boughtTickets: [
                {
                    date: "2020-05-07T12:09",
                    price: "5555",
                    ticketType: 1,
                    train: JSON.parse(exampleTrainData)
                }
            ]
        })
    }

    renderTicketList() {
        if (this.state.boughtTickets.length == 0) {
            return <div style={{textAlign: "center"}}>
                <Typography>Nem vásárolt még jegyet!</Typography>
            </div>;
        }

        return <>
            {
                this.state.boughtTickets.map(x => {
                    return <TrainCard train={x.train} isTicket ticketInfo={x} />;
                })
            }
        </>;
    }

    render() {
        return (
            <PageWrapper>
                <LeftColumn>
                    <SearchSettingsContainer>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" style={{marginBottom: "10px"}}>Adatok</Typography>
                                {
                                    this.state.loading ?
                                        <LoadingWrapper>
                                            <CircularProgress />
                                        </LoadingWrapper>
                                        :
                                        (
                                            <>
                                                <Typography><b>Felhasználónév:</b> {this.state.userName}</Typography>
                                                <Typography><b>Név:</b> {this.state.realName}</Typography>
                                                <Typography><b>Email:</b> {this.state.email}</Typography>
                                            </>
                                        )
                                }
                            </CardContent>
                        </Card>
                    </SearchSettingsContainer>
                </LeftColumn>
                <MiddleColumn>
                    {
                        this.state.loading ?
                            <LoadingWrapper>
                                <CircularProgress />
                            </LoadingWrapper>
                            :
                            this.renderTicketList()
                    }
                </MiddleColumn>
                <RightColumn />
            </PageWrapper>
        );
    }
}

export default UserPage;
