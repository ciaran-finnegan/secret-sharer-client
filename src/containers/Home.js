import React from "react";
// import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import "./Home.css";

export default function Home() {
  const history = useHistory();
  const { isAuthenticated } = useAppContext();

  async function handleGetStartedClick() {
    // If user is Autheticated redirect to /share
    // If user is not Authenticated, redirect to /signup

    if (isAuthenticated) {
      // console.log(`DEBUG:: User is Authenticated, redirecting to share, ${isAuthenticated}`);
      history.push("/share");
    } else {
      // console.log(`DEBUG:: User has not authenticated, redirecting to signup, ${isAuthenticated}`);
      history.push("/signup");
    }
  }

  return (
    <div className="page-home">
      <header>
        <h1>Share confidential information securely with expiring links.</h1>
        <p>
          Bad actors often retrieve sensitive data from email archives stored in email or chat history 
        </p>
        <button 
        className="button"
        onClick={() => handleGetStartedClick()}
        >
          Get Started
          </button>
      </header>
      <section className="product">
        <div>
          <ul>
            <li>
              <h5>Add the text you'd like to encrypt.</h5>
              <p>
                Any secret that you'd like to share with someone else. For
                example, a new user's password, an API key, or any client's
                sensitive information.
              </p>
            </li>
            <li>
              <h5>Set a unique passphrase that only you know.</h5>
              <p>
                We'll use this to encrypt your text and keep your data private
                only to you and the people you share your passphrase with.
              </p>
            </li>
            <li>
              <h5>Set an expiration date for your secret for added security.</h5>
              <p>
                Ensure that your secret permanently vanishes after the date you
                set to prevent future security leaks.
              </p>
            </li>
          </ul>
          <div className="explainer">
            <p>
              <strong>Vanish never stores your data</strong> and has no way to
              access it. An encrypted cipher with no identifying information
              is all we store and this is purged from our systems on retrieval or expiry.
            </p>
          </div>
        </div>
        <div>
          <img src="/share-tool.png" alt="Share a Secret"/>
        </div>
      </section>
    </div>
  );

  }
// const Home = ({ prop1, prop2 }) => (
//   <div className="page-home">
//     <header>
//       <h1>Share confidential information securely with expiring links.</h1>
//       <p>
//         Bad actors often retrieve sensitive data from email archivesstored in email or chat history 
//       </p>
//       <button className="button">
//         Get Started
//         </button>
//     </header>
//     <section className="product">
//       <div>
//         <ul>
//           <li>
//             <h5>Add the text you'd like to encrypt.</h5>
//             <p>
//               Any secret that you'd like to share with someone else. For
//               example, a new user's password, an API key, or any client's
//               sensitive information.
//             </p>
//           </li>
//           <li>
//             <h5>Set a unique passphrase that only you know.</h5>
//             <p>
//               We'll use this to encrypt your text and keep your data private
//               only to you and the people you share your passphrase with.
//             </p>
//           </li>
//           <li>
//             <h5>Set an expiration date for your secret for added security.</h5>
//             <p>
//               Ensure that your secret permanently vanishes after the date you
//               set to prevent future security leaks.
//             </p>
//           </li>
//         </ul>
//         <div className="explainer">
//           <p>
//             <strong>Vanish never stores your data</strong> and has no way to
//             access it. An encrypted cipher with no identifying information
//             is all we store and this is purged from our systems on retrieval or expiry.
//           </p>
//         </div>
//       </div>
//       <div>
//         <img src="/share-tool.png" alt="Share a Secret" />
//       </div>
//     </section>
//   </div>
// );

// Home.propTypes = {};
