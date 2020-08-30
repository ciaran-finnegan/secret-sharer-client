import React from "react";
import { Alert } from "react-bootstrap";
import "./StatusAlert.css";

export default function StatusAlert(props) {
  const showStatusAlert = props.showStatusAlert;
  const responseStatus = props.responseStatus;
  const statusMessage = props.statusMessage;
  // console.log(`debug: StatusAlert, showStatusAlert: ${showStatusAlert}`);
  if (showStatusAlert & responseStatus) {
    return <Alert bsStyle="success">{statusMessage}</Alert>;
  }
  if (showStatusAlert & !responseStatus) {
    return <Alert bsStyle="danger">{statusMessage}</Alert>;
  }
  return null;
}