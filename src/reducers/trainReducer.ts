import {Train} from "../models/TrainResponse";
import {TrainActionTypes} from "../actions/trainAction";

interface TrainState {
    trains: Train[] | [],
    loading: boolean,
    error: null
}

const initialState = {
    trains: [],
    loading: false,
    error: null
};

export const reducer = (state: TrainState = initialState, action): TrainState => {
    switch (action.type) {
        case TrainActionTypes.getTrainsSuccess:
            return {
                ...state,
                loading: false,
                trains: action.payload
            };
        case TrainActionTypes.getTrainsError:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                trains: []
            };
        default:
            return state;
    }
};