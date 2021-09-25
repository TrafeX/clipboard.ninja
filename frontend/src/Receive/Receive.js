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

const Receive = (props: Props) => (
  <div>
    <ul style={style.ul}>
    { props.receivedMessages.map((message, i) => {
      return <li key={i}><pre>{message}</pre></li>
    }) }
    </ul>
  </div>
);

export default Receive;
