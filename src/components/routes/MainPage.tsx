import React, {useEffect} from 'react';
import {Button, CardContent, Grid, Paper, Typography, Card} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getTimetables} from "../../actions/timetableAction";
import {selectTimetables} from "../../reducers/selectors/selectTimetables";
import TrainIcon from '@material-ui/icons/Train';
import {ReactComponent as CircleFillIcon} from "../../svg/circle_fill.svg";
import {ReactComponent as CircleLineIcon} from "../../svg/circle_outline.svg";
import styled from 'styled-components';
import {ContentRow, DataCenter, DataLeft, DataRight, IconSpace, TopSpacing} from "../TrainCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function MainPage() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const timetableState = useSelector(selectTimetables);

    useEffect(() => {
        dispatch(getTimetables());
    }, [dispatch]);


    const CardBase = styled(Card)`{
        width: 65%;
        margin-bottom: 15px;
        margin: auto;
    }`;

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {
                    timetableState.timetables.map(row => (
                        <Grid item xs={6}>
                            <CardBase elevation={2}>
                                <CardContent>
                                    <ContentRow>
                                        <TrainIcon style={{fontSize: "48px"}}/>
                                        <Typography variant="h6"
                                                    style={{display: "inline-block"}}>Gyorsvonat</Typography>
                                    </ContentRow>
                                    <ContentRow>
                                        <IconSpace><CircleFillIcon/></IconSpace>

                                        <IconSpace><CircleLineIcon/></IconSpace>
                                        <IconSpace><CircleLineIcon/></IconSpace>
                                        <IconSpace><CircleLineIcon/></IconSpace>

                                        <IconSpace><CircleFillIcon/></IconSpace>

                                        <IconSpace><CircleLineIcon/></IconSpace>
                                        <IconSpace><CircleLineIcon/></IconSpace>
                                        <IconSpace><CircleLineIcon/></IconSpace>

                                        <IconSpace><CircleFillIcon/></IconSpace>
                                    </ContentRow>
                                    <ContentRow>
                                        <DataLeft>
                                            <Typography variant="h6">Indul</Typography>
                                            <Typography variant="body1">{row.start.city}</Typography>
                                            <Typography variant="body1">{row.start.name}</Typography>
                                            <Typography variant="body1">{row.date}</Typography>
                                        </DataLeft>
                                        <DataCenter>
                                            <Typography variant="h6">Megállók</Typography>

                                        {
                                            row.stops.map(station => (
                                                <DataCenter>
                                                    <Typography variant="h6">{station.city}</Typography>
                                                    <Typography variant="body1">{station.name}</Typography>
                                                </DataCenter>
                                            ))
                                        }
                                        </DataCenter>

                                            <DataCenter>
                                            <Typography variant="h6">Érkezés</Typography>
                                            <Typography variant="h6">{row.end.city}</Typography>
                                            <Typography variant="body1">{row.end.name}</Typography>
                                            <Typography variant="body1">{row.date}</Typography>
                                        </DataCenter>
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
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

