import React, { Component } from 'react';

class HoldingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <h2>The trial of online applications for Rates Rebates has ended.</h2>
        <p>
          If you have sent an application but have not visited your Council
          Service Centre to sign and submit your application, you may need to
          reapply on a paper form to get your Rebate this year.
        </p>
        <p>
          Feedback can be sent to Rates Rebates Support at{' '}
          <a href="mailto:support@ratesrebates.govt.nz">
            support@ratesrebates.govt.nz
          </a>
        </p>
      </div>
    );
  }
}

export default HoldingPage;
