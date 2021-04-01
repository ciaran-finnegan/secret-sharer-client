import React from "react";
// import PropTypes from "prop-types";

import "./Home.css";

const Home = ({ prop1, prop2 }) => (
  <div className="page-home">
    <header>
      <h1>Share confidential information securely with expiring links.</h1>
      <p>
        Something will go here to make the header look less sparse. A subtitle
        or explainer.
      </p>
      <button className="button">Get Started</button>
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
            <strong>Vanish never sees your data</strong> and has no way to
            access it. A single encrypted cypher with no identifying information
            is all we see.
          </p>
        </div>
      </div>
      <div>
        <img src="/share-tool.png" alt="Share a Secret" />
      </div>
    </section>
  </div>
);

Home.propTypes = {};

export default Home;
