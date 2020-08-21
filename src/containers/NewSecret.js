import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { GeneratePassPhrase, EncryptString, CreateHash } from "../libs/cryptoLib";
import config from "../config";
import "./NewSecret.css";
import { API } from "aws-amplify";


export default function NewSecret() {
  const file = useRef(null);
  const history = useHistory();
  const [secret, setSecret] = useState("");
  let [passphrase, setPassphrase] = useState("");
  let [expiry, setExpiry] = useState("");
  const suggestedPassphrase =  GeneratePassPhrase();
  const defaultExpiry = config.DEFAULT_EXPIRY;

  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return secret.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }


  async function handleSubmit(event) {
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      await createSecret({ secret });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  function createSecret(body) {
   // If not passphrase entered generate one
   // Todo, render this value in the form
    if (passphrase === "" ) {
        passphrase = suggestedPassphrase;
    }
    // Todo, set this default value in the form
    // right now, it only sets if the onChange event fires
    if (expiry === "" ) {
        expiry = defaultExpiry;
    }
    
    // Remove the secret from the body object before we send to the putSecret RESTful API
    delete body.secret;

    // Add items to body object to send to putSecret RESTful API 
    body.expiry = expiry;
    body.hash = CreateHash(passphrase);
    body.cipher = EncryptString(secret, passphrase);

    // Debug only
    // Find a way to set a debug switch which turns these on/off
    console.log(`debug: passphrase : ${passphrase}`);
    console.log(`debug: suggestedPassphrase : ${suggestedPassphrase}`);
    console.log(`debug: expiry : ${expiry}`);
    console.log(`debug: body : ${JSON.stringify(body)}`);

    return API.post("secret-sharer", "/putSecret", {
      body: body
    });
  }

  return (  
    <div className="NewSecret">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="secret">
        <ControlLabel>Secret</ControlLabel>
          <FormControl
            value={secret}
            componentClass="textarea"
            placeholder="Message to be encrypted"
            onChange={e => setSecret(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="passphrase">
        <ControlLabel>Passphrase</ControlLabel>
          <FormControl
            value={passphrase}
            type="password"
            placeholder="Enter a complex passphrase with at least 10 characters"
            onChange={e => setPassphrase(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="expiry">
            <ControlLabel>Expires in</ControlLabel>
            <FormControl
            value={expiry}
            componentClass="select"
            onChange={e => setExpiry(e.target.value)}
                >
                <option value="72">3 days</option>
                <option value="48">2 days</option>
                <option value="24">1 day</option>
            </FormControl>
        </FormGroup>

        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}