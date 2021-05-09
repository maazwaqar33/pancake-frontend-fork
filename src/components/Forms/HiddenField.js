import React, { Fragment } from 'react';

const HiddenField = ({ input, type, className }) => (
  <Fragment>
    <input {...input} type={type} className={className} />
  </Fragment>
);

export default HiddenField;
