import React from "react";
// import PropTypes from "prop-types";
// import queryString from "query-string";
// import { API } from "aws-amplify";
// import { useHistory } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { onError } from "../libs/errorLib";
// import config from "../config";
import stripeBillingPortalSession from "../libs/stripeBillingPortalSession";
import { useAppContext } from "../libs/contextLib";

import "./Success.css";

const Success = ({ prop1, prop2 }) => {
//  const history = useHistory();
  const { user } = useAppContext();
//  const queryParams = queryString.parse(window.location.search);
//  const sessionId = queryParams && queryParams.session_id;
  const email = user && user.attributes && user.attributes.email;

  return (
    <div className="checkout-success">
      <h2>All set! Thanks for signing up.</h2>
      <button
        className="btn btn-default"
        onClick={() => stripeBillingPortalSession(email)}
      >
        Manage Billing
      </button>
    </div>
  );
};

Success.propTypes = {};

export default Success;
