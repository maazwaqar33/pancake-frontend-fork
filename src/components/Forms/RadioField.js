import React, { Fragment } from 'react';

const RadioField = props => {
  return (
    <Fragment>
      {props.options.map((item, i) => (
        <Fragment key={i}>
          <label>
            <input
              type="radio"
              name={props.name ? props.name : 'radio_fields'}
              onClick={() => props.handleRadioClick(item)}
            />
            <span>{item}</span>
          </label>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default RadioField;
