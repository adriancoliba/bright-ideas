import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import theme from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store/configureStore.js';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
