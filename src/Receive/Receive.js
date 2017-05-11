// @flow
import React, { Component } from 'react';

const style = {
  ul: {
    textAlign: 'left',
  }
};

class Receive extends Component {
  props: {
    receivedMessage: Object,
  };

  render() {
    return (
      <div>
        <ul style={style.ul}>
        { this.props.receivedMessage.map((message, i) => {
          return <li key={i}><pre>{message}</pre></li>
        }) }
        </ul>
      </div>
    );
  }
}

export default Receive;
