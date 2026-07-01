import Clipboard from "components/Clipboard";
import { SocketContext } from "context/SocketContext";
import useSocketClient from "hooks/useSocketClient";
import { siteUrl } from "lib/faq";
import { NextSeo, SoftwareAppJsonLd } from "next-seo";
import { useContext } from "react";

export default function Home() {
  const socket = useContext(SocketContext);

  const { ownRoomNumber, connectedToRoom, usersInRoom, messages, disconnect } =
    useSocketClient(socket);
  return (
    <>
      <NextSeo canonical={siteUrl} />
      <SoftwareAppJsonLd
        name="Clipboard.ninja"
        price="0"
        priceCurrency="EUR"
        applicationCategory="UtilitiesApplication"
        operatingSystem="Any"
      />
      <Clipboard
        ownRoomNumber={ownRoomNumber}
        connectedToRoom={connectedToRoom}
        usersInRoom={usersInRoom}
        messages={messages}
        disconnect={disconnect}
      />
    </>
  );
}
