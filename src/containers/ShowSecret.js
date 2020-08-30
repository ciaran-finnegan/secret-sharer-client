import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import StatusAlert from "../components/StatusAlert";
import { CreateHash, Decrypt } from "../libs/cryptoLib";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";

import "./ShowSecret.css";

export default function ShowSecret() {
  const { id } = useParams();
  // const history = useHistory();
  // const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStatusAlert, setShowStatusAlert] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [secret, setSecret] = useState("");
  const [responseStatus, setResponseStatus] = useState();
  const [statusMessage, setStatusMessage] = useState("");
  

  // useEffect(() => {
  //   function loadSecret() {
  //     return API.get("secret-sharer", `/${id}`);
  //   }

  //   async function onLoad() {
  //     try {
  //       const response = await loadNote();

  //       setResponse(response);
  //     } catch (e) {
  //       onError(e);
  //     }
  //   }

  //   onLoad();
  // }, [id]);

// function StatusAlert(props) {
//   const showStatusAlert = props.showStatusAlert;
//   console.log(`debug: StatusAlert, showStatusAlert: ${showStatusAlert}`);
//   if (showStatusAlert & responseStatus) {
//     return <Alert bsStyle="success">{statusMessage}</Alert>;
//   }
//   if (showStatusAlert & !responseStatus) {
//     return <Alert bsStyle="danger">{statusMessage}</Alert>;
//   }
//   return null;
// }  

function getSecret(body) {
  return API.post("secret-sharer", "/getsecret", {
  body: body
});

}

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
    setSecret("");

    try {
      console.log(`debug: showStatusAlert : ${showStatusAlert}`);
      const hash = CreateHash(passphrase);
      const response = await getSecret({ id, hash });
      const { cipher, status, message } = response;
      setSecret(Decrypt(cipher,passphrase));
      setIsLoading(false);
      setShowStatusAlert(true);
      setResponseStatus(status);
      setStatusMessage(message);



      // console.log(`debug: id : ${id}`);
      // console.log(`debug: status : ${status}`);
      // console.log(`debug: message : ${message}`);
      // console.log(`debug: showStatusAlert : ${showStatusAlert}`);
      // console.log(`debug: passphrase : ${passphrase}`);
      // console.log(`debug: hash : ${hash}`);
      // console.log(`debug: cipher : ${cipher}`);
      // console.log(`debug: secret : ${secret}`);
      // console.log (`debug: secret : ${Decrypt(cipher,passphrase)}`);
      
    
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (  
    <div className="ShowLink">
      
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="passphrase">
        <ControlLabel>Passphrase</ControlLabel>
          <FormControl
            value={passphrase}
            type="password"
            placeholder="Enter your passphrase"
            onChange={e => setPassphrase(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
        >
          Retrieve
        </LoaderButton>
        <FormGroup controlId="secret">
        <ControlLabel>Secret</ControlLabel>
          <FormControl
            value={secret}
            componentClass="textarea"
            placeholder="We're not telling yet"
            onChange={e => setSecret(e.target.value)}
          />
        </FormGroup>
        <StatusAlert
         showStatusAlert={showStatusAlert}
         responseStatus={responseStatus}
         statusMessage={statusMessage}
         />
      </form>
    </div>
    
  );
}