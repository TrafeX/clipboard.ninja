// @flow
import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class Status extends Component {
  props: {
    status: string
  };

  shouldComponentUpdate = (nextProps: Object) => {
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
