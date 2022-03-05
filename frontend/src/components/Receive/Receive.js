// @flow
import React from 'react';

const style = {
  ul: {
    textAlign: 'left',
  }
};

type Props = {
  receivedMessages: Array<string>,
}

const Receive = ({receivedMessages}: Props) => (
  <div>
    <ul style={style.ul}>
    { receivedMessages && receivedMessages.map((message, i) => {
      return <li key={i}><pre>{message}</pre></li>
    }) }
    </ul>
  </div>
);

export default Receive;
