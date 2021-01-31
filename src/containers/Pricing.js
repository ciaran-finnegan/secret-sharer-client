import React from "react";
import "./Pricing.css";
import config from "../config";
import { loadStripe } from "@stripe/stripe-js";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";

// Use the Stripe public key
const stripePromise = loadStripe(config.STRIPE_KEY);

// async function handleSignupClick(subscriptionName) {
//   // Get Stripe.js instance
//   const stripe = await stripePromise;

//   const body = {
//     "subscriptionName": subscriptionName
//   };
//   console.log(`subscriptionName: ${subscriptionName}`);
//   // Todo, set users email here

//   // Call REST API to create the Checkout Session
//   const response = await API.post("secret-sharer", "/create-checkout-session", {
//     body: body,
//   });

//   const session = await response;

//   // When the customer clicks on the button, redirect them to Checkout.
//   const result = await stripe.redirectToCheckout({
//     sessionId: session.sessionId,
//   });

//   if (result.error) {
//     // If `redirectToCheckout` fails due to a browser or network
//     // error, display the localized error message to your customer
//     // using `result.error.message`.
//     onError(result.error.message);
//   }
// }

export default function Pricing() {
  const history = useHistory();

  const handleBusinessSignupClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    const body = {
      subscriptionName: "Business",
    };

    // Call backend to create the Checkout Session
    const session = await API.post(
      "secret-sharer",
      "/create-checkout-session",
      {
        body: body,
      }
    );

    // // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      onError(result.error.message);
    }
  };

  const handleEnterpriseSignupClick = async (event) => {
    // Get Stripe.js instance

    console.log("HELLO");
    // linting error
    // const stripe = await stripePromise;

    const body = {
      subscriptionName: "Enterprise",
    };

    // Call backend to create the Checkout Session
    const response = await API.post(
      "secret-sharer",
      "/create-checkout-session",
      {
        body: body,
      }
    );

    console.log("stripe session", response);

    // const session = await response;

    // // When the customer clicks on the button, redirect them to Checkout.
    // const result = await stripe.redirectToCheckout({
    //   sessionId: session.sessionId,
    // });

    // if (result.error) {
    //   // If `redirectToCheckout` fails due to a browser or network
    //   // error, display the localized error message to your customer
    //   // using `result.error.message`.
    //   onError(result.error.message);
    // }
  };

  return (
    <div className="pricing">
      <header>
        <h1>Shhh.link is free for personal use</h1>
        <p>
          {" "}
          Anonymous messages can be sent free of charge. Business and Enterprise
          subscriptions allow recepients to validate the e-mail address of the
          sender.
        </p>
      </header>
      <div className="pricing-table">
        <div className="pricing-table-option">
          <header>
            <h5>Free</h5>
          </header>
          <div className="price">
            <h2>Free</h2>
          </div>
          <div className="features">
            <ul>
              <li>
                <i className="fas fa-check" />{" "}
                <span>Perfect for personal use</span>
              </li>
              <li>
                <i className="fas fa-check" />{" "}
                <span>Anonymous messages only</span>
              </li>
              <li>
                <i className="fas fa-check" />{" "}
                <span>Rate limits may apply</span>
              </li>
            </ul>
          </div>
          <button onClick={() => history.push("/")}>Share a Secret</button>
        </div>
        <div className="pricing-table-option featured">
          <header>
            <h5>Business</h5>
          </header>
          <div className="price">
            <h2>
              $49.99<span>/month</span>
            </h2>
          </div>
          <div className="features">
            <ul>
              <li>
                <i className="fas fa-check" /> <span>50 users</span>
              </li>
              <li>
                <i className="fas fa-check" />{" "}
                <span>5000 messages per day</span>
              </li>
              <li>
                <i className="fas fa-check" /> <span>Custom subdomain</span>
              </li>
            </ul>
          </div>
          <button
            role="link"
            onClick={
              //handleSignupClick("Business")
              handleBusinessSignupClick
            }
          >
            Sign Up Now
          </button>
        </div>
        <div className="pricing-table-option">
          <header>
            <h5>Enterprise</h5>
          </header>
          <div className="price">
            <h2>
              $149.99<span>/month</span>
            </h2>
          </div>
          <div className="features">
            <ul>
              <li>
                <i className="fas fa-check" /> <span>Unlimited Users</span>
              </li>
              <li>
                <i className="fas fa-check" /> <span>Unlimited Messages</span>
              </li>
              <li>
                <i className="fas fa-check" /> <span>Custom domain</span>
              </li>
              {/* <li>
                  <i className="fas fa-check" /> <span>Custom subdomain</span>
                </li> */}
            </ul>
          </div>
          <button role="link" onClick={handleEnterpriseSignupClick}>
            Sign Up Now
          </button>
        </div>
      </div>
      <div className="pricing-customizations">
        <header>
          <h2>Additional Customisations</h2>
          <p>
            Customisations are available for paid plans for an additional fee.{" "}
            <a href="/contact">Contact us</a> to learn more.
          </p>
        </header>
        <ul>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>Federated user authentication</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>REST API</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>Data Sovereignty, choose AWS Region</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>Customised hosting,BYO AWS account</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>Security assessments</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>Penetration testing</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>Source code reviews</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>Audit logging</span>
          </li>
          <li>
            <div onClick={() => history.push("/contact")}>
              <i className="fas fa-plus" />
            </div>
            <span>SOC II reports</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
