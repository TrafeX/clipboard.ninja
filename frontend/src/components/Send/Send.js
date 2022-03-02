import React, { useState } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

const style = {
  button: {
    margin: 12
  },
  textfield: {
    textAlign: 'left',
  }
};

type Props = {
  sendMessage: (string) => void,
  connectedToRoom: ?number,
  usersInRoom: number,
  muiTheme: Object,
};

const Send = ({ sendMessage, connectedToRoom, usersInRoom, muiTheme }: Props) => {

  const [message, setMessage] = useState('');

  const sendThisMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };


  if (connectedToRoom === null) {
    return null;
  }

  let moreUsersInRoom = null;
  if (usersInRoom > 2) {
    moreUsersInRoom = ` with ${usersInRoom - 1} devices`;
  }
  return (
    <div>
      <h3>
        Connected to Device ID:&nbsp;
        <span style={{ color: muiTheme.palette.accent1Color }}>
          <strong>
            {connectedToRoom}
          </strong>
        </span>
        {moreUsersInRoom}
      </h3>
      <p>
        You're connected to the other device(s) and can start sending text!<br />
        <small>It's possible to send to multiple devices by also connecting them to the Device Id above.</small>
      </p>
      <TextField
        floatingLabelText="Enter the text to send"
        multiLine={true}
        rows={1}
        value={message}
        style={style.textfield}
        onChange={handleChange}
      />
      <br />
      <RaisedButton
        label="Send"
        primary={true}
        style={style.button}
        onClick={() => sendThisMessage()}
        disabled={message === ''}
      />
    </div>
  );
}

export default muiThemeable()(Send);
