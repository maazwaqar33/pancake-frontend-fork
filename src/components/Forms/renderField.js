import React, { Fragment } from 'react';

const renderField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error },
}) => (
  <Fragment>
    <label className="subheading">{label}</label>
    <div style={{ borderBottomColor: touched && error ? 'red' : '' }}>
      <input {...input} type={type} className={className} />
    </div>
  </Fragment>
);

export default renderField;
