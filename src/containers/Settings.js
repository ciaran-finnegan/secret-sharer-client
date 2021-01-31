import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import stripeBillingPortalSession from "../libs/stripeBillingPortalSession";
import "./Settings.css";

export default function Settings() {
  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
        <LoaderButton block bsSize="large">
          Change Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/password">
        <LoaderButton block bsSize="large">
          Change Password
        </LoaderButton>
      </LinkContainer>
      <hr />
      <Button onClick={() => stripeBillingPortalSession()} block bsSize="large">
        Manage Billing
      </Button>
    </div>
  );
}
