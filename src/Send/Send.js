// @flow
import React, { Component } from 'react';
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

class Send extends Component {
  props: {
    sendMessage: (string) => void,
    connectedToRoom: ?number,
    usersInRoom: number,
    muiTheme: Object,
  };
  state = {
    message: '',
  };

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
    this.setState({
      message: '',
    })
  };

  handleChange = (event: Object) => {
    this.setState({
      message: event.target.value,
    })
  };

  render() {
    if (this.props.connectedToRoom === null) {
      return null;
    }
    let moreUsersInRoom = null;
    if (this.props.usersInRoom > 2) {
      moreUsersInRoom =  ` with ${this.props.usersInRoom-1} devices`;
    }
    return (
      <div>
        <h3>
          Connected to Device ID:&nbsp;
          <span style={{color: this.props.muiTheme.palette.accent1Color}}>
            <strong>
              {this.props.connectedToRoom}
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
          value={this.state.message}
          style={style.textfield}
          onChange={this.handleChange}
        />
        <br />
        <RaisedButton
          label="Send"
          primary={true}
          style={style.button}
          onClick={() => this.sendMessage()}
          disabled={this.state.message === ''}
        />
      </div>
    );
  }
}

export default muiThemeable()(Send);
