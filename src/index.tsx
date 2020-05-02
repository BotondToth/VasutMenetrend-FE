import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import {State} from "./store";
import {storeConfig} from "./store/storeConfig";
import {createBrowserHistory} from "history";
import axios from 'axios'

const history = createBrowserHistory();

export const store = storeConfig(history, {} as State);

// https://material-ui.com/customization/color/#color-tool
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1e88e5',
		},
		secondary: indigo,
	},
})

axios.defaults.baseURL = 'http://localhost:8080';

ReactDOM.render(
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
