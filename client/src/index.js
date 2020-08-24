import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import { StoreContext } from 'redux-react-hook';
import store from './store';


ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('root'));
