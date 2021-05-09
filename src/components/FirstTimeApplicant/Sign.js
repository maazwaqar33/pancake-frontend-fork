import React, {Fragment} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import '../../styles/RadioGroup.css';
import '../../styles/CheckboxGroup.css';
import '../../styles/FormValidation.css';
import axios from 'axios';
import config from '../../config';
import Accordian from '../Forms/Accordian';
import SignatureCanvas from 'react-signature-canvas';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicant_role: '',
      complete: false,
      error: false,
      fields: {},
      lng: 'en',
      page: 2,
      shown: false,
      signature_by_applicant: '',
      signature_by_witness: '',
      signature: '',
      witness_name: '',
      witness_role: ''
    };
  }

  componentDidMount() {
    axios
      .get(`${config.API_ORIGIN}/api/v1/rebate_forms/${this.props.match.params.id}`)
      .then(res => this.setState({fields: res.data.data.attributes.fields, rebate: res.data.data.attributes.rebate}))
      .catch(err => this.setState({error: true}));
  }

  submitSignature = () => {
    ['applicant', 'witness'].forEach(item => {
      let getData = this.getData(item);
      let getPayload = this.getPayload(getData);
      this.postSignature(getPayload);
      this.setState({complete: true});
    })
  }

  getData = sign_type => {
    let data = (sign_type === 'witness' ? {
      "signature": this.state.signature_by_witness,
      "role": this.state.witness_role,
      "name": this.state.witness_name,
      "type": sign_type
    } : {
      "signature": this.state.signature_by_applicant,
      "role": this.state.applicant_role,
      "name": this.state.fields.full_name,
      "type": sign_type
    });
    return data;
  }

  postSignature = data => {
    axios
      .post(`${config.API_ORIGIN}/api/v1/signatures`, {data})
      .then(res => res)
      .catch(err => console.log('Error occurred: COULD NOT POST SIGNATURE', err));
  }


  getPayload = data => {
    const {type, name, role } = data;
    return {
      "type": "signaturess",
      "attributes": {
        "token": this.props.match.params.id,
        type,
        name,
        role,
        "image": data.signature.split(',')[1]
      }
    };
  }
  render() {
    const {handleSubmit} = this.props
    return (
      <Fragment>
        {!this.state.error && <div className="container">
          <h2>Rates Rebates application for 2018/2019</h2>
          <p>My name is <strong>{this.state.fields.full_name}</strong>.</p>
          <p>My Address is <strong>{this.state.fields.address}</strong> and I lived here on 1 July 2018.</p>
          <p>My 2018/2019 rates bill (including water) is $<strong>{this.state.fields.rates_bill}</strong>.</p>
          <p>I have {this.state.fields.dependants} dependant(s)</p>
          <p>The combined income of myself and joint-owners and partners living with me on 1 July 2018 for the 2017/2018 tax year was $<strong>{this.state.fields.income}</strong></p>

          {this.state.rebate &&
            <Fragment>
            <h3>Rebate Claimed</h3>
            <p>Your claimed rebate is <strong className="rebate-amount">${this.state.rebate}</strong></p>
            </Fragment>
          }

          {!this.state.complete &&
            <Fragment>
              <h2>Sign here</h2>

              <form onSubmit={handleSubmit(this.submitSignature)} className="container form-inner">
                <Accordian
                  label="It is an offence to knowingly make a false statement in your application"
                  text="Section 14 of the Rates Rebate Act 1973<br/>14. Offences <ul><li>(1) Every person commits an offence who
                  for the purpose of obtaining any rates rebate under this Act, for himself or for any other person, makes any statement or declaration knowing it to be false in any particular, or wilfully misleads or attempts to mislead any person concerned in the administration of this Act or any other person whatsoever; or </li><li>(b) refuses or fails to comply with any requirement under section 11, or refuses or fails to answer any question put to him pursuant to that section, or knowingly gives any false or misleading answer to any such question.</li><li>(2) Every person who commits an offence against this Act is liable on conviction before a District Court Judge to imprisonment for a term not
                  exceeding 12 months or to a fine not exceeding $500, or to both.</li></ul>"
                />
                <h3 style={{marginTop: '80px'}}>Applicant</h3>
                <p>I <b>{this.state.fields.full_name}</b> of <b>{this.state.fields.address}</b>, solemnly and sincerely
                  declare that I believe the information I have given on this form is true and
                  correct, and I make this solemn declaration conscientiously believing the same
                  to be true and by virtue of the Oaths and Declarations Act 1957.
                </p>
                <SignatureCanvas
                  onEnd={()=>this.setState({signature_by_applicant: this.sigCanvas.toDataURL()})}
                  penColor='black' ref={(ref) => { this.sigCanvas = ref }} canvasProps={{width: 500, height: 300, className: 'sigCanvas'}}
                />
                <div><a onClick={()=>{this.sigCanvas.clear()}}>Clear</a></div>

                <h3>Witness</h3>
                <p>Declared at {new Date().toLocaleString()} before me</p>
                <div style={{margin: '30px 0'}}>
                  <label>Witness Name</label>
                  <WitnessField
                    onChange={e=>this.setState({witness_name: e.target.value})}
                    name="witness_name"
                  />
                  <label>Role</label>
                  <WitnessField
                    onChange={e=>this.setState({witness_role: e.target.value})}
                    name="witness_role"
                  />
                </div>
                <SignatureCanvas
                  onEnd={()=>this.setState({signature_by_witness: this.sigCanvas2.toDataURL()})}
                  penColor='black' ref={(ref) => { this.sigCanvas2 = ref }} canvasProps={{width: 500, height: 300, className: 'sigCanvas'}} />
                <div><a onClick={()=>{this.sigCanvas2.clear()}}>Clear</a></div>
                {this.state.signature_by_applicant && this.state.signature_by_witness &&
                  <Submit/>
                }
                </form>
              </Fragment>
            }
            {this.state.complete && <Foot/>}
        </div>}
        {this.state.error && <div className="container"><h2>Oops, this application does not exist.</h2></div>}
      </Fragment>
    )
  }
}



const WitnessField = props => {
  return <input type="text" name={props.name} onChange={props.onChange} />
}

const Submit = () => {
  return (
    <div>
      <button type="submit" className="next btn-primary">
        Submit Signatures
      </button>
    </div>
  );
}

const Foot = () => {
  return (
    <div>
      <h2 className="heading-secondary">Signatures Accepted</h2>
    </div>
  );
}

Sign = reduxForm({
  form: 'wizard',
  // onSubmitFail: (errors) => scrollToFirstError(errors),
})(Sign)

Sign = connect(state => {
  return {
    formState: state,
    // validate
  }
})(Sign)

export default Sign
