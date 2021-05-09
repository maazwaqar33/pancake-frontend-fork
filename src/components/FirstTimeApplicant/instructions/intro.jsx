import React from 'react';
import Accordian from '../../Forms/Accordian';

class Intro extends React.Component {
  render() {
    return (
      <section>
        <h2 className="heading-secondary">
          Online rates rebates applications are now open exclusively for
          Tauranga residents
          <br />
        </h2>
        <p>
          <strong>
            If you are a low-income homeowner you could get a discount or
            partial refund of up to $630 on your property rates with a rates
            rebate.
          </strong>
          <br />
          <span>
            Mehemea he tangata whai whare koe e iti ana ngā whiwhinga moni, ka
            taea pea te whakamāmā, te whakahoki utu rānei, tae atu ki te $630 te
            rahi, mō ngā reiti whenua mā te kaupapa whakamāmā reiti.{' '}
          </span>
        </p>
        <Accordian
          label="<strong>What is a rates rebate?</strong> <br/><span>He aha te whakamāmā reiti?</span>"
          text="<p>Rates rebates are a subsidy that gives you a discount on the rates bill of your residential property.</p><p>Any homeowner may receive a rebate for the property they live in, as long as
            they meet the criteria. This is calculated by your property rates, your income
            for the 2017 to 2018 tax year, and the number of dependants you have. If you have
            dependants, the upper threshold of your income can be $500 more for each
            dependant in your care. For example, if you have 2 children, the top limit of
            how much you could earn to be entitled to the full rebate would be $1000 more
            than someone with no dependants.</p>"
        />
        <h2 className="heading-secondary">
          Find out if you could get a rebate
          <br />
          <span>Tirohia mehemea ka taea ō reiti te whakamāmā</span>
        </h2>
        <p>
          <strong>Use our online calculator.</strong>
          <br />
          This calculator uses public information on property rates. <br />
          Any information you enter is not stored. <br />
          If you choose to apply, the information from the calculator will be
          used to pre-fill part of your application for you.{' '}
        </p>
      </section>
    );
  }
}

export default Intro;
