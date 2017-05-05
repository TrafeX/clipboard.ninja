// @todo
import React, { Component } from 'react';

import './index.css';

class Receive extends Component {
  props: {
    receivedMessage: string,
  };

  render() {
    return (
      <div className="Receive">
        <h3>Receive</h3>
        { this.props.receivedMessage }
      </div>
    );
  }
}

export default Receive;
