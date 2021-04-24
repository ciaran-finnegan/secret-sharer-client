import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Label, FormGroup, Button } from "react-bootstrap";
import API from "@aws-amplify/api";

import "./AcceptInvite.css";

class AcceptInvite extends React.Component {
  state = {
    loading: true,
    invite: null,
  };

  componentDidMount() {
    const { match } = this.props;
    this.handleFetchInvite(match.params.inviteId);
  }

  handleFetchInvite = (inviteId = null) => {
    API.post("secret-sharer", "/invites/accept", {
      body: {
        inviteId,
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          invite: response?.invite,
        });
      })
      .catch((error) => {
        console.log(`DEBUG: Home.js Error calling /invites/accept API`);
        console.log(error);
      });
  };

  handleAcceptInvite = (inviteId = null) => {};

  render() {
    const { loading, invite, password } = this.state;
    const { match } = this.props;

    if (loading) return <div />;

    return (
      <div className="accept-invite">
        <Row>
          <Col xs={12} sm={6} smOffset={3}>
            <h4>Accept Invite</h4>
            <FormGroup>
              <Label>Email Address</Label>
              <input
                className="form-control"
                type="email"
                name="email"
                emailAddress="Email Address"
                placeholder="Email Address"
                disabled
                value={invite?.emailAddress}
              />
            </FormGroup>
            <Label>Password</Label>
            <FormGroup>
              <input
                className="form-control"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </FormGroup>
            <Button
              bsStyle="primary"
              type="button"
              block
              onClick={() => this.handleAcceptInvite(match?.props?.token)}
            >
              Accept Invite & Signup
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

AcceptInvite.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AcceptInvite;
