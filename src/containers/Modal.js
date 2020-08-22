import React from 'react';
import { FormGroup, Modal, FormControl, InputGroup, Button } from "react-bootstrap";

export default class Example extends React.Component {
  
render() {
    const { secretLink, passphrase, show, onCloseHandler } = this.props; 
    console.log('props: ', secretLink, passphrase, show, onCloseHandler)
    return (
    <Modal
        show={show}
        onHide={onCloseHandler}
        dialogClassName="custom-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
            Modal heading
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormGroup
            controlId="formBasicText"
            >
            <FormControl
                type="text"
                value={secretLink}
            />
        </FormGroup>
        <FormGroup
            controlId="formBasicText"
            >
            <FormControl
                type="text"
                value={passphrase}
            />
        </FormGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onCloseHandler}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}
}
  