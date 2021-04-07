import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import authenticatedPage from "../components/AuthenticatedPage";
import stripeBillingPortalSession from "../libs/stripeBillingPortalSession";
import "./Settings.css";

function Settings() {
  return (
    <div className="Settings">
      <LinkContainer to="/settings/team">
        <LoaderButton block bsSize="large">
          Manage Team
        </LoaderButton>
      </LinkContainer>
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

export default authenticatedPage(Settings);
