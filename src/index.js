import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import rootReducer from './reducers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

let appStore = createStore(rootReducer);

ReactDOM.render(
  <Provider store={appStore}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
