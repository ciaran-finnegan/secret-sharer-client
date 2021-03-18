import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import queryString from "query-string";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth, API } from "aws-amplify";
import { loadStripe } from "@stripe/stripe-js";
import config from "../config";

export default function Signup({ history }) {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });

  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated, setUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
      setUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleCreateCheckoutSession() {
    const queryParams = queryString.parse(window.location.search);
    const plan = (queryParams && queryParams.plan) || "free";

    if (plan !== "free") {
      const stripe = await loadStripe(config.STRIPE_KEY);
      const session = await API.post(
        "secret-sharer",
        "/create-checkout-session",
        {
          body: {
            redirectURL: config.BASE_URL,
            subscriptionName: plan,
            email: newUser && newUser.user && newUser.user.username, // NOTE: Email stored as username by Cognito.
          },
        }
      );

      console.log(session);

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        onError(result.error.message);
      }
    } else {
      history.push("/"); // TODO: How to handle this path for public?
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);

      await API.post("secret-sharer", "/create-stripe-customer", {
        body: {},
      });

      handleCreateCheckoutSession();

      // const userAttributes = await Auth.userAttributes();
      // TODO: Check if existing customer on Cognito user.
      // TODO: If not, create checkout session and redirect.
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <div className="Signup">
        <form onSubmit={handleConfirmationSubmit}>
          <FormGroup controlId="confirmationCode" bsSize="large">
            <ControlLabel>Confirmation Code</ControlLabel>
            <FormControl
              autoFocus
              type="tel"
              onChange={handleFieldChange}
              value={fields.confirmationCode}
            />
            <HelpBlock>Please check your email for the code.</HelpBlock>
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateConfirmationForm()}
          >
            Verify
          </LoaderButton>
        </form>
      </div>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="content-frame">
      <div className="Signup">
        {newUser === null ? renderForm() : renderConfirmationForm()}
      </div>
    </div>
  );
}
