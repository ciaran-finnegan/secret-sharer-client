import React, { useState } from "react";
import Clipboard from "react-clipboard.js";
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
      setShowShareMenu(!showShareMenu);
      setTimeout(() => {
        setConfirmationText(null);
      }, 2000);
    }
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(link);
    handleDisplayConfirmation("Copied to clipboard!");
    setShowShareMenu(!showShareMenu);
  };

  const handleShareViaEmail = () => {
    if (window) {
      window.open(
        `mailto:example@test.com?subject=Shh link&body=I sent you a secret: ${link}`
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
            <InputGroup.Addon onClick={handleCopyToClipboard}>
              <Glyphicon glyph="copy" /> Copy
            </InputGroup.Addon>
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
            Share
          </Button>
        </FormGroup>
        {/* </LinkContainer> */}
        <FormGroup controlId="passphrase">
          <ControlLabel>Passphrase</ControlLabel>
          <FormControl value={location.state.passphrase} type="text" />
          <Clipboard className="CopyButton" data-clipboard-target="#passphrase">
            Share
          </Clipboard>
        </FormGroup>
      </form>
      <div className={`ShareMenu ${showShareMenu ? "is-displayed" : ""}`}>
        <div className="ShareMenu-content">
          <header>
            <h4>Share Secret</h4>
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
            <li>
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
            </li>
          </ul>
        </div>
      </div>
      <div className={`Confirmation ${confirmationText ? "is-displayed" : ""}`}>
        <Glyphicon glyph="check" /> {confirmationText}
      </div>
    </div>
  );
}
