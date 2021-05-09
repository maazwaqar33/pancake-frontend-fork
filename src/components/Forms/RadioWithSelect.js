import React from 'react';
import { Field, FieldArray } from 'redux-form';
import RemoveButton from './RemoveButton';
import store from '../../store';
import filterE from '../../helpers/numbers';

export default class RadioWithSelect extends React.Component {
  render() {
    return (
      <FieldArray
        removeOtherOptionValues={this.props.removeOtherOptionValues}
        getOtherOptionValues={this.props.getOtherOptionValues}
        name={this.props.name ? this.props.name : 'otherIncome'}
        component={renderOtherIncome}
      />
    );
  }
}

class renderOtherIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      other_source: false,
    };
  }

  render() {
    const {
      fields,
      meta: { error, submitFailed },
    } = this.props;
    return (
      <ul className="nested-list">
        {fields.map((income, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <h4>Other income #{index + 1} </h4>
            <RemoveButton
              fields={fields}
              index={index}
              removeOtherOptionValues={this.props.removeOtherOptionValues}
            />
            <select name={`${income}.selectedOption`}>
              <option>Wage or salary</option>
              <option>
                Work and incomes supplements (e.g. Accommodation Supplement)
              </option>
              <option>Personal Superannuation</option>
              <option>Interest or dividends</option>
              <option>Overseas income (converted to $NZD)</option>
              <option>
                Net profit before tax from any business – enter ‘0’ if you
                sustained a loss
              </option>
              <option>Rental income – enter ‘0’ if you sustained a loss</option>
              <option>ACC earnings compensation</option>
              <option>
                Working for Families Tax Credits (excludes Family Tax Credits)
              </option>
              <option>Trust income paid to you</option>
              <option>Income from other source (please identify)</option>
            </select>

            {this.state.other_source && (
              <Field
                name={`${income}.incomeFrom`}
                type="text"
                component={renderField}
                label="Where did this income come from?"
                onChange={e => {
                  store[`${income}.incomeFrom`] = e.target.value;
                }}
              />
            )}

            <Field
              name={`${income}.totalAmount`}
              type="number"
              component={renderField}
              label="Enter the total amount"
              onChange={e => {
                if (!filterE(e)) {
                  this.props.getOtherOptionValues(
                    store,
                    income,
                    e.target.value,
                    index,
                  );
                }
              }}
            />
          </li>
        ))}
        <li>
          <button type="button" onClick={() => fields.push({})}>
            + Add Income
          </button>
          {submitFailed && error && <span>Error</span>}
        </li>
      </ul>
    );
  }
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <span className="aria-hidden">{label}</span>
    <div>
      <input
        {...input}
        type={type}
        min="0"
        step="1"
        placeholder={label}
        style={{ marginBottom: '5px' }}
      />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);
