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

  const [shareMenuItem, setShareMenuItem]  =  useState();
  const [shareMenuItemName, setShareMenuItemName]  =  useState();
  const [link, setLink] = useState(
    `${config.BASE_URL}/secret/${location.state.id}`
  );
  // Must use setLink to prevent linter error
  if (null) setLink (`${config.BASE_URL}/secret/${location.state.id}`);

  const [passphrase, setPassphrase] = useState(location.state.passphrase);
  // Must use setPassphrase to prevent linter error
  if (null) setPassphrase (location.state.passphrase);

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [confirmationText, setConfirmationText] = useState(null);
  // console.log(`debug: ShowLink: Props: ${}, ${props.passphrase}`);
  // console.log(`debug: ShowLink: Props:  ${location.state.id}, ${location.state.passphrase}`);
  
  

  const handleShareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          url: link,
          text: "",
          title: "Shhh Link",
          files: []
        })
        .then((something, maybe) => console.log(`debug: navigator returns: ${something}, ${maybe}`))
        .catch((error) => console.log("debug: Navigator Share failed: ", error));
    } else {
      setShareMenuItem(link);
      setShareMenuItemName("Link");
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleSharePassphrase = () => {
    if (navigator.share) {
      navigator
        .share({
          url: "",
          text: `Your passphrase is: ${passphrase}`,
          title: "Shhh Passphrase",
          files: []
        })
        .then((something, maybe) => console.log(something, maybe))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      setShareMenuItem(passphrase);
      setShareMenuItemName("Passphrase");
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

  // const handleCopyToClipboard = (copyItem) => {
  //   copyToClipboard(copyItem);
  //   handleDisplayConfirmation("Link copied to clipboard!");
  //   //setShowShareMenu(!showShareMenu);
  // };

  const handleCopyLinkToClipboard = () => {
    copyToClipboard(link);
    handleDisplayConfirmation(`Link copied to clipboard!`);
  }

  const handleCopyPassphraseToClipboard = () => {
    copyToClipboard(passphrase);
    handleDisplayConfirmation("Passphrase copied to clipboard!");
  };

  const handleShareViaEmail = () => {
    if (window) {
      window.open(
        `mailto:?subject=Shhh - you've been sent a secret sharing ${shareMenuItemName}&body=This is your ${shareMenuItemName}: ${shareMenuItem}`
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
            <InputGroup.Button bsStyle="default" onClick={handleShareLink}>
              <Button><Glyphicon glyph="share" /> Share</Button>  
            </InputGroup.Button>
            <InputGroup.Button onClick={handleCopyLinkToClipboard}>
              <Button><Glyphicon glyph="copy" /> Copy</Button>  
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        {/* </LinkContainer> */}
        <FormGroup controlId="passphrase">
          <ControlLabel>Passphrase</ControlLabel>
          <InputGroup>
            <FormControl value={location.state.passphrase} type="text" />
            <InputGroup.Button bsStyle="default" onClick={handleSharePassphrase}>
              <Button><Glyphicon glyph="share" /> Share</Button>  
            </InputGroup.Button>
            <InputGroup.Button onClick={handleCopyPassphraseToClipboard}>
              <Button><Glyphicon glyph="copy" /> Copy</Button>  
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
      <div className={`ShareMenu ${showShareMenu ? "is-displayed" : ""}`}>
        <div className="ShareMenu-content">
          <header>
            Share {shareMenuItemName}
          </header>
          <ul>
            {/* <li onClick={handleCopyToClipboard}>
              <div>
                <div className="copy">
                  <Glyphicon glyph="copy" />
                </div>
                <p>Copy</p>
              </div>
            </li> */}
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
