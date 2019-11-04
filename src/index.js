import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<div>This is a test</div>, document.getElementById('root'));

serviceWorker.unregister();
