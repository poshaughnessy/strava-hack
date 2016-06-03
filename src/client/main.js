import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {hashHistory} from 'react-router';
import reducers from './reducers';
import Root from './root.jsx';

const store = createStore(reducers);

render(
  <Provider store={store}>
    <Root store={store} history={hashHistory}/>
  </Provider>,
  document.getElementById('container')
);
