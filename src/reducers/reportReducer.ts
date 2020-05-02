import {ReportActionTypes} from "../actions/reportAction";
import {ReportResponse} from "../models/ReportResponse";

interface ReportState {
    reports: ReportResponse[] | [],
    loading: boolean,
    error: null
}

const initialState = {
    reports: [],
    loading: false,
    error: null
};

export const reducer = (state: ReportState = initialState, action): ReportState => {
    switch (action.type) {
        case ReportActionTypes.getReportsSuccess:
            return {
                ...state,
                loading: false,
                reports: action.payload
            };
        case ReportActionTypes.getReportsError:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                reports: []
            };
        default:
            return state;
    }
};