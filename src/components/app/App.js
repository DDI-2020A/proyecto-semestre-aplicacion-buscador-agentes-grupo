import React from 'react';
import './App.css';
import SignIn from '../sign/SignIn';
import SignUp from '../sign/SignUp';
import Home from './Home';
import {  } from "l";

/*ENRUTAMIENTO*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/Home" component={Home} />
          <Route exact path="/" component={SignIn} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignUp" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
