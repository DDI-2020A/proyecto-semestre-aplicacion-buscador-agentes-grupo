import React from 'react';
import './App.css';
//custom
import SignIn from '../sign/SignIn';
import SignUp from '../sign/SignUp';
import Home from './Home';
import PrivateRoute from "../routing/PrivateRoute";
import LandingPage from '../landingpage/LandingPage';
import NavBar from '../routing/NavBar';

import { Provider } from "react-redux";
import { store } from '../../redux'

/*ENRUTAMIENTO*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PropertyForm from '../properties/PropertyForm';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <NavBar/>
          <Switch>
            <PrivateRoute path="/Home" component={Home} />
            <Route path="/SignIn" component={SignIn} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
