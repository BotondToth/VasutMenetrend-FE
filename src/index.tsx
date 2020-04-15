import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { store } from "./redux/store";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

// https://material-ui.com/customization/color/#color-tool
export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#1e88e5',
		},
		secondary: indigo,
	},
})

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
