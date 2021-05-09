import React from 'react';
import ErrorMessage from '../../components/Forms/Error';
import Radio from '../../components/Forms/Radio';

export default class RadioWithRadioList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showYes: false };
  }

  toggle(item) {
    this.setState({ showYes: item === 'yes' });
  }

  render() {
    return (
      <div>
        <fieldset className="field radio-group">
          {this.props.label && <legend>{this.props.label}</legend>}
          {this.props.instructions && (
            <p dangerouslySetInnerHTML={{ __html: this.props.instructions }} />
          )}
          <div>
            <Radio
              props={this.props}
              submittedValue={this.props.input.value}
              fieldType="radioList"
            />
          </div>
          <ErrorMessage fields={this.props.meta} />
          {this.props.input.name === 'do_you_have_dependants' && (
            <p>
              If you have dependants, the upper threshold of your income can be
              $500 more for each dependant in your care. For example, if you
              have 2 children, the top limit of how much you could earn to be
              entitled to the full rebate would be $1000 more than someone with
              no dependants.
            </p>
          )}
        </fieldset>
      </div>
    );
  }
}
