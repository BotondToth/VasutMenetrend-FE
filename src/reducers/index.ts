﻿import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import * as reports from './reportReducer'
import {History} from "history"

const reducers = {
    reports: reports.reducer
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createRootReducer = (history: History) => combineReducers({
    ...reducers,
    router: connectRouter(history)
});

/** Default export the reducer with empty object history */
export default createRootReducer({} as History);
