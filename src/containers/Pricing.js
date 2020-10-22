import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import PricingMarkdown from "./Pricing.md";
import "./Pricing.css";

class Pricing extends Component {
  constructor() {
    super();
    this.state = { markdown: "" };
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(PricingMarkdown)
      .then((res) => res.text())
      .then((text) => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    const { history } = this.props;

    return (
      <div className="pricing">
        <header>
          <h1>Pricing</h1>
          <p>This is some extra text to display beneath the pricing title.</p>
        </header>
        <div className="pricing-table">
          <div className="pricing-table-option">
            <header>
              <h5>Free</h5>
            </header>
            <div className="price">
              <h2>Free</h2>
            </div>
            <div className="features">
              <ul>
                <li>
                  <i className="fas fa-check" />{" "}
                  <span>Perfect for personal use</span>
                </li>
                <li>
                  <i className="fas fa-check" />{" "}
                  <span>Anonymous messages only</span>
                </li>
                <li>
                  <i className="fas fa-check" />{" "}
                  <span>Rate limits may apply</span>
                </li>
              </ul>
            </div>
            <button>Sign Up Now</button>
          </div>
          <div className="pricing-table-option featured">
            <header>
              <h5>Business</h5>
            </header>
            <div className="price">
              <h2>
                $49.99<span>/month</span>
              </h2>
            </div>
            <div className="features">
              <ul>
                <li>
                  <i className="fas fa-check" /> <span>50 users</span>
                </li>
                <li>
                  <i className="fas fa-check" />{" "}
                  <span>5000 messages per day</span>
                </li>
                <li>
                  <i className="fas fa-check" /> <span>Custom subdomain</span>
                </li>
              </ul>
            </div>
            <button>Sign Up Now</button>
          </div>
          <div className="pricing-table-option">
            <header>
              <h5>Enterprise</h5>
            </header>
            <div className="price">
              <h2>
                $149.99<span>/month</span>
              </h2>
            </div>
            <div className="features">
              <ul>
                <li>
                  <i className="fas fa-check" /> <span>50 users</span>
                </li>
                <li>
                  <i className="fas fa-check" /> <span>Unlimited Users</span>
                </li>
                <li>
                  <i className="fas fa-check" /> <span>Unlimited Messages</span>
                </li>
                {/* <li>
                  <i className="fas fa-check" /> <span>Custom subdomain</span>
                </li> */}
              </ul>
            </div>
            <button>Sign Up Now</button>
          </div>
        </div>
        <div className="pricing-customizations">
          <header>
            <h2>Additional Customisations</h2>
            <p>
              Customisations are available for paid plans by request for an
              additional fee. <a href="/contact">Contact us</a> to learn more.
            </p>
          </header>
          <ul>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>Federated user authentication</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>REST API</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>Data Sovereignty, choose AWS Region</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>Customised hosting,BYO AWS account</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>Security assessments</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>Penetration testing</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>Source code reviews</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>Audit logging</span>
            </li>
            <li>
              <div onClick={() => history.push("/contact")}>
                <i className="fas fa-plus" />
              </div>
              <span>SOC II reports</span>
            </li>
          </ul>
        </div>
        {/* <ReactMarkdown source={markdown} /> */}
      </div>
    );
  }
}

export default Pricing;
