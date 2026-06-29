import { Card, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { push } from "@socialgouv/matomo-next";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import Connect from "../Connect";
import Receive from "../Receive";
import Send from "../Send";

const Clipboard = ({
  ownRoomNumber,
  connectedToRoom,
  usersInRoom,
  messages,
}) => {
  const socket = useContext(SocketContext);

  const sendMessage = (message) => {
    socket.emit("publish", message);
    push(["trackEvent", "user-interaction", "publish-message"]);
  };

  const connectToRoom = (room) => {
    socket.emit("join", room);
    push(["trackEvent", "user-interaction", "connect-to-device"]);
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} padding={8}>
      <Card.Root boxShadow={"lg"} p={{ sm: 3, md: 5 }} rounded={"md"}>
        <Card.Header pb={{ base: 0, lg: 1 }}>
          <Heading size="md">Connect & send</Heading>
          <Text fontSize={"sm"}>
            Open this app on both devices and connect to the other device by
            entering the Device ID
          </Text>
        </Card.Header>
        <Card.Body>
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
        </Card.Body>
      </Card.Root>
      <Card.Root boxShadow={"lg"} p={5} rounded={"md"}>
        <Card.Header pb={{ base: 0, lg: 1 }}>
          <Heading size="md">Received text</Heading>
          <Text fontSize={"sm"}>
            Once connected, the text you receive from the other device will be
            shown here
          </Text>
        </Card.Header>
        <Card.Body>
          <Receive receivedMessages={messages} />
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
};

export default Clipboard;
