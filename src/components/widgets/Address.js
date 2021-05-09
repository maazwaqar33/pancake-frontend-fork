import React, { Fragment } from 'react';
import Select from 'react-select';
import axios from 'axios';
import config from '../../config';

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clearable: true,
      location: {},
      rates_payers: [],
      rates_bills: null,
    };
    this.handleSelectLocation = this.handleSelectLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(inputText) {
    this.setState({ isLoadingExternally: true });
    axios
      .get(
        `${config.API_ORIGIN}/api/v1/properties?q=${inputText}&council_id=${
          this.props.council_id
        }`,
      )
      .then(res => {
        if (res && res.data && res.data.data.length) {
          const properties = res.data.data.map(i => {
            return {
              id: i.id,
              location: i.attributes.location,
              valuationId: i.attributes.valuation_id,
            };
          });
          this.setState(
            {
              properties,
            },
            () => this.setState({ isLoadingExternally: false }),
          );
        }
      })
      .catch(err => err);
  }

  handleSelectLocation(selectedOption) {
    if (selectedOption) {
      this.setState({ location: selectedOption });
      axios
        .get(`${config.API_ORIGIN}/api/v1/properties/${selectedOption.id}`)
        .then(res => {
          if (res && res.data && res.data.included.length) {
            const rates_payers = res.data.included
              .filter(i => i.type === 'rates_payers')
              .map(p => {
                return p;
              });
            const rates_bills = res.data.included
              .filter(i => i.type === 'rates_bills')
              .map(p => {
                return p;
              });
            this.props.onSelection({
              location: res.data.data.attributes,
              rates_payers,
              rates_bills,
            });
          }
        })
        .catch(err => err);
    } else {
      this.setState({ location: {} });
      this.props.onSelection({
        location: {},
        rates_payers: [],
        rates_bill: null,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <label>
          I live at
          <Select
            name="location"
            value={this.state.location}
            onChange={this.handleSelectLocation}
            onInputChange={this.handleChange}
            clearable={this.state.clearable}
            searchable={this.state.searchable}
            isLoading={this.state.isLoadingExternally}
            options={this.state.properties}
            labelKey="location"
            valueKey="id"
          />
          in {this.props.council_name}
        </label>
      </Fragment>
    );
  }
}

export default Address;
