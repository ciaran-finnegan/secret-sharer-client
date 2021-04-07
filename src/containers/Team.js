import React from "react";
// import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import API from "@aws-amplify/api";
import InviteTeamMemberModal from "../components/InviteTeamMemberModal";
import { monthDayYearAtTime } from "../libs/dates";
import { onError } from "../libs/errorLib";

import "./Team.css";

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showInviteTeamMemberModal: false,
      invites: [
        {
          _id: "blah",
          firstName: "Maynard",
          lastName: "James-Keenan",
          emailAddress: "maynard@tool.com",
          role: "admin",
          invitedAt: "2021-04-06T23:19:40.678Z",
        },
      ],
    };
  }

  componentDidMount() {
    this.handleFetchInvites();
  }

  handleFetchInvites = async () => {
    // TODO - Ciaran - update GetSubscriptionStatus to return teamId and teamName
    // wip - REMOVE ME
    const teamId ="9f60262a-9fe2-4e8b-9a96-75e1ee1c030c";
    API.post("secret-sharer", "/invites/get", {
      body: {
        "teamId": teamId
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          invites: response?.items || [],
        });
      })
      .catch((error) => {
        console.log(`DEBUG: Home.js Error calling /getSubscriptionStatus API`);
        console.log(error);
        onError(error);
      });
  };

  render() {
    const { showInviteTeamMemberModal, invites } = this.state;

    return (
      <div className="Team">
        <header>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={() => this.setState({ showInviteTeamMemberModal: true })}
          >
            Invite Team Member
          </Button>
        </header>
        {invites?.length === 0 && (
          <div className="blank-state">
            <p>
              No invites invitations yet. To invite a new invites member, click
              the button above.
            </p>
          </div>
        )}
        {invites && invites.length > 0 && (
          <div className="responsive-table">
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Invited At</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invites.map(
                  ({
                    _id,
                    firstName,
                    lastName,
                    emailAddress,
                    role,
                    invitedAt,
                  }) => {
                    return (
                      <tr>
                        <td>{firstName}</td>
                        <td>{lastName}</td>
                        <td>{emailAddress}</td>
                        <td>{role}</td>
                        <td>{monthDayYearAtTime(invitedAt)}</td>
                        <td>
                          <Button bsStyle="primary">Resend</Button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
        <InviteTeamMemberModal
          show={showInviteTeamMemberModal}
          onSend={() => {
            this.handleFetchInvites();
          }}
          onHide={() => {
            this.setState({ showInviteTeamMemberModal: false });
          }}
        />
      </div>
    );
  }
}

Team.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default Team;
