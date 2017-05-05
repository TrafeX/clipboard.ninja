// @flowindex
import React, { Component } from 'react';

import './index.css';

class Send extends Component {
  message: Object;
  props: {
    sendMessage: Function,
  };

  sendMessage = () => {
    this.props.sendMessage(this.message.value);
  };

  render() {
    return (
      <div className="Send">
        <h3>Send</h3>
        <input ref={(input: Object) => { this.message = input; }} />
        <input type="submit" onClick={() => this.sendMessage()} />
      </div>
    );
  }
}

export default Send;
