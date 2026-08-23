import { toaster } from "components/ui/toaster";
import { useEffect, useState } from "react";

// Shared by the "failed" and "restored" toasts so the latter replaces the former.
const CONNECTION_TOAST_ID = "connection-status";

const useSocketClient = (socket) => {
  const [messages, setMessages] = useState([]);
  const [ownRoomNumber, setOwnRoomNumber] = useState(null);
  const [connectedToRoom, setConnectedToRoom] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState(0);
  // Losing the connection ends the session: the backend has no resumption, so a
  // reconnect re-registers with a brand-new Device ID and is no longer paired.
  // Messages are deliberately kept — a network blip shouldn't wipe received text.
  const resetSession = () => {
    setOwnRoomNumber(null);
    setConnectedToRoom(null);
    setUsersInRoom(0);
  };

  useEffect(() => {
    socket.connect();
    // The manager's "reconnect" fires only after a *successful* reconnection,
    // never on the first connect, so there's nothing to announce on startup.
    socket.io.on("reconnect", () => {
      toaster.create({
        id: CONNECTION_TOAST_ID,
        title: "Connection restored",
        description: "You have a new Device ID",
        type: "success",
        duration: 3000,
        closable: true,
      });
    });
    socket.on("disconnect", () => {
      resetSession();
    });
    socket.on("connect_error", () => {
      // Retries fire this on *every* attempt. The shared toast id collapses them
      // into a single toast (the store upserts on a matching id), and staying
      // quiet while the page is hidden keeps a backgrounded WebView from leaving
      // a stale error behind for the user to find on resume.
      if (document.visibilityState === "visible") {
        toaster.create({
          id: CONNECTION_TOAST_ID,
          title: "Connection to server failed",
          description: "Please try again later",
          type: "error",
          duration: 9000,
          closable: true,
        });
      }
      resetSession();
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
        id: "device-connected",
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
          id: "device-disconnected",
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
        id: "deviceid-not-exists",
        title: "Device ID doesn't exists",
        description: "Enter the device ID of the other device",
        type: "error",
        duration: 9000,
        closable: true,
      });
      setConnectedToRoom(null);
    });

    return () => {
      socket.io.off("reconnect");
      socket.off("disconnect");
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
    resetSession();
    setMessages([]);
    socket.disconnect();
    socket.connect();
  };

  return { ownRoomNumber, connectedToRoom, usersInRoom, messages, disconnect };
};

export default useSocketClient;
