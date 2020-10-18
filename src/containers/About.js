import React, { Component } from "react";
import AboutMarkdown from "./About.md";
import "./About.css";

class About extends Component {
  constructor() {
    super();
    this.state = { markdown: "" };
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(AboutMarkdown)
      .then((res) => res.text())
      .then((text) => this.setState({ markdown: text }));
  }

  render() {
    return (
      <div className="about">
        <header>
          <h1>
            Securely exchange confidential data with your customers and
            coworkers using encrypted, expiring messages.
          </h1>
          <p>
            Perfect for sharing one time passwords, API keys, license keys, VPN
            credentials or personally identifiable information such as credit
            cards, bank account numbers, and identity information.
          </p>
        </header>
        <section className="process">
          {/* <h2>How it Works</h2> */}
          <div className="process-steps">
            <div className="process-step">
              <img src="/lock-browser.svg" alt="Browser" />
              <h4>Data Encrypted in Browser</h4>
              <p>
                Enter your data and we'll encrypt it in your browser using a
                passphrase you provide.
              </p>
            </div>
            <div className="process-step">
              <img src="/shield-check.svg" alt="Shield With Check" />
              <h4>Encrypted Data Stored on Our Servers</h4>
              <p>
                We store the hash and encrypted cipher on our servers, only
                retrievable via a secret link.
              </p>
            </div>
            <div className="process-step">
              <img src="/cloud-purge.svg" alt="Cloud With X" />
              <h4>Hash &amp; Cipher Purged on Retrieval</h4>
              <p>
                The hash and cipher are purged from our database on retrieval or
                expiry of the link.
              </p>
            </div>
          </div>
        </section>
        <section className="technology">
          <header>
            <h2>What technology do we use?</h2>
            <p>
              We use the CryptoJS implementations of standard and secure
              cryptographic algorithms.
            </p>
          </header>
          <ul>
            <li>
              <i className="fas fa-check" />
              <p>
                We use the SHA-256 hashing which is one of the four variants in
                the SHA-2 set. It isn&#39;t as widely used as SHA-1, though it
                appears to provide much better security.
              </p>
            </li>
            <li>
              <i className="fas fa-check" />
              <p>
                We use the Advanced Encryption Standard (AES-256), a U.S.
                Federal Information Processing Standard (FIPS). It was selected
                after a 5-year process where 15 competing designs were
                evaluated. We will generate a 256-bit key from the passphrase
                provided.
              </p>
            </li>
            <li>
              <i className="fas fa-check" />
              <p>
                Our service is hosted on Amazon Web Services using serverless
                lambda functions and DynamoDB.
              </p>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default About;
