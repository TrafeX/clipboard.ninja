import Clipboard from "components/Clipboard";
import { SocketContext } from "context/SocketContext";
import useSocketClient from "hooks/useSocketClient";
import { NextSeo } from "next-seo";
import { useContext } from "react";

export default function Home() {
  const socket = useContext(SocketContext);

  const { ownRoomNumber, connectedToRoom, usersInRoom, messages } = useSocketClient(socket);
  return (
    <>
      <NextSeo canonical="https://clipboard.ninja" />
      <Clipboard
        ownRoomNumber={ownRoomNumber}
        connectedToRoom={connectedToRoom}
        usersInRoom={usersInRoom}
        messages={messages}
      />
    </>
  );
}
