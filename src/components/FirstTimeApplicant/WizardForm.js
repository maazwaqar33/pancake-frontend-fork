import React, { Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import axios from 'axios';
import config from '../../config';

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      council_name: '...',
      council_id: 0,
    };
    this.fetchCouncil();
  }

  fetchCouncil() {
    let council = getUrlVars().council;
    if (!council) {
      council = 'TCC';
    }
    axios
      .get(`${config.API_ORIGIN}/api/v1/councils/${council}`)
      .then(res => {
        this.setState({ council_name: res.data.data.attributes.name });
        this.setState({ council_id: res.data.data.id });
      })
      .catch(err => console.log('error fetching council info', err));
    return {};
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && (
          <WizardFormFirstPage
            onSubmit={this.nextPage}
            council_name={this.state.council_name}
            council_id={this.state.council_id}
          />
        )}
        {page === 2 && (
          <WizardFormSecondPage
            previousPage={this.previousPage}
            council_name={this.state.council_name}
            council_id={this.state.council_id}
            onSubmit={onSubmit}
          />
        )}
      </div>
    );
  }
}

function getUrlVars() {
  let vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    _m,
    key,
    value,
  ) {
    vars[key] = value;
  });
  return vars;
}

export default WizardForm;
