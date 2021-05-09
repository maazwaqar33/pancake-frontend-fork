import React, { Fragment } from 'react';

const Error = props => {
  const { fields } = props;
  return (
    <Fragment>
      <div>
        {fields && fields.touched && fields.error && (
          <div>
            <span className="error">
              <strong>Error: </strong>
              {fields.error}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Error;
