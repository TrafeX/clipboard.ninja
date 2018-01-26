// @flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import spinner from 'most-awesome-spinner-ever';

const style = {
  button: {
    margin: 12,
  },
};

type Props = {
  ownRoomNumber: ?number,
  connectedToRoom: ?number,
  connectToRoom: (number) => void,
  muiTheme: Object,
};
type State = {
  roomNumber: string,
  spinner: string,
  spinnerId: ?IntervalID,
};

class Connect extends Component<Props, State> {
  state = {
    roomNumber: '',
    spinner: '',
    spinnerId: null,
  };

  componentDidMount = () => {
    if (this.props.ownRoomNumber === null) {
      this.startSpinner();
    }
  };

  componentWillUnmount = () => {
    this.stopSpinner();
  };

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.ownRoomNumber !== this.props.ownRoomNumber) {
      if (nextProps.ownRoomNumber === null) {
        this.startSpinner();
      } else {
        this.stopSpinner();
      }
    }
  };

  startSpinner = () => {
    this.setState({
      spinnerId: spinner((char) => {
        this.setState({
            spinner: char,
          }
        )}, 200)
    })
  };

  stopSpinner = () => {
    if (this.state.spinnerId !== null) {
      clearInterval(this.state.spinnerId);
    }
  };

  connectToRoom = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (this.state.roomNumber === '' || isNaN(this.state.roomNumber)) {
      return;
    }
    this.props.connectToRoom(parseInt(this.state.roomNumber, 10));
  };

  handleChange = (event: SyntheticInputEvent<HTMLButtonElement>) => {
    this.setState({
      roomNumber: event.target.value,
    })
  };

  render() {
    if (this.props.connectedToRoom !== null) {
      return null;
    }

    let ownRoomNumber = this.props.ownRoomNumber;
    if (ownRoomNumber === null) {
      ownRoomNumber = `Waiting for server connection.. ${this.state.spinner}`;
    }
    return (
      <div>
        <h3>
          Device ID:&nbsp;
          <span style={{color: this.props.muiTheme.palette.accent1Color}}>
            <strong>
              {ownRoomNumber}
            </strong>
          </span>
        </h3>
        <p>
          Use the Device ID above to connect to the other device.
          Or enter the Device ID of the other device below.
        </p>
        <form onSubmit={this.connectToRoom}>
          <TextField
            type="number"
            floatingLabelText="Enter the device ID"
            value={this.state.roomNumber}
            onChange={this.handleChange}
            disabled={this.props.ownRoomNumber === null}
          />
          <RaisedButton
            type="submit"
            label="Connect"
            primary={true}
            style={style.button}
            disabled={this.state.roomNumber === null}
          />
        </form>
      </div>
    );
  }
}

export default muiThemeable()(Connect);
