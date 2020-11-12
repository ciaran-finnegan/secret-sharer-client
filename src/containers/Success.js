import React, { useEffect } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { API } from "aws-amplify";

const Success = ({ prop1, prop2 }) => {
  const queryParams = queryString.parse(window.location.search);
  const sessionId = queryParams && queryParams.session_id;

  async function handleGetStripeSession() {
    console.log({ sessionId });
    const stripeSession = await API.post("secret-sharer", "/checkout-session", {
      body: {
        sessionId,
      },
    });

    console.log(stripeSession);
  }

  handleGetStripeSession();

  return <div />;
};

Success.propTypes = {};

export default Success;
