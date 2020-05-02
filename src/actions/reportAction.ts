import * as reportsApi from "../api/reportApi";
import {Thunk} from "../store";

export enum ReportActionTypes {
    getReportsSuccess = '[Reports] Get reports success',
    getReportsError = '[Reports] Get reports error'
}

export const getReports = (): Thunk => (dispatch): object => {
    return reportsApi.getReports()
        .then(res => {
            dispatch({ type: ReportActionTypes.getReportsSuccess, payload: res });
            return res;
        })
        .catch(() => {
            dispatch({ type: ReportActionTypes.getReportsError });
            return null;
        })
};