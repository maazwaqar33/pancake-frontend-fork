import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from '../Forms/renderField';
import { scrollToFirstError } from '../../components/Forms/FormScroll';
import Address from '../widgets/Address';
import Income from '../widgets/Income';
import Eligible from '../widgets/Eligible';
import NumberField from '../Forms/NumberField';
import Intro from './instructions/intro';
import 'react-select/dist/react-select.css';

class WizardFormFirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dependants: null,
      isEligible: false,
      page: 1,
      properties: [],
      rate_payers: [],
      selectedRatesPayer: '',
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleDependants = this.handleDependants.bind(this);
    this.handleIncome = this.handleIncome.bind(this);

    this.handleAddressSelection = this.handleAddressSelection.bind(this);
  }

  nextPage = values => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  previousPage = () => {
    this.setState({
      page: this.state.page - 1,
    });
  };

  getValues(e) {
    this.setState({ value: e.target.value });
  }

  handleAddressSelection(state) {
    this.setState(state);
    this.props.change('address', state.location.location);
    this.props.change('valuation_id', this.state.location.valuation_id);

    if (state['rates_bills']) {
      let attributes = state['rates_bills'][0]['attributes'];
      this.setState({
        rates_bill: attributes['total_bill'],
        rating_year: attributes['rating_year'],
      });
      this.props.change('rates_bill', attributes['total_bill']);
    } else {
      this.setState({ rates_bills: null, rating_year: null });
      this.props.change('rates_bill', null);
    }
  }

  handleDependants(event, newValue, previousValue, name) {
    if (newValue) {
      let dependants = newValue >= 0 ? newValue : 0;
      this.setState({ dependants });
      this.props.change('dependants', dependants);
    }
  }

  handleIncome(income, direction) {
    // note: direction is above, between, below
    this.setState({ income, direction });
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container autocomplete-form">
        <form onSubmit={handleSubmit} onKeyPress={this.handleKeyPress}>
          {this.props.council_name === 'Tauranga' && <Intro />}

          <section>
            <div className="arrow-box primary">
              <Address
                onSelection={this.handleAddressSelection}
                council_id={this.props.council_id}
                council_name={this.props.council_name}
              />

              <Field name="rates_bill" type="hidden" component={renderField} />
              <Field
                name="valuation_id"
                type="hidden"
                component={renderField}
              />
              {this.state.rates_bill && this.state.rating_year && (
                <Fragment>
                  <p className="select-results">
                    My {this.state.rating_year - 1} to {this.state.rating_year}{' '}
                    rates are <strong>${this.state.rates_bill}.</strong>
                  </p>
                  <p className="help-text">
                    This includes water rates, as provided by{' '}
                    {this.props.council_name} City Council.
                  </p>
                </Fragment>
              )}
            </div>

            {this.state.rates_bill && (
              <Fragment>
                <div className="arrow-box primary">
                  <label>
                    I have
                    <Field
                      name="dependants"
                      component={NumberField}
                      onChange={this.handleDependants}
                    />
                    dependants.
                  </label>
                </div>
              </Fragment>
            )}

            <Income
              dependants={this.state.dependants}
              rates_bill={this.state.rates_bill}
              onSelection={this.handleIncome}
            />

            <Eligible
              dependants={this.state.dependants}
              rates_bill={this.state.rates_bill}
              income={this.state.income}
            />
          </section>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
  onSubmitFail: errors => scrollToFirstError(errors),
})(WizardFormFirstPage);
