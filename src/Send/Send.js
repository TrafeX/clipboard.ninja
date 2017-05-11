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
    connectedToRoom: string,
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
    if (this.props.connectedToRoom === '') {
      return null;
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
        </h3>
        <TextField
          floatingLabelText="Enter text to send to the receiver"
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
