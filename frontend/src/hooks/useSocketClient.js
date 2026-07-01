import { toaster } from "components/ui/toaster";
import { useEffect, useState } from "react";

const useSocketClient = (socket) => {
  const [messages, setMessages] = useState([]);
  const [ownRoomNumber, setOwnRoomNumber] = useState(null);
  const [connectedToRoom, setConnectedToRoom] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState(0);

  useEffect(() => {
    socket.connect();
    socket.on("connect_error", () => {
      toaster.create({
        title: "Connection to server failed",
        description: "Please try again later",
        type: "error",
        duration: 9000,
        closable: true,
      });
      setOwnRoomNumber(null);
    });
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    socket.on("registered", (room) => {
      setOwnRoomNumber(room);
    });
    socket.on("subscribed", (room, usersInRoom) => {
      setOwnRoomNumber(room);
      setConnectedToRoom(room);
      setUsersInRoom(usersInRoom);
      toaster.create({
        title: "Connected to device",
        description: `Connected to device with ID ${room}`,
        type: "success",
        duration: 3000,
        closable: true,
      });
    });
    socket.on("unsubscribed", (usersInRoom) => {
      if (usersInRoom <= 1) {
        // Only one left in room
        toaster.create({
          title: "The other device has disconnected",
          description: "Please connect to another device",
          type: "warning",
          duration: 9000,
          closable: true,
        });
        setConnectedToRoom(null);
      }
      setUsersInRoom(usersInRoom);
    });
    socket.on("deviceid-not-exists", () => {
      toaster.create({
        title: "Device ID doesn't exists",
        description: "Enter the device ID of the other device",
        type: "error",
        duration: 9000,
        closable: true,
      });
      setConnectedToRoom(null);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("message");
      socket.off("registered");
      socket.off("subscribed");
      socket.off("unsubscribed");
      socket.off("deviceid-not-exists");

      socket.disconnect();
    };
  }, []);

  // Leave the current room and start a fresh session. The backend has no
  // "leave" event, so we drop the socket and reconnect: this unsubscribes us
  // server-side and re-registers with a new Device ID.
  const disconnect = () => {
    setConnectedToRoom(null);
    setUsersInRoom(0);
    setMessages([]);
    setOwnRoomNumber(null);
    socket.disconnect();
    socket.connect();
  };

  return { ownRoomNumber, connectedToRoom, usersInRoom, messages, disconnect };
};

export default useSocketClient;
