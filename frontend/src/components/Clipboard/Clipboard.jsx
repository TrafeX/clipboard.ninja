import { Card, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { push } from "@socialgouv/matomo-next";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import Connect from "../Connect";
import ConnectionStatus from "../ConnectionStatus";
import Receive from "../Receive";
import Send from "../Send";

const Clipboard = ({
  ownRoomNumber,
  connectedToRoom,
  usersInRoom,
  messages,
  disconnect,
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

  const isConnected = connectedToRoom !== null;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} padding={8}>
      <Card.Root
        boxShadow={"lg"}
        p={{ sm: 3, md: 5 }}
        rounded={"md"}
        borderTopWidth={isConnected ? "3px" : undefined}
        borderTopColor={isConnected ? "green.500" : undefined}
      >
        <Card.Header pb={{ base: 0, lg: 1 }}>
          <Flex justify="space-between" align="center" gap={3} wrap="wrap">
            <Heading size={{ base: "md", lg: "lg" }}>Connect & send</Heading>
            <ConnectionStatus
              ownRoomNumber={ownRoomNumber}
              connectedToRoom={connectedToRoom}
              usersInRoom={usersInRoom}
            />
          </Flex>
          <Text fontSize={{ base: "sm", lg: "md" }}>
            Open this app on both devices. On one device, enter the other
            device&apos;s ID to connect, then send text instantly.
          </Text>
        </Card.Header>
        <Card.Body>
          {/* Key on the Device ID so disconnecting (which re-registers with a
              new ID) remounts Connect with a cleared input. */}
          <Connect
            key={`connect-${ownRoomNumber}`}
            ownRoomNumber={ownRoomNumber}
            connectedToRoom={connectedToRoom}
            connectToRoom={connectToRoom}
          />
          <Send
            connectedToRoom={connectedToRoom}
            sendMessage={sendMessage}
            usersInRoom={usersInRoom}
            disconnect={disconnect}
          />
        </Card.Body>
      </Card.Root>
      <Card.Root boxShadow={"lg"} p={{ sm: 3, md: 5 }} rounded={"md"}>
        <Card.Header pb={{ base: 0, lg: 1 }}>
          <Heading size={{ base: "md", lg: "lg" }}>Received text</Heading>
          <Text fontSize={{ base: "sm", lg: "md" }}>
            {isConnected
              ? "Text sent from the other device appears here instantly."
              : "Once connected, the text you receive from the other device will be shown here"}
          </Text>
        </Card.Header>
        <Card.Body>
          <Receive receivedMessages={messages} connectedToRoom={connectedToRoom} />
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
};

export default Clipboard;
