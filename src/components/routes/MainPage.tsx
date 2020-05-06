import React, {useEffect} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {selectReports} from "../../reducers/selectors/reportsSelector";
import {getReports} from "../../actions/reportAction";

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
    const [trains, setTrains] = React.useState([]);
    const trainState = useSelector(selectReports);

    useEffect(() => {
        dispatch(getReports());
    }, [dispatch]);


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=12</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
            </Grid>
        </div>
    )
}

