import React, { Fragment } from 'react';
import axios from 'axios';
import config from '../../config';
import RenderRadio from '../../components/Forms/RenderRadio';
import renderField from '../Forms/renderField';
import { Field } from 'redux-form';

class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show_input: false };
    this.handleSelection = this.handleSelection.bind(this);
    this.handleManualIncome = this.handleManualIncome.bind(this);
  }

  handleManualIncome(event, newValue, previousValue, name) {
    this.setState({ income: newValue });
    this.props.onSelection(newValue, 'exact');
  }

  handleSelection(event, newValue, previousValue, name) {
    let income;
    if (newValue === 'below') {
      income = this.state.maximum_income_for_full_rebate;
    } else if (newValue === 'above') {
      income = this.state.minimum_income_for_no_rebate;
    }
    this.setState({ income, show_input: newValue === 'between' });
    this.props.onSelection(income, newValue);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dependants && nextProps.rates_bill) {
      const data = {
        persons: {
          Tui: {
            salary: {
              2019: null,
            },
            dependants: {
              2019: nextProps.dependants,
            },
          },
        },
        properties: {
          property_1: {
            owners: ['Tui'],
            rates: {
              2019: nextProps.rates_bill,
            },
            maximum_income_for_full_rebate: {
              2019: null,
            },
            minimum_income_for_no_rebate: {
              2019: null,
            },
          },
        },
      };

      axios
        .post(`${config.OPENFISCA_ORIGIN}`, data)
        .then(res =>
          this.setState({
            minimum_income_for_no_rebate: res.data.properties.property_1.minimum_income_for_no_rebate[
              '2019'
            ].toFixed(2),
            maximum_income_for_full_rebate: res.data.properties.property_1.maximum_income_for_full_rebate[
              '2019'
            ].toFixed(2),
          }),
        )
        .catch(err => console.log('err fetching properties', err));
    } else {
      this.setState({
        minimum_income_for_no_rebate: null,
        maximum_income_for_full_rebate: null,
      });
    }
  }

  getOptions() {
    return {
      options: {
        en: [
          {
            value: 'below',
            label: `Less than $${this.formatDollars(
              this.state.maximum_income_for_full_rebate,
            )}`,
          },
          { value: 'between', label: 'Somewhere in the middle' },
          {
            value: 'above',
            label: `More than $${this.formatDollars(
              this.state.minimum_income_for_no_rebate,
            )}`,
          },
        ],
      },
      isRequired: true,
      component: RenderRadio,
    };
  }

  formatDollars(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getCurrentFinancialYear(add, subtract) {
    return new Date().getFullYear() - (add !== 0 ? add : subtract);
  }

  render() {
    if (this.state.minimum_income_for_no_rebate) {
      const earnLessThan = this.getOptions();
      return (
        <div className="arrow-box primary">
          <label htmlFor="earn_less_than">
            {/* From 1 April {this.getCurrentFinancialYear(0, 2)} to 31 March {this.getCurrentFinancialYear(0, 1)} I earned */}
            From 1 April 2017 to 31 March 2018 I earned
          </label>

          <Field
            name="income_range"
            component={RenderRadio}
            options={earnLessThan.options && earnLessThan.options.en}
            onChange={this.handleSelection}
          />

          {this.state.show_input && (
            <Fragment>
              <label>My annual income was</label>
              <Field
                name="annual_income_entered_on_first_page"
                onChange={this.handleManualIncome}
                type="text"
                component={renderField}
              />
              <p className="help-text">
                Approximate values are fine.
                <br />
                You'll need the real values if you choose to apply
              </p>
            </Fragment>
          )}
        </div>
      );
    }

    return '';
  }
}

export default Income;
