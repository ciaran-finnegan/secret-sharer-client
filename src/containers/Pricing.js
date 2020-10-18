import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import PricingMarkdown from './Pricing.md';
import "./Pricing.css";

class Pricing extends Component {

  constructor() {
    super();
    this.state = { markdown: '' };
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(PricingMarkdown).then(res => res.text()).then(text => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    return <div className="pricing">
              <ReactMarkdown source={markdown} />
          </div>
  }
}

export default Pricing;