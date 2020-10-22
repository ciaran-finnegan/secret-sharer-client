import React from "react";
import { Route, Switch } from "react-router-dom";
//import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewSecret from "./containers/Home";
import ShowLink from "./containers/ShowLink";
import ShowSecret from "./containers/ShowSecret";
import Privacy from "./containers/Privacy";
import Terms from "./containers/Terms";
import About from "./containers/About";
import Pricing from "./containers/Pricing";
import Contact from "./containers/Contact";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={NewSecret} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/showlink" component={ShowLink} />
      <Route exact path="/secret/:id" component={ShowSecret} />
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/about" component={About} />
      <Route exact path="/pricing" component={Pricing} />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
