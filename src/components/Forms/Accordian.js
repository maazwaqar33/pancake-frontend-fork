import React, { Fragment } from 'react';

class Accordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  toggle() {
    this.setState({
      shown: !this.state.shown,
    });
  }

  render() {
    const shown = {
      display: this.state.shown ? 'block' : 'none',
    };
    return (
      <Fragment>
        <div className="accordian">
          <div
            className="accordian-header"
            onClick={this.toggle.bind(this)}
            dangerouslySetInnerHTML={{ __html: this.props.label }}
          />
          <div
            className="accordian-body"
            style={shown}
            dangerouslySetInnerHTML={{ __html: this.props.text }}
          />
        </div>
      </Fragment>
    );
  }
}

export default Accordian;
