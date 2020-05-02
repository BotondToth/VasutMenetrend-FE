import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import rootReducer from "../reducers";

/**
 * Helper for getting the return type of combined reducers
 */
type StateType<ReducerOrMap> = ReducerOrMap extends (
    ...args: any[]
    ) => any
    ? ReturnType<ReducerOrMap>
    : ReducerOrMap extends object
        ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
        : never;

/**
 * The type representing the application's Redux state
 */
export type State = StateType<typeof rootReducer>;

/**
 * Simplify types for thunk actions, gives typing to getState() call.
 * Can be extended later
 */
export type Thunk = ThunkAction<void, State, void, Action>;
