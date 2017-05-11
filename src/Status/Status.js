// @flow
import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Status extends Component {
  props: {
    status: string
  };

  shouldComponentUpdate = (nextProps: Object) => {
    return nextProps.status !== this.props.status;
  };

  render() {
    console.log(`Status: ${this.props.status}`);
    return (
      <Snackbar
        open={true}
        message={this.props.status}
        autoHideDuration={3000}
      />
    );
  }
}

export default Status;
