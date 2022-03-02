import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const Status = ({status}) => {

  const [lastMessage, setLastMessage] = useState('');

  return (
    <Snackbar
      open={status !== lastMessage}
      onClose={() => setLastMessage(status)}
      message={status}
      autoHideDuration={4000}
    />
  );
};

export default Status;
