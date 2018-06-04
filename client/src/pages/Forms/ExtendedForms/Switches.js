import React, { Component } from 'react';
// import SwitchControl from 'components/Switch';

class Switches extends Component {
  state = {
    defaultSwitch: false,
    plainSwitch: false,
    iconSwitch: true
  }

  render() {
    let {
      defaultSwitch,
      plainSwitch,
      iconSwitch
    } = this.state;

    return (
      <div className="row">
        <div className="col-md-6">
          <legend>Switches</legend>
          <div className="col-md-4">
            <p>Regular:</p>
            ''
          </div>
          <div className="col-md-4">
            <p>Plain:</p>
            ''
          </div>
          <div className="col-md-4">
            <p>With icons:</p>
            ''
          </div>
        </div>
      </div>
    );
  }
}

export default Switches;