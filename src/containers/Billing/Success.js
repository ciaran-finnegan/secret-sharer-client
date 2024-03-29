import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import BillingForm from "../components/BillingForm";
import { onError } from "../libs/errorLib";
import config from "../config";
import "./Settings.css";

export default function Success() {
  const history = useHistory();
  const [stripe, setStripe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
  }, []);


  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id
      });

      alert("Your card has been charged successfully!");
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Manage Billing">
      <LinkContainer to="/settings/email">
        <LoaderButton block bsSize="large">
          Manage Billing
        </LoaderButton>
      </LinkContainer>
      <hr />
    </div>
  );
}