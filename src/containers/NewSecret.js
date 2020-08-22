import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { GeneratePassPhrase, Encrypt, CreateHash } from "../libs/cryptoLib";
import config from "../config";
import "./NewSecret.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import Modal from './Modal';


export default function NewSecret() {
  const file = useRef(null);
  // const history = useHistory();
  let [secret, setSecret] = useState("");
  let [passphrase, setPassphrase] = useState(GeneratePassPhrase());
  let [expiry, setExpiry] = useState("");
  let [secretLink, setSecretLink] = useState('');
  let [showModal, setShowModal] = useState(false);
  const suggestedPassphrase =  GeneratePassPhrase();
  const defaultExpiry = config.DEFAULT_EXPIRY;

  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

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
      // todo, encrypt attaachment before uploading
      // const encryptedFile = Encrypt(file.current, passphrase);
      // const attachment = encryptedFile ? await s3Upload(file.current) : null;

      const attachment = file.current ? await s3Upload(file.current) : null;

      // attachment handling not yet implemented on backend
      const response = await createSecret({ secret, attachment });
      const { url } = response;
      setSecretLink(url);
      setShowModal(true);
      // history.push("/"); // display URL & Passphrase not yet implemented
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  // Todo, check if this is poor practice, passing secret & attachment into body
  function createSecret(body) {
   // If no passphrase entered generate one
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
    body.cipher = Encrypt(secret, passphrase);

    // Debug only
    // Find a way to set a debug switch which turns these on/off
    console.log(`debug: attachment : ${body.attachment}`);
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
      <Modal
        show={showModal}
        passphrase={passphrase}
        secretLink={secretLink}
        onCloseHandler={closeModal}
      />
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
            type="text"
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