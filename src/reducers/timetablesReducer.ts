import {TimeTable} from "../models/TimetableResponse";
import {TimetableActionTypes} from "../actions/timetableAction";

interface TimetableState {
    timetables: TimeTable[] | [],
    loading: boolean,
    error: null
}

const initialState = {
    timetables: [],
    loading: false,
    error: null
};

export const reducer = (state: TimetableState = initialState, action): TimetableState => {
    switch (action.type) {
        case TimetableActionTypes.getTimetablesSuccess:
            return {
                ...state,
                loading: false,
                timetables: action.payload
            };
        case TimetableActionTypes.getTimetablesError:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                timetables: []
            };
        default:
            return state;
    }
};