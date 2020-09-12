import React, { useState } from "react";
//import Clipboard from "react-clipboard.js";
import { useLocation } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  InputGroup,
  ControlLabel,
  Glyphicon,
  Button,
} from "react-bootstrap";

// import { LinkContainer } from "react-router-bootstrap";
import config from "../config";
// import LoaderButton from "../components/LoaderButton";
// import { onError } from "../libs/errorLib";
import "./ShowLink.css";
import copyToClipboard from "../libs/copyToClipboard";

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
  let location = useLocation();
  const [link, setLink] = useState(
    `${config.BASE_URL}/secret/${location.state.id}`
  );
  // Must use setLink to prevent linter error
  if (null) setLink (`${config.BASE_URL}/secret/${location.state.id}`);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [confirmationText, setConfirmationText] = useState(null);
  // console.log(`debug: ShowLink: Props: ${}, ${props.passphrase}`);
  // console.log(`debug: ShowLink: Props:  ${location.state.id}, ${location.state.passphrase}`);
  
  

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shhh Link",
          text: link,
        })
        .then((something, maybe) => console.log(something, maybe))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleDisplayConfirmation = (message = "") => {
    if (message) {
      setConfirmationText(message);
      //setShowShareMenu(!showShareMenu);
      setTimeout(() => {
        setConfirmationText(null);
      }, 2000);
    }
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(link);
    handleDisplayConfirmation("Copied to clipboard!");
    //setShowShareMenu(!showShareMenu);
  };

  const handleShareViaEmail = () => {
    if (window) {
      window.open(
        `mailto:?subject=Shhh - you've been sent a secret sharing link&body=This is your link: ${link}`
      );
      setShowShareMenu(!showShareMenu);
    }
  };

  return (
    <div className="ShowLink">
      <form>
        {/* <LinkContainer key={1} to={`/secret/${location.state.id}`}> */}
        <FormGroup controlId="secretLink">
          <ControlLabel>Link</ControlLabel>
          <InputGroup>
            <FormControl value={link} type="text" />
            <InputGroup.Button onClick={handleCopyToClipboard}>
              <Button><Glyphicon glyph="copy" /> Copy</Button>  
            </InputGroup.Button>
          </InputGroup>
          {/* <Clipboard
            className="CopyButton"
            onClick={() =>
              !showShareMenu ? setShowShareMenu(true) : setShowShareMenu(false)
            }
          >
            Share
          </Clipboard> */}
          <Button bsStyle="default" onClick={handleShare}>
          <Glyphicon glyph="share" /> Share
          </Button>
        </FormGroup>
        {/* </LinkContainer> */}
        <FormGroup controlId="passphrase">
          <ControlLabel>Passphrase</ControlLabel>
          <InputGroup>
            <FormControl value={location.state.passphrase} type="text" />
            <InputGroup.Button onClick={handleCopyToClipboard}>
              <Button><Glyphicon glyph="copy" /> Copy</Button>  
            </InputGroup.Button>
          </InputGroup>
          <Button bsStyle="default" onClick={handleShare}>
          <Glyphicon glyph="share" /> Share
          </Button>
        </FormGroup>
      </form>
      <div className={`ShareMenu ${showShareMenu ? "is-displayed" : ""}`}>
        <div className="ShareMenu-content">
          <header>
            Share Secret
          </header>
          <ul>
            <li onClick={handleCopyToClipboard}>
              <div>
                <div className="copy">
                  <Glyphicon glyph="copy" />
                </div>
                <p>Copy</p>
              </div>
            </li>
            <li onClick={handleShareViaEmail}>
              <div>
                <div className="email">
                  <Glyphicon glyph="envelope" />
                </div>
                <p>Email</p>
              </div>
            </li>
            {/* <li>
              <div>
                <div className="copy">
                  <Glyphicon glyph="copy" />
                </div>
                <p>Copy</p>
              </div>
            </li>
            <li>
              <div>
                <div className="copy">
                  <Glyphicon glyph="copy" />
                </div>
                <p>Copy</p>
              </div>
            </li> */}
          </ul>
        </div>
      </div>
      <div className={`Confirmation ${confirmationText ? "is-displayed" : ""}`}>
        <Glyphicon glyph="check" /> {confirmationText}
      </div>
    </div>
  );
}
