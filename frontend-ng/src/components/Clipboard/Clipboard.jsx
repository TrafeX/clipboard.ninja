import React, { useContext } from "react";
import Send from "../Send";
import Receive from "../Receive";
import Connect from "../Connect";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { SocketContext } from "../../context/SocketContext";
// import { useMatomo } from '@datapunt/matomo-tracker-react';

const Clipboard = ({
  ownRoomNumber,
  connectedToRoom,
  usersInRoom,
  messages,
}) => {
  const socket = useContext(SocketContext);

  // const { trackEvent } = useMatomo();

  const sendMessage = (message) => {
    socket.emit("publish", message);
    const event = {
      category: "user-interaction",
      action: "publish-message",
    };
    // trackEvent(event);
  };

  const connectToRoom = (room) => {
    socket.emit("join", room);
    const event = {
      category: "user-interaction",
      action: "connect-to-device",
    };
    // trackEvent(event);
  };

  const cardBgColor = useColorModeValue("white", "gray.700");

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} padding={8}>
      <Card
        bg={cardBgColor}
        boxShadow={"lg"}
        p={{ sm: 3, md: 5 }}
        rounded={"md"}
      >
        <CardHeader pb={{base: 0, lg: 1}}>
          <Heading size="md">Connect & send</Heading>
          <Text fontSize={"sm"}>
            First you need to connect to the other device by entering the Device
            ID
          </Text>
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>
      <Card boxShadow={"lg"} p={5} rounded={"md"}>
        <CardHeader pb={{base: 0, lg: 1}}>
          <Heading size="md">Received text</Heading>
          <Text fontSize={"sm"}>
            Once connected, the text you receive from the other device will be
            shown here
          </Text>
        </CardHeader>
        <CardBody>
          <Receive receivedMessages={messages} />
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default Clipboard;
