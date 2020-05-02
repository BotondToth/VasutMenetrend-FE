import {State} from "./index";
import {routerMiddleware} from "connected-react-router";
import {createRootReducer} from "../reducers";
import {applyMiddleware, createStore} from "redux";
import logger from 'redux-logger'
import thunk from "redux-thunk";
import {History} from "history";
import {composeWithDevTools} from "redux-devtools-extension";

const middlewares = () => [thunk];

const configureStoreDev = (history: History, initialState: Partial<State>) => {

    const devMiddlewares = [
        ...middlewares(),
        logger,
        routerMiddleware(history)
    ];

    const rootReducer = createRootReducer(history);

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...devMiddlewares))
    );

    if ((module as any).hot) {
        (module as any).hot.accept('../reducers', () => store.replaceReducer(rootReducer))
    }

    return store;
};

export const storeConfig = configureStoreDev;
