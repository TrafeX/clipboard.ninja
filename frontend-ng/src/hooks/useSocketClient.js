import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const useSocketClient = (socket) => {
  const [messages, setMessages] = useState([]);
  const [ownRoomNumber, setOwnRoomNumber] = useState(null);
  const [connectedToRoom, setConnectedToRoom] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState(0);
  const toast = useToast();

  useEffect(() => {
    socket.connect();
    socket.on("connect_error", () => {
      toast({
        title: "Connection to server failed",
        description: "Please try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
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
      toast({
        title: "Connected to device",
        description: `Connected to device with ID ${room}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
    socket.on("unsubscribed", (usersInRoom) => {
      if (usersInRoom <= 1) {
        // Only one left in room
        toast({
          title: "The other device has disconnected",
          description: "Please connect to another device",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        setConnectedToRoom(null);
      }
      setUsersInRoom(usersInRoom);
    });
    socket.on("deviceid-not-exists", () => {
      toast({
        title: "Device ID doesn't exists",
        description: "Enter the device ID of the other device",
        status: "error",
        duration: 9000,
        isClosable: true,
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

  return { ownRoomNumber, connectedToRoom, usersInRoom, messages };
};

export default useSocketClient;
