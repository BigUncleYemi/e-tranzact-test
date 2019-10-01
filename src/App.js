import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Login from "./views/Login";
import {Link} from 'react-router-dom'
import { PrivateRoute } from "./PrivateRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import "./assets/css/index.css";

const App = () => (
  <Switch>
    <Route component={Login} exact path="/" />
    <PrivateRoute component={Profile} path="/profile" />
    <ProtectedRoute component={Dashboard} path="/dashboard" />
    <Route component={Register} path="/signup" />
    <Route
      render={() => (
        <div className="error404">
          <div className="err">
            <h1 className="display-1 text-ceneter" style={{fontSize: 180}}>404</h1>
            <h5 className="text-ceneter">No resource here</h5>
            <Link style={{color: "inherit"}} to="/">Go Home</Link>
          </div>
        </div>
      )}
    />
  </Switch>
);

export default App;
