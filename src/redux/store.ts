import { combineReducers, createStore } from "redux"

import { reducer as dialogReducer } from "./dialogs";

const reducers = combineReducers({
    dialogs: dialogReducer
});

export const store = createStore(reducers);