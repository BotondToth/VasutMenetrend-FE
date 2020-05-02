import React from 'react';
import { Typography, Card, CardContent, TextField, Button, CircularProgress, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Divider } from '@material-ui/core';
import styled from 'styled-components';
import TrainCard from '../../TrainCard';
import queryString from "query-string";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as moment from 'moment';
import CategoryChips from "./CategoryChips";
import PriceRangeSlider from "./PriceRangeSlider";
import CityList from './CityList';

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
    priceRange: number[]
}

class SearchPage extends React.Component<Props, State> {
    fromInputRef;
    toInputRef;
    whenInputRef;

    constructor(props) {
        super(props);

        this.fromInputRef = React.createRef();
        this.toInputRef = React.createRef();
        this.whenInputRef = React.createRef();

        this.state = {
            loading: false,
            priceRange: [0, 100]
        }
    }

    parseParams(props) {
        return queryString.parse(props.location.search);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.handleSearch();
        }
    }

    handleSearch() {
        let params: string[] = [];
        if (this.toInputRef.current.value.length > 0) params.push(`to=${encodeURIComponent(this.toInputRef.current.value)}`);
        if (this.fromInputRef.current.value.length > 0) params.push(`from=${encodeURIComponent(this.fromInputRef.current.value)}`);
        if (this.whenInputRef.current.value.length > 0) params.push(`when=${encodeURIComponent(this.whenInputRef.current.value)}`);
        this.props.history.push(`/search?${params.join("&")}`);
    }

    componentDidMount() {
        this.fetchSearch();
    }

    componentDidUpdate(prevProps, prevState) {
        const oldParams = this.parseParams(prevProps);
        const params = this.parseParams(this.props);

        // :>
        let changed: boolean = false;
        if (oldParams.to !== params.to && this.toInputRef.current != null) {
            this.toInputRef.current.value = params.to ?? "";
            changed = true;
        }
        if (oldParams.from !== params.from && this.fromInputRef.current != null) {
            this.fromInputRef.current.value = params.from ?? "";
            changed = true;
        }
        if (oldParams.when !== params.when && this.whenInputRef.current != null) {
            this.whenInputRef.current.value = params.when ?? "";
            changed = true;
        }

        if (changed) {
            this.fetchSearch();
        }
    }

    async fetchSearch() {
        this.setState({ loading: true },
            () => {
                // TODO: Fetch
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 2000);
            });
    }

    renderContent() {
        if (this.state.loading) {
            return (
                <LoadingWrapper>
                    <CircularProgress />
                </LoadingWrapper>
            );
        }

        return (
            <React.Fragment>
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
                <TrainCard />
            </React.Fragment>
        );
    }

    render() {
        const params = this.parseParams(this.props);

        return (
            <PageWrapper>
                <LeftColumn>
                    <SearchSettingsContainer>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Keresés</Typography>
                                <SearchRow>
                                    <TextField fullWidth inputRef={this.fromInputRef} label="Honnan" defaultValue={params.from ?? ""} onKeyDown={this.handleKeyDown.bind(this)} />
                                </SearchRow>
                                <SearchRow>
                                    <TextField fullWidth inputRef={this.toInputRef} label="Hova" defaultValue={params.to ?? ""} onKeyDown={this.handleKeyDown.bind(this)} />
                                </SearchRow>
                                <SearchRow>
                                    <TextField
                                        fullWidth
                                        label="Mikor"
                                        type="datetime-local"
                                        defaultValue={params.when ?? moment.default().format("YYYY-MM-DDTHH:mm")}
                                        inputRef={this.whenInputRef}
                                        onKeyDown={this.handleKeyDown.bind(this)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </SearchRow>
                                <SearchButtonRow>
                                    <Button variant="contained" color="secondary" onClick={this.handleSearch.bind(this)}>Keresés</Button>
                                </SearchButtonRow>
                            </CardContent>
                        </Card>
                        <SpecialSearchPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Speciális keresés</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <FlexContainer>
                                    <FlexRow>
                                        <Typography style={{marginRight: "20px"}}>Ár </Typography>
                                        <PriceRangeSlider />
                                    </FlexRow>
                                    <DividerMargin><Divider/></DividerMargin>
                                    <FlexRow>
                                        <CategoryChips categories={["Elsőosztály", "Másodosztály", "Kutyabigyó"]} />
                                    </FlexRow>
                                    <DividerMargin><Divider/></DividerMargin>
                                    <FlexRow>
                                        <CityList />
                                    </FlexRow>
                                </FlexContainer>
                            </ExpansionPanelDetails>
                        </SpecialSearchPanel>
                    </SearchSettingsContainer>
                </LeftColumn>
                <MiddleColumn>
                    {this.renderContent()}
                </MiddleColumn>
                <RightColumn />
            </PageWrapper>
        );
    }
}

export default SearchPage;
