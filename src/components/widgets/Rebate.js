import React from 'react';
import axios from 'axios';
import config from '../../config';

class Rebate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rebate: null };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rebate: null });
    if (nextProps.dependants && nextProps.rates_bill && nextProps.income) {
      const data = {
        persons: {
          Tahi: {
            salary: {
              2019: nextProps.income,
            },
            dependants: {
              2019: nextProps.dependants,
            },
          },
        },
        properties: {
          property_1: {
            owners: ['Tahi'],
            rates: {
              2019: nextProps.rates_bill,
            },
            rates_rebate: {
              2019: null,
            },
          },
        },
      };

      axios
        .post(`${config.OPENFISCA_ORIGIN}`, data)
        .then(res => {
          const rebate = res.data.properties.property_1.rates_rebate['2019'];
          this.setState({ rebate });
        })
        .catch(err => err);
    } else {
      this.setState({
        minimum_income_for_no_rebate: null,
        maximum_income_for_full_rebate: null,
      });
    }
  }

  formatDollars(number) {
    return number
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    if (this.state.rebate !== null) {
      return (
        <p className="heading-paragraph">
          You could be eligible for
          <span> ${this.formatDollars(this.state.rebate)}</span>
        </p>
      );
    }
    return '';
  }
}

export default Rebate;
