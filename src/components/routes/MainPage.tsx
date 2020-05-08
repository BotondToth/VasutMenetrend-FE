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
import TrainCard, {ContentRow, DataCenter, DataLeft, DataRight, IconSpace, TopSpacing} from "../TrainCard";

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
                    timetableState.timetables.map((row, index) => (
                        <Grid item xs={6} key={index}>
                            <TrainCard train={row} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

