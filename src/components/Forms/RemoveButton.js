import React from 'react';

const RemoveButton = props => {
  return (
    <button
      type="button"
      title="Remove income"
      className="nested-button"
      onClick={() => {
        props.removeOtherOptionValues(props.index);
        props.fields.remove(props.index);
      }}
    >
      Remove income
    </button>
  );
};

export default RemoveButton;
