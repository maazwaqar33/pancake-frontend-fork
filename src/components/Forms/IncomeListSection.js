import RadioField from './RadioField';
import RadioWithSelect from './RadioWithSelect';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { sendTotalIncome, sendPartnerStatus } from '../../actions';
import { underscorize } from '../../helpers/strings';
import filterE from '../../helpers/numbers';

class IncomeListSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      should_show_applicant_options: true,
      should_show_partner_options: false,
      total_applicant_income: 0,
      total_partner_income: 0,
    };
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.setIncome = this.setIncome.bind(this);

    this.incomeList = [
      {
        title: 'Your Income',
        type: 'applicant',
      },
      {
        title: "Partner/join homeowner's income",
        type: 'partner',
      },
    ];
  }

  handleRadioClick(val) {
    this.setState({ should_show_partner_options: val === 'yes' });
  }

  setIncome(totalIncome, type) {
    if (this.state[`total_${type}_income`] !== totalIncome) {
      if (!isNaN(totalIncome)) {
        this.setState({ [`total_${type}_income`]: totalIncome });
      }
    }
  }

  componentDidUpdate() {
    const singleIncome = this.state.total_applicant_income;
    const combinedIncome = singleIncome + this.state.total_partner_income;
    const incomeTotal = !this.state.should_show_partner_options
      ? singleIncome
      : combinedIncome;

    this.props.dispatch(sendTotalIncome(incomeTotal));
    this.props.dispatch(
      sendPartnerStatus(this.state.should_show_partner_options),
    );
  }

  render() {
    return (
      <Fragment>
        <section>
          <div className="container">
            <fieldset className="field radio-group">
              <legend>
                Were you living with a partner or joint home owner(s) on July 1
                2018?
              </legend>
              <p>
                'Partner' is a person you are married to/in a civil union, or de
                facto relationship with.
              </p>
              <div>
                <div>
                  <RadioField
                    options={['yes', 'no']}
                    name="lived_with_partner"
                    handleRadioClick={this.handleRadioClick}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </section>
        <div style={{ marginTop: '42px' }}>
          <fieldset>
            <label
              style={{
                fontSize: '20px',
                fontWeight: '500',
              }}
            >
              What was your total income for the 2017/2018 tax year?
            </label>
            <p>
              You will need to know your total income{' '}
              <strong>before tax</strong> for the 2017/2018 Tax year (1 March
              2017 - 31 March 2018) including rental income from any properties
              you own, interest and dividends, and overseas income (converted to
              $NZD).
              <br />
              <br />
              Select any that apply to you.
            </p>
            <div className="row">
              {this.incomeList.map(item => {
                return (
                  <ul key={item.type} className="column list-stripped">
                    {this.state[`should_show_${item.type}_options`] && (
                      <ListColumn
                        title={item.title}
                        name={item.type}
                        hasPartner={
                          this.state[`should_show_${item.type}_options`]
                        }
                        showRadios={false}
                        setTotalIncome={e => this.setIncome(e, item.type)}
                      />
                    )}
                  </ul>
                );
              })}
            </div>
          </fieldset>
        </div>
      </Fragment>
    );
  }
}

const ListColumn = props => {
  return (
    <Fragment>
      <ListHeading title={props.title} />
      <IncomeList
        name={props.name}
        livedWithPartner={props.livedWithPartner}
        showRadios={props.showRadios}
        setTotalIncome={props.setTotalIncome}
      />
    </Fragment>
  );
};

const ListHeading = props => {
  return (
    <li>
      <h4>{props.title}</h4>
    </li>
  );
};

class IncomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowRadio: false,
      ShowTextField: false,
      ShowNestedGroup: false,
      nz_superannuation_applicant: '',
      nz_superannuation_partner: '',
      sa_checked: false,
      jobseeker_support: 0,
      sole_parent_support: 0,
      supported_living: 0,
    };

    this.handleChild = this.handleChild.bind(this);
    this.handleChildRadioClick = this.handleChildRadioClick.bind(this);
    this.getOtherOptionValues = this.getOtherOptionValues.bind(this);
    this.removeOtherOptionValues = this.removeOtherOptionValues.bind(this);
  }

  setChild(state, clicked) {
    if (this.state.ShowTextField) {
      if (clicked === 'wage_or_salary0') {
        document.getElementsByName('wos_applicant')[0].value = 0;
      }
      if (clicked === 'wage_or_salary1') {
        document.getElementsByName('wos_partner')[0].value = 0;
      }

      this.setState({ [state]: !this.state[state] });
    } else {
      this.setState({ [state]: !this.state[state] });
    }
  }

  handleChild(val, clicked) {
    switch (val.child) {
      case 'radio':
        this.setState({ sa_checked: !this.state.sa_checked });
        this.setChild('ShowRadio');
        break;
      case 'number-field':
        this.setChild('ShowTextField', clicked);
        break;
      case 'nested-group':
        this.setChild('ShowNestedGroup');
        break;
      default:
        this.setChild(underscorize(val.label));
    }
  }

  handleChildRadioClick(e, name) {
    this.setState({ [name]: `${name}_${underscorize(e)}` });
  }

  handleTextChange(e) {
    if (e.target.name === 'wage_or_salary_applicant') {
      this.setState({ wos_applicant: e.target.value });
    }
    if (e.target.name === 'wage_or_salary_partner') {
      this.setState({ wos_partner: e.target.value });
    }
  }

  getWageOrSalary(name) {
    return typeof document.getElementsByName(name)[0] !== 'undefined'
      ? document.getElementsByName(name)[0].value
      : 0;
  }

  removeOtherOptionValues(index) {
    this.setState({ [`otherOptionValue${index}`]: 0 });
  }

  getOtherOptionValues(store, income, value, index) {
    const data = {};
    data[`otherOptionValue${index}`] = value;
    this.setState(data);
    store[`${income}.totalAmount`] = value;
  }

  render() {
    const list = [
      {
        label: 'NZ Superannuation',
        child: 'radio',
        singleOptions: ['Single - Living alone', 'Single - Sharing'],
        partnerOptions: [
          'Partner with non-qualified spouse included',
          'Partner both qualify',
        ],
      },
      {
        label: 'Jobseeker Support',
        child: null,
      },
      {
        label: 'Sole parent support',
        child: null,
      },
      {
        label: 'Supported Living',
        child: null,
      },
      {
        label: 'Wage or Salary',
        child: 'number-field',
      },
      {
        label: 'Other',
        child: 'nested-group',
      },
    ];

    return (
      <Fragment>
        {list.map((item, i) => {
          return (
            <Fragment key={i}>
              <li>
                <label className="radio-list-container">
                  <input
                    type="checkbox"
                    name={underscorize(item.label)}
                    onClick={() =>
                      this.handleChild(
                        item,
                        underscorize(
                          `${item.label}${
                            this.props.livedWithPartner ? '1' : '0'
                          }`,
                        ),
                      )
                    }
                  />
                  <div className="radio-list-multi">
                    {item.label}
                    <span className="checkmark" />
                  </div>
                </label>
              </li>
              <div>
                {!this.props.showRadios && item.child === 'radio' && (
                  <RadioGroup
                    handleChildRadioClick={this.handleChildRadioClick}
                    name={`${underscorize(item.label)}_${this.props.name}`}
                    options={
                      !this.props.livedWithPartner
                        ? item.singleOptions && item.singleOptions
                        : item.singleOptions &&
                          item.singleOptions.concat(item.partnerOptions)
                    }
                    type={this.state.ShowRadio ? 'radio' : 'hidden'}
                  />
                )}

                {item.child === 'number-field' && (
                  <Fragment>
                    <input
                      type={this.state.ShowTextField ? 'number' : 'hidden'}
                      name={`wos_${this.props.name}`}
                      min="0"
                      step="1"
                      pattern="\d+"
                      onChange={e => {
                        if (!filterE(e)) {
                          this.setState({
                            [`wos_${this.props.name}`]: e.target.value,
                          });
                        }
                      }}
                    />
                  </Fragment>
                )}

                {this.state.ShowNestedGroup &&
                  item.child === 'nested-group' && (
                    <RadioWithSelect
                      visible={this.state.ShowNestedGroup}
                      name={`${underscorize(item.label)}_${this.props.name}`}
                      getOtherOptionValues={this.getOtherOptionValues}
                      removeOtherOptionValues={this.removeOtherOptionValues}
                    />
                  )}
              </div>
            </Fragment>
          );
        })}

        <IncomeTotals
          incomeListStates={this.state}
          dependants={document.getElementsByName('dependants')[0]}
          livedWithPartner={this.props.livedWithPartner}
          data={this.props}
          nz_superannuation_applicant={this.state.nz_superannuation_applicant}
          nz_superannuation_partner={this.state.nz_superannuation_partner}
          sa_checked={this.state.sa_checked}
          jobseeker_support={this.state.jobseeker_support}
          sole_parent_support={this.state.sole_parent_support}
          supported_living={this.state.supported_living}
          wos_total={this.wosTotal()}
          setTotalIncome={this.props.setTotalIncome}
        />
      </Fragment>
    );
  }

  wosTotal() {
    let total = parseFloat(this.getWageOrSalary(`wos_${this.props.name}`), 0);
    if (!total) {
      total = 0;
    }
    return total;
  }
}

