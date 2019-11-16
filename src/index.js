import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import theme from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
