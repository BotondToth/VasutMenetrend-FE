import * as reportsApi from "../api/reportApi";
import {Thunk} from "../store";

export enum TrainActionTypes {
    getTrainsSuccess = '[Reports] Get reports success',
    getTrainsError = '[Reports] Get reports error'
}

export const getTrains = (): Thunk => (dispatch): object => {
    return reportsApi.getReports()
        .then(res => {
            dispatch({ type: TrainActionTypes.getTrainsSuccess, payload: res });
            return res;
        })
        .catch(() => {
            dispatch({ type: TrainActionTypes.getTrainsError });
            return null;
        })
};