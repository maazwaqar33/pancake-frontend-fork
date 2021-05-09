import React, { Fragment } from 'react';
import ErrorMessage from '../../components/Forms/Error';

const _ = require('lodash');

const isObject = (obj, key) => {
  return _.isObject(obj) ? obj[key] : obj;
};

class RenderRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPanel: false,
    };
  }

  render() {
    const { label, isRequired, instructions, options, input } = this.props;
    return (
      <Fragment>
        <fieldset
          className={
            options && options.length > 2 ? 'radio-list' : 'field radio-group'
          }
        >
          {label && (
            <legend>
              {label}
              {isRequired && <span className="aria-hidden">(required)</span>}
            </legend>
          )}
          {instructions && (
            <p dangerouslySetInnerHTML={{ __html: instructions }} />
          )}
          <div>
            <div>
              {options &&
                options.map((item, key) => {
                  return (
                    <label
                      key={key}
                      className={this.props.className && this.props.className}
                    >
                      <input
                        {...input}
                        type="radio"
                        value={isObject(item, 'value')}
                      />
                      <span style={{ border: '1px solid black' }}>
                        {isObject(item, 'label')}
                      </span>
                    </label>
                  );
                })}
            </div>
          </div>
          <ErrorMessage fields={this.props} />
        </fieldset>

        {/* <Checkbox props={this.props.options}/> */}
      </Fragment>
    );
  }
}

export default RenderRadio;
