import React, { Component, useCallback } from 'react';
import useWithAuthenticate from '../WithAuthenticate';
import { useMappedState } from 'redux-react-hook';
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
import Navigation from '../Navigation';

function App() {

  useWithAuthenticate();
  const mapState = useCallback((state) => ({
    loading: state.sessionState.loading
  }), [])

  const { loading } = useMappedState(mapState);
  
  if (loading) return <h1>Loading...</h1>

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
      <Navigation />
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