const RadioGroup = props => {
  return (
    <div
      className="radio-list"
      style={props.type !== 'radio' ? { display: 'none' } : null}
    >
      {props.options.map((item, i) => (
        <Fragment key={i}>
          <label>
            <input
              type="radio"
              name={props.name}
              onClick={() => props.handleChildRadioClick(item, props.name)}
            />
            <span>{item}</span>
          </label>
        </Fragment>
      ))}
    </div>
  );
};

class IncomeTotals extends React.Component {
  constructor() {
    super();
    this.state = {
      income: null,
      totalIncome: 0,
    };

    this.totalIncome = this.totalIncome.bind(this);
  }

  superAnnuation(type) {
    let sa_total;
    if (type.indexOf('alone') >= 0) {
      sa_total = 23405.2;
    } else if (type.indexOf('sharing') >= 0) {
      sa_total = 21484.32;
    } else if (type.indexOf('non_qualified') >= 0) {
      sa_total = 16784.56;
    } else if (type.indexOf('qualify') >= 0) {
      sa_total = 17721.6;
    } else {
      sa_total = 0;
    }
    return sa_total;
  }

  totalIncome() {
    let sa_total = 0;
    let jss_total = 0;
    let sps_total = 0;
    const spl_total = 0;

    if (typeof this.props.dependants !== 'undefined') {
      var dependants = this.props.dependants.value
        ? this.props.dependants.value
        : 0;
    }

    // SUPERANNUATION
    if (this.props.sa_checked) {
      sa_total +=
        this.superAnnuation(this.props.nz_superannuation_applicant) +
        this.superAnnuation(this.props.nz_superannuation_partner);
    }

    // JOB SEEKER SUPPORT
    if (this.props.jobseeker_support) {
      // has children
      if (dependants > 0) {
        if (this.props.livedWithPartner) {
          jss_total += 11019.84;
        } else {
          jss_total += 19585.28;
        }
      } else {
        // no children
        if (this.props.livedWithPartner) {
          jss_total += 10285.6;
        } else {
          jss_total += 10285.6; // took first value: Single 18-19 years (away from home)
        }
      }
    }

    // SOLE PARENT SUPPORT
    if (this.props.sole_parent_support) {
      if (dependants > 0) {
        sps_total += 19585.28;
      }
    }

    if (this.props.supported_living) {
      if (dependants > 1) {
        if (this.props.livedWithPartner) {
          sa_total += 13590.2;
        }
        if (!this.props.livedWithPartner) {
          sa_total += 22391.72;
        }
      } else if (dependants === 1) {
        if (this.props.livedWithPartner) {
          sa_total += 27180.4;
        }
      } else {
        // no children
        if (this.props.livedWithPartner) {
          sa_total += 12855.96;
        } else {
          // SINGLE
          sa_total += 15549.04;
        }
      }
    }
    // WAGE OR SALARY
    const firstTotal =
      sa_total +
        jss_total +
        sps_total +
        spl_total +
        (this.props.wos_total || 0) || 0;

    // OTHER INCOME
    const { incomeListStates } = this.props;
    const otherOptionValueStates = Object.keys(incomeListStates).filter(state =>
      /^otherOptionValue/.test(state),
    );
    const otherOptionValues = [];
    for (const key in incomeListStates) {
      if (otherOptionValueStates.indexOf(key) >= 0) {
        otherOptionValues.push(parseInt(incomeListStates[key], 0));
      }
    }
    const total =
      firstTotal +
      (otherOptionValues.length
        ? otherOptionValues.reduce((a, b) => a + b, 0)
        : 0);
    return total;
  }

  componentDidUpdate() {
    this.props.setTotalIncome(this.totalIncome());
  }

  render() {
    return (
      <div>
        <p>
          Income $<strong>{this.totalIncome().toString()}</strong>
        </p>
      </div>
    );
  }
}

export default connect()(IncomeListSection);
