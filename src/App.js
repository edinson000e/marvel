import React from "react";
import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Characteres from "./components/characters";
import history from "./store/browserHistory";
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={props => <Characteres {...props} />} />

        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
