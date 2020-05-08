import React from 'react';
import { connect } from "react-redux";
import { Typography, Card, CardContent, TextField, Button, CircularProgress, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as moment from 'moment';
import TrainCard from '../../TrainCard';
import { getUserInfo } from '../../../api/userApi';
import { getPurchases } from '../../../api/purchaseApi';

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

const mapStateToProps = (store) => {
    return { 
        user: store.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};


interface OwnProps {
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

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
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
        if (this.props.user.token == null) {
            this.props.history.push("/");
            return;
        }

        this.fetchData();
    }

    componentDidUpdate() {
        if (this.props.user.token == null) {
            this.props.history.push("/");
            return;
        }
    }

    async fetchData() {
        getUserInfo(this.props.user.token).then(data => {
            if (!data.ok) {
                this.props.history.push("/");
            } else {
                const userdata = data.data;
                this.setState({
                    loading: true,
                    userName: userdata.username,
                    realName: userdata.name,
                    email: userdata.email,
                    boughtTickets: [ ]
                });

                getPurchases(this.props.user.uid).then(res => {
                    if (res.ok) {
                        this.setState({
                            loading: false,
                            boughtTickets: res.data
                        })
                    } else {
                        this.setState({
                            loading: false,
                            boughtTickets: [ ]
                        })
                    }
                });
            }
        })
    }

    renderTicketList() {
        if (this.state.boughtTickets.length == 0) {
            return <div style={{ textAlign: "center" }}>
                <Typography>Nem vásárolt még jegyet!</Typography>
            </div>;
        }

        return <>
            {
                this.state.boughtTickets.map(ticket => {
                    return <TrainCard train={ticket.timetable} isTicket ticketInfo={ticket} />;
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
                                <Typography variant="h6" style={{ marginBottom: "10px" }}>Adatok</Typography>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
