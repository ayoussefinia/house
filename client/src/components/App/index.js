import React, { Component } from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
  } from 'react-router-dom';
import Home from '../Home';
import * as routes from '../../constants/routes';
import Signup from '../Signup';
import Login from '../Login';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path={routes.HOME} component={() => <Home />} />
            <Route exact path={routes.SIGN_UP} component={() => <Signup />} />
            <Route exact path={routes.LOGIN} component={() => <Login />} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}
export default App;
