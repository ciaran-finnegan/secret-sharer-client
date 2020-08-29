import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { CreateHash, Decrypt } from "../libs/cryptoLib";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import "./ShowSecret.css";

export default function ShowSecret() {
  const { id } = useParams();
  // const history = useHistory();
  // const [response, setResponse] = useState(null);
  const [passphrase, setPassphrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secret, setSecret] = useState("");

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
      
      const hash = CreateHash(passphrase);
      const response = await getSecret({ id, hash });
      const { cipher } = response;
      setSecret(Decrypt(cipher,passphrase));
      setIsLoading(false);

      console.log(`debug: id : ${id}`);
      console.log(`debug: passphrase : ${passphrase}`);
      console.log(`debug: hash : ${hash}`);
      console.log(`debug: cipher : ${cipher}`);
      console.log(`debug: secret : ${secret}`);
      console.log (`debug: secret : ${Decrypt(cipher,passphrase)}`);
    
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
          Get Secret
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

      </form>
    </div>
  );
}