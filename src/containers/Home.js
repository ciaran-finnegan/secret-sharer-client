import React, { useRef, useState } from "react";
// import ReactDOM from 'react-dom';
import "./Home.css";
import { useHistory } from "react-router-dom";
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { GeneratePassPhrase, Encrypt, CreateHash } from "../libs/cryptoLib";
import config from "../config";
import "./NewSecret.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
// import Modal from './Modal';







export default function NewSecret() {
  const file = useRef(null);
  const history = useHistory();
  let [secret, setSecret] = useState("");
  const [passphrase, setPassphrase] = useState(GeneratePassPhrase());
  const [expiry, setExpiry] = useState(config.DEFAULT_EXPIRY);
  // let [secretLink, setSecretLink] = useState('');
  // let [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // function closeModal() {
  //   setShowModal(false);
  // }

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
      const { id } = response;
    // setSecretLink(id);
     // setShowModal(true);
      setIsLoading(false);
      history.push({
        pathname: '/showlink',
        state: { id: id, passphrase: passphrase }     
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
    // console.log(`debug: attachment : ${body.attachment}`);
    // console.log(`debug: passphrase : ${passphrase}`);
    // console.log(`debug: expiry : ${expiry}`);
    // console.log(`debug: body : ${JSON.stringify(body)}`);

    return API.post("secret-sharer", "/putSecret", {
      body: body
    });
  }

  return (
    
    <Grid>
      <div className="Home"> 
      <Row className="show-grid">
        <Col md={6} mdPush={6}>
        <div className="NewSecret">
      {/* <Modal
        show={showModal}
        passphrase={passphrase}
        secretLink={secretLink}
        onCloseHandler={closeModal}
      /> */}
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="secret">
        {/* <ControlLabel>Secret</ControlLabel> */}
          <FormControl
            value={secret}
            componentClass="textarea"
            placeholder="Enter data to be encrypted here. We don't store your data or your passphrase"
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
                <option value="1">1 hour</option>
                <option value="1">12 hours</option>
                <option value="24">1 day</option>
                <option value="48">2 days</option>
                <option value="72">3 days</option>
            </FormControl>
        </FormGroup>

        {/* <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup> */}
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
        </Col>
        <Col md={6} mdPull={6}>
          <div className="lander">
          <h1>Shhh</h1>
          <p>Share confidential information securely with expiring links</p>
        </div>
        </Col>
      </Row> 
  
      </div>
    </Grid>
  );
}