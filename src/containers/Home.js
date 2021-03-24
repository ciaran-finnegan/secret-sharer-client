import React, { useRef, useState } from "react";
// import ReactDOM from 'react-dom';
import zxcvbn from "zxcvbn";
// import { Auth } from "aws-amplify";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { GeneratePassPhrase, Encrypt, CreateHash } from "../libs/cryptoLib";
import config from "../config";
import "./NewSecret.css";
import { s3Upload } from "../libs/awsLib";
import setInputHeight from "../libs/setInputHeight";
import stripeBillingPortalSession from "../libs/stripeBillingPortalSession";

// import { useAppContext } from "../libs/contextLib";
// import Modal from './Modal';

export default function NewSecret() {
  const file = useRef(null);
  const history = useHistory();
  const [secretsAvailable, setSecretsAvailable] = useState(9999);
  let [secret, setSecret] = useState("");
  // eslint-disable-next-line
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  // const [user, setUser] = useState(null);
  const [passphrase, setPassphrase] = useState(GeneratePassPhrase());
  // const { user } = useAppContext();
  const passphraseStrength = zxcvbn(passphrase);
  // const listSuggestions = passphraseStrength.feedback.suggestions.map(
  //   (suggestion) => <li>{suggestion}</li>
  // );
  const [expiry, setExpiry] = useState(config.DEFAULT_EXPIRY);
  // let [secretLink, setSecretLink] = useState('');
  // let [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // function closeModal() {
  //   setShowModal(false);
  // }

  // TO FIX - this isn't working - Ciaran 8th March 2021
  // if (isAuthenticated) {
  if (true) {
    console.log(`DEBUG: isAuthenticated ${isAuthenticated}`);

    API.post("secret-sharer", "/getSubscriptionStatus", {
      body: {},
    })
      .then((response) => {
        if (response && response.secretsAvailable) {
          setSecretsAvailable(response.secretsAvailable);
        }

        console.log({ response });
      })
      .catch((error) => {
        console.log(`DEBUG: Home.js Error calling /getSubscriptionStatus API`);
        console.log(error);
      });
  } else {
    console.log(`DEBUG: isAuthenticated ${isAuthenticated}`);
    console.log("DEBUG: did not call /getSubscriptionStatus");
  }

  function validateForm() {
    return secret.length > 0;
  }

  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      // todo, encrypt attaachment before uploading
      // const encryptedFile = Encrypt(file.current, passphrase);
      // const attachment = encryptedFile ? await s3Upload(file.current) : null;

      const attachment = file.current ? await s3Upload(file.current) : null;

      // attachment handling not yet implemented on backend
      const response = await createSecret({ secret, attachment });
      const { id } = response;
      // setSecretLink(id);
      // setShowModal(true);
      setIsLoading(false);
      history.push({
        pathname: "/showlink",
        state: { id: id, passphrase: passphrase },
      });
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  // Todo, check if this is poor practice, passing secret & attachment into body
  function createSecret(body) {
    // Remove the secret from the body object before we send to the putSecret RESTful API
    delete body.secret;

    // Add items to body object to send to putSecret RESTful API

    body.expiry = expiry;
    body.hash = CreateHash(passphrase);
    body.cipher = Encrypt(secret, passphrase);

    // Debug only
    // Find a way to set a debug switch which turns these on/off

    // console.log(`debug: passphrase.score : ${passphraseStrength.score}`);
    // console.log(`debug: attachment : ${body.attachment}`);
    // console.log(`debug: passphrase : ${passphrase}`);
    // console.log(`debug: expiry : ${expiry}`);
    // console.log(`debug: body : ${JSON.stringify(body)}`);

    return API.post("secret-sharer", "/putSecret", {
      body: body,
    });
  }

  return (
    <div className="content-frame">
      <form className="new-secret" onSubmit={handleSubmit}>
        {secretsAvailable === 0 && (
          <div className="no-secrets">
            <p className="no-secrets-warning">
              <i className="fas fa-exclamation-triangle" />
              <span>
                You've used all of the secrets for your current plan.{" "}
                <strong>Upgrade your plan to send more secrets</strong>.
              </span>
            </p>
            <Button
              bsStyle="success"
              block
              onClick={() => stripeBillingPortalSession()}
            >
              Upgrade Now
            </Button>
          </div>
        )}
        <FormGroup controlId="secret">
          <header className="text-to-encrypt">
            <ControlLabel>Text to Encrypt</ControlLabel>
            {/* <p>
              <strong>0 Secrets Available</strong> &mdash;{" "}
              <a href="/pricing">Upgrade Now</a>
            </p> */}
          </header>
          <FormControl
            disabled={secretsAvailable === 0}
            value={secret}
            componentClass="textarea"
            placeholder="Enter data to be encrypted here. We don't store your data or your passphrase"
            onChange={(e) => {
              setInputHeight(e.target, "100px");
              setSecret(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="passphrase">
          <ControlLabel>
            Passphrase <i className="fas fa-lock" />
          </ControlLabel>
          <FormControl
            disabled={secretsAvailable === 0}
            value={passphrase}
            type="text"
            placeholder="Enter a complex passphrase with at least 10 characters"
            onChange={(e) => {
              setPassphrase(e.target.value);
            }}
          />
        </FormGroup>
        <div className="passwordStrength">
          {passphraseStrength &&
            passphraseStrength.feedback &&
            passphraseStrength.feedback.warning && (
              <p>
                <i className="far fa-times" />{" "}
                {passphraseStrength.feedback.warning}{" "}
              </p>
            )}
          <ul>
            {passphraseStrength.feedback.suggestions.map((suggestion) => (
              <li>
                <i className="far fa-times" /> {suggestion}
              </li>
            ))}
          </ul>
        </div>
        <FormGroup controlId="expiry">
          <ControlLabel>Expires in</ControlLabel>
          <ButtonGroup className="clearfix">
            <Button
              disabled={secretsAvailable === 0}
              bsStyle={expiry === "1" ? "success" : "default"}
              onClick={() => setExpiry("1")}
            >
              1 Hour
            </Button>
            <Button
              disabled={secretsAvailable === 0}
              bsStyle={expiry === "12" ? "warning" : "default"}
              onClick={() => setExpiry("12")}
            >
              12 Hours
            </Button>
            <Button
              disabled={secretsAvailable === 0}
              bsStyle={expiry === "24" ? "warning" : "default"}
              onClick={() => setExpiry("24")}
            >
              1 Day
            </Button>
            <Button
              disabled={secretsAvailable === 0}
              bsStyle={expiry === "48" ? "danger" : "default"}
              onClick={() => setExpiry("48")}
            >
              2 Days
            </Button>
            <Button
              disabled={secretsAvailable === 0}
              bsStyle={expiry === "72" ? "danger" : "default"}
              onClick={() => setExpiry("72")}
            >
              3 Days
            </Button>
          </ButtonGroup>
        </FormGroup>
        <LoaderButton
          block
          disabled={secretsAvailable === 0}
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Encrypt Text
        </LoaderButton>
      </form>
    </div>
  );
}
