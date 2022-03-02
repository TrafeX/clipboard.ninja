import { useEffect, useState } from "react";

const useSocketClient = (socket) => {

  const [messages, setMessages] = useState([]);
  const [ownRoomNumber, setOwnRoomNumber] = useState(null);
  const [connectedToRoom, setConnectedToRoom] = useState(null);
  const [status, setStatus] = useState('');
  const [usersInRoom, setUsersInRoom] = useState(0);

  useEffect(() => {

    socket.on('connect_error', () => {
      setStatus('Connection to server failed');
      setOwnRoomNumber(null);
    });
    socket.on('message', (message: string) => {
      setMessages(messages => [...messages, message]);
    });
    socket.on('registered', (room: number) => {
      setOwnRoomNumber(room);
    });
    socket.on('subscribed', (room: number, usersInRoom: number) => {
      setStatus(`Connected to device with ID ${room}`);
      setOwnRoomNumber(room);
      setConnectedToRoom(room);
      setUsersInRoom(usersInRoom);
    });
    socket.on('unsubscribed', (usersInRoom: number) => {
      if (usersInRoom <= 1) {
        // Only one left in room
        setStatus('The other device has disconnected');
        setConnectedToRoom(null);
      }
      setUsersInRoom(usersInRoom);
    });
    socket.on('deviceid-not-exists', () => {
      setStatus('Device ID doesn\'t exists. Enter the device ID of the other device')
      setConnectedToRoom(null);
      // @todo: Trigger error on Connect input element
    });

    // return () => {
    //   console.log('Disconnecting');
    //   socket.disconnect();
    // }
  }, [socket]);

  return {ownRoomNumber, connectedToRoom, status, usersInRoom, messages};
}

export default useSocketClient;