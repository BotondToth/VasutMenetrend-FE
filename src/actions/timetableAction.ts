import * as timetablesApi from "../api/timetableApi";
import {Thunk} from "../store";

export enum TimetableActionTypes {
    getTimetablesSuccess = '[Timetables] Get reports success',
    getTimetablesError = '[Timetables] Get reports error'
}

export const getTimetables = (): Thunk => (dispatch): object => {
    return timetablesApi.getTimeTables()
        .then(res => {
            dispatch({ type: TimetableActionTypes.getTimetablesSuccess, payload: res });
            return res;
        })
        .catch(() => {
            dispatch({ type: TimetableActionTypes.getTimetablesError });
            return null;
        })
};