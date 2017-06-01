// @flow
import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

type State = State;
type Props = {
  status: string
};

class Status extends Component<void, Props, State> {

  shouldComponentUpdate = (nextProps: Props) => {
    return nextProps.status !== '' && nextProps.status !== this.props.status;
  };

  render() {
    if (this.props.status === '') {
      return null;
    }
    return (
      <Snackbar
        open={true}
        message={this.props.status}
        autoHideDuration={4000}
      />
    );
  }
}

export default Status;
