import React, { Fragment } from 'react';
import { underscorize } from '../../helpers/strings';

const Checkbox = props => (
  <Fragment>
    <fieldset className="field">
      <legend>What was your total income for the 2017/2018 tax year?</legend>

      <p>
        You will need to know your total income for the 2017/2018 Tax year (1
        March 2017 - 31 March 2018) \ including rental income from any
        properties you own, interest and dividends, and overseas income
        (converted to\ $NZD). <br /> <br /> Select any that apply to you.
      </p>
      <div className="row">
        <ul className="column list-stripped">
          <li>
            <h4>Your Income</h4>
          </li>
          {props.options.map((item, i) => {
            return (
              <li key={i}>
                <label className="radio-list-container">
                  <input
                    type="checkbox"
                    {...props.input}
                    name={`total_income.applicant_${underscorize(item)}`}
                  />
                  <div className="radio-list-multi">
                    {item}
                    <span className="checkmark" />
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
        <ul className="column list-stripped">
          <li>
            <h4>Partner/joint homeowner's income</h4>
          </li>
          {props.options.map((item, i) => {
            return (
              <li key={i} className="radio-list-container">
                <label className="radio-list-container">
                  <input
                    type="checkbox"
                    {...props.input}
                    name={`total_income.partner_${underscorize(item)}`}
                  />
                  <div className="radio-list-multi">
                    {item}
                    <span className="checkmark" />
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {/* <ErrorMessage fields={props.meta} /> */}
    </fieldset>
  </Fragment>
);

export default Checkbox;
