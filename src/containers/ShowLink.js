import React from "react";
import Clipboard from 'react-clipboard.js';
import { useLocation } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import config from "../config";
// import LoaderButton from "../components/LoaderButton";
// import { onError } from "../libs/errorLib";
import "./ShowLink.css";

// class MyView extends Component {
//   render() {
//     return (
//       // <Clipboard data-clipboard-text="I'll be copied">
//       //   copy to clipboard
//       // </Clipboard>

//       <Clipboard data-clipboard-target="#secretLink">
//         Copy
//       </Clipboard>
//     );
//   }
// }

export default function ShowLink(props) {
    // console.log(`debug: ShowLink: Props: ${}, ${props.passphrase}`);
    let location = useLocation();
    // console.log(`debug: ShowLink: Props:  ${location.state.id}, ${location.state.passphrase}`);

  return (  
    <div className="ShowLink">
      
      <form>
        {/* <LinkContainer key={1} to={`/secret/${location.state.id}`}> */}


       
       
          <FormGroup controlId="secretLink">
          <ControlLabel>Link</ControlLabel>
            <FormControl
              value={`${config.BASE_URL}/secret/${location.state.id}`}
              type="text"
            />
          <Clipboard className="CopyButton" data-clipboard-target="#secretLink">Copy</Clipboard>
          </FormGroup>
        {/* </LinkContainer> */}
        <FormGroup controlId="passphrase">
        <ControlLabel>Passphrase</ControlLabel>
          <FormControl
            value={location.state.passphrase}
            type="text"
          />
          <Clipboard className="CopyButton" data-clipboard-target="#passphrase">Copy</Clipboard>
        </FormGroup>
       

      </form>
    </div>
  );
}