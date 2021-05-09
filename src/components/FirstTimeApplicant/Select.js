import React, { Fragment } from 'react';
import axios from 'axios';
import config from '../../config';

class selectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false,
      value: '',
      addresses: [],
      selectedAddress: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const inputVal = e.target.value;
    this.setState({ showList: true, value: inputVal });

    const results = axios
      .get(`${config.API_ORIGIN}/api/v1/properties?q=${inputVal}`)
      .then(res => this.setState({ addresses: res.data.data }));

    return results;
  }

  handleClick(e) {
    this.setState({
      selectedAddress: e.target.innerHTML,
      showList: false,
    });
  }

  render() {
    const { input, label, touched, error, type, className } = this.props;
    return (
      <Fragment>
        {label && <label className="subheading">{label}</label>}
        <div style={{ borderBottomColor: touched && error ? 'red' : '' }}>
          <input
            {...input}
            type={type}
            className={className}
            onChange={e => this.handleChange(e)}
            value={
              this.state.selectedAddress
                ? this.state.selectedAddress
                : this.state.value
            }
          />
          {this.state.showList && (
            <ul>
              {this.state.addresses.map((x, i) => {
                const { location, suburb, town_city } = x.attributes;
                return (
                  <li
                    key={i}
                    onClick={e => this.handleClick(e)}
                  >{`${location}, ${suburb}, ${town_city}`}</li>
                );
              })}
            </ul>
          )}
        </div>
      </Fragment>
    );
  }
}

export default selectField;
