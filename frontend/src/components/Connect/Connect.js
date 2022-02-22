// @flow
import React, { useEffect, useState } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import spinner from 'most-awesome-spinner-ever';

const style = {
  button: {
    margin: 12,
  },
};

const Connect = ({ownRoomNumber, connectedToRoom, connectToRoom, muiTheme}) => {

  const [roomNumber, setRoomNumber] = useState('');
  const [spinnerChar, setSpinnerChar] = useState('');
  const [spinnerId, setSpinnerId] = useState(null);

  useEffect(() => {

    const startSpinner = () => {
      setSpinnerId(spinner((char) => setSpinnerChar(char), 200));
    };

    const stopSpinner = () => {
      if (spinnerId !== null) {
        clearInterval(spinnerId);
      }
    };

    if (ownRoomNumber === null) {
      startSpinner();
    } else {
      stopSpinner();
    }

  }, [ownRoomNumber, spinnerId]);

  const handleConnectToRoom = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (roomNumber === '' || isNaN(roomNumber)) {
      return;
    }
    connectToRoom(parseInt(roomNumber, 10));
  };

  const handleChange = (event: SyntheticInputEvent<HTMLButtonElement>) => setRoomNumber(event.target.value);

  if (connectedToRoom !== null) {
    return null;
  }

  console.log('Connect: room nr:', ownRoomNumber);
  if (ownRoomNumber === null) {
    ownRoomNumber = `Waiting for server connection.. ${spinnerChar}`;
  }

  return (
    <div>
      <h3>
        Device ID:&nbsp;
        <span style={{color: muiTheme.palette.accent1Color}}>
          <strong>
            {ownRoomNumber}
          </strong>
        </span>
      </h3>
      <p>
        Use the Device ID above to connect to the other device.
        Or enter the Device ID of the other device below.
      </p>
      <form onSubmit={handleConnectToRoom}>
        <TextField
          type="number"
          floatingLabelText="Enter the device ID"
          value={roomNumber}
          onChange={handleChange}
          disabled={ownRoomNumber === null}
        />
        <RaisedButton
          type="submit"
          label="Connect"
          primary={true}
          style={style.button}
          disabled={roomNumber === null}
        />
      </form>
    </div>
  );
}

export default muiThemeable()(Connect);
