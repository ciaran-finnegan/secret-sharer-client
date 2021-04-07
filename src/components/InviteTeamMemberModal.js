import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ControlLabel } from "react-bootstrap";
import API from "@aws-amplify/api";
import { onError } from "../libs/errorLib";

const InviteTeamMemberModal = ({ className, show, onHide, onSend }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState("user");

  console.log(`TODO: Retrieve TeamId from getSubscriptionStatus`);
  const teamId = "9f60262a-9fe2-4e8b-9a96-75e1ee1c030c";
  console.log(`DEBUG: teamId: ${teamId}`);

  const handleSendInvite = (event) => {
    event.preventDefault();

    API.post("secret-sharer", "/invites/send", {
      body: {
        teamId,
        emailAddress,
        role,
      },
    })
      .then((response) => {
        if (onSend) onSend();
        if (onHide) onHide();
      })
      .catch((error) => {
        console.log(`DEBUG: Home.js Error calling /getSubscriptionStatus API`);
        console.log(error);
        onError(error);
      });
  };

  return (
    <Modal className={className} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Invite Team Member</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSendInvite}>
        <Modal.Body>
          <div className="form-group">
            <ControlLabel>Email Address</ControlLabel>
            <input
              className="form-control"
              type="text"
              name="emailAddress"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
            />
          </div>
          <ControlLabel>User Role</ControlLabel>
          <select
            className="form-control"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="default" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" bsStyle="success">
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

InviteTeamMemberModal.defaultProps = {
  className: null,
  title: null,
};

InviteTeamMemberModal.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default InviteTeamMemberModal;
