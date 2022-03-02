import React, { useContext } from 'react';
import Send from '../Send';
import Receive from '../Receive';
import Connect from '../Connect';
import { blueGrey400 } from 'material-ui/styles/colors';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import ReactGA from 'react-ga';
import { SocketContext } from '../../context/SocketContext';

const style = {
  cardLeft: {
    flex: '1 1 400px',
    textAlign: 'center',
    margin: 10,
  },
  cardRight: {
    flex: '1 1 400px',
    textAlign: 'center',
    margin: 10,
  },
  footer: {
    color: 'white',
    margin: 10,
    paddingLeft: 10,
  },
  a: {
    color: 'white',
  },
  background: {
    backgroundColor: blueGrey400,
    paddingBottom: 10,
    height: 240,
  }
};

const Clipboard = ({ownRoomNumber, connectedToRoom, usersInRoom, messages}) => {

  const socket = useContext(SocketContext);

  // componentWillUnmount = () => {
  //   this.socket.disconnect();
  // };

  const sendMessage = (message: string) => {
    socket.emit('publish', message);
    ReactGA.event({
      category: 'user-interaction',
      action: 'publish-message'
    });
  };

  const connectToRoom = (room: ?number) => {
    socket.emit('join', room);
    ReactGA.event({
      category: 'user-interaction',
      action: 'connect-to-device'
    });
  };

  return (
    <div className="container">
      <Card style={style.cardLeft}>
        <CardTitle
          title="Connect & Send"
          subtitle="First you need to connect to the other device by entering the Device ID"
        />
        <CardText style={{ paddingTop: 0 }}>
          <Connect
            ownRoomNumber={ownRoomNumber}
            connectedToRoom={connectedToRoom}
            connectToRoom={connectToRoom}
          />
          <Send
            connectedToRoom={connectedToRoom}
            sendMessage={sendMessage}
            usersInRoom={usersInRoom}
          />
        </CardText>
      </Card>
      <Card style={style.cardRight}>
        <CardTitle
          title="Received text"
          subtitle="The text you send to and receive from the other device will be shown here"
        />
        <CardText>
          <Receive
            receivedMessages={messages}
          />
        </CardText>
      </Card>
    </div>
  );
}

export default Clipboard;
