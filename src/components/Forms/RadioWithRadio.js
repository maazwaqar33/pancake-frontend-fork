import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Accordian from '../../components/Forms/Accordian';
import Radio from '../../components/Forms/Radio';

export default class RadioWithRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      sub: false,
    };
  }

  toggle() {
    this.setState({
      shown: !this.state.shown,
    });
  }

  render() {
    return (
      <div>
        <fieldset className="field radio-group">
          {this.props.label && <legend>{this.props.label}</legend>}
          <div>
            <Radio {...this.props} fieldType="radio" />
          </div>
          {this.props.instructions && (
            <p dangerouslySetInnerHTML={{ __html: this.props.instructions }} />
          )}
          {this.props.accordianLabel && (
            <Accordian
              label={this.props.accordianLabel}
              text={this.props.accordianText}
            />
          )}
          <ErrorMessage fields={this.props.meta} />
        </fieldset>
      </div>
    );
  }
}
