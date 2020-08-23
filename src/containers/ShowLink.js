import React, { } from "react";
import { useLocation } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import config from "../config";
// import LoaderButton from "../components/LoaderButton";
// import { onError } from "../libs/errorLib";
import "./ShowLink.css";

export default function ShowLink(props) {
    // console.log(`debug: ShowLink: Props: ${}, ${props.passphrase}`);
    let location = useLocation();
    console.log(`debug: ShowLink: Props:  ${location.state.id}, ${location.state.passphrase}`);

  return (  
    <div className="ShowLink">
      
      <form>
        <LinkContainer key={1} to={`/secret/${location.state.id}`}>
          <FormGroup controlId="secretLink">
          <ControlLabel>Link</ControlLabel>
            <FormControl
              value={`${config.BASE_URL}/secret/${location.state.id}`}
              type="text"
            />
          </FormGroup>
        </LinkContainer>
        <FormGroup controlId="passphrase">
        <ControlLabel>Passphrase</ControlLabel>
          <FormControl
            value={location.state.passphrase}
            type="text"
          />
        </FormGroup>

      </form>
    </div>
  );
}