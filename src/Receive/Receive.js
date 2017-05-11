// @flow
import React, { Component } from 'react';

const style = {
  ul: {
    textAlign: 'left',
  }
};

class Receive extends Component {
  props: {
    receivedMessages: Object,
  };

  render() {
    return (
      <div>
        <ul style={style.ul}>
        { this.props.receivedMessages.map((message, i) => {
          return <li key={i}><pre>{message}</pre></li>
        }) }
        </ul>
      </div>
    );
  }
}

export default Receive;
