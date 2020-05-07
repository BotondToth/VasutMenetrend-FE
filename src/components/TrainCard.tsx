import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';

import TrainIcon from '@material-ui/icons/Train';

import { ReactComponent as CircleFillIcon } from "../svg/circle_fill.svg";
import { ReactComponent as CircleLineIcon } from "../svg/circle_outline.svg";

const CardBase = styled(Card)`{
    width: 100%;
    margin-bottom: 15px;
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
    margin-top: 10px;
}`;

interface Props {
}

class TrainCard extends React.Component<Props> {
    render() {
        return (
            <CardBase elevation={2}>
                <CardContent>
                    <ContentRow>
                        <TrainIcon style={{fontSize: "48px"}} />
                        <Typography variant="h6" style={{display: "inline-block"}}>Gyorsvonat</Typography>
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
                            <Typography variant="body1">Budapest</Typography>
                            <Typography variant="body1">11:30</Typography>
                        </DataLeft>
                        <DataCenter>
                            <Typography variant="h6">Felszállás</Typography>
                            <Typography variant="body1">Kecskemét</Typography>
                            <Typography variant="body1">12:30</Typography>
                        </DataCenter>
                        <DataRight>
                            <Typography variant="h6">Érkezés</Typography>
                            <Typography variant="body1">Szeged</Typography>
                            <Typography variant="body1">13:30</Typography>
                        </DataRight>
                    </ContentRow>
                    <TopSpacing>
                        <ContentRow>
                            <DataRight>
                                <Button variant="outlined" color="secondary">Jegyvásárlás</Button>
                            </DataRight>
                        </ContentRow>
                    </TopSpacing>
                </CardContent>
            </CardBase>
        );
    }
}

export default TrainCard;
