import React, { useState } from "react";
// import { Auth } from "aws-amplify";
// import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Contact.css";
//import setInputHeight from "../libs/setInputHeight";

export default function Contact() {
  //const history = useHistory();
 //  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    email: "",
    message: ""
  });


  const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }


  function validateForm() {
    return fields.name.length > 0 && fields.email.length > 0 && fields.message.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // not sure if this works, test..
      body: encode({ "form-name": "contact",...fields })
      
    })
      .then(() => alert("Your message has been submitted!"))
      .catch(error => onError(error));

    setIsLoading(false);
  };

  return (
    <div className="content-frame">
      <div className="contact">
      
      <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="name" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
      </form> 

        <form onSubmit={handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              autoFocus
              type="textbox"
              value={fields.name}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="message" bsSize="large">
            <ControlLabel>Message</ControlLabel>
            <FormControl
            value={fields.message}
            componentClass="textarea"
            placeholder="Your message"
            onChange={handleFieldChange}
          />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Submit
          </LoaderButton>
        </form>
      </div>
    </div>
  );
}
