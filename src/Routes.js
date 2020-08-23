import React from "react";
import { Route, Switch } from "react-router-dom";
//import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewSecret from "./containers/Home";
import ShowLink from "./containers/ShowLink";
import ShowSecret from "./containers/ShowSecret";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <NewSecret />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/showlink">
        <ShowLink />
      </Route>
      <Route exact path="/secret/:id">
        <ShowSecret />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}