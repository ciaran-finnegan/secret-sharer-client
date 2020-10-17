import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import TermsMarkdown from './Terms.md';
import "./Terms.css";

class Terms extends Component {

  constructor() {
    super();
    this.state = { markdown: '' };
  }

  componentWillMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    fetch(TermsMarkdown).then(res => res.text()).then(text => this.setState({ markdown: text }));
  }

  render() {
    const { markdown } = this.state;
    return <div className="terms">
              <ReactMarkdown source={markdown} />
          </div>
  }
}

export default Terms;