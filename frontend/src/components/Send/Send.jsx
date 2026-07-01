import { Box, Button, Flex, Heading, Icon, Text, Textarea } from "@chakra-ui/react";
import { push } from "@socialgouv/matomo-next";
import { useState } from "react";
import { IoBulb, IoExitOutline, IoSend } from "react-icons/io5";
import DeviceId from "../DeviceId";

const Send = ({ sendMessage, connectedToRoom, usersInRoom, disconnect }) => {
  const [message, setMessage] = useState("");

  const sendThisMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleDisconnect = () => {
    push(["trackEvent", "user-interaction", "disconnect"]);
    disconnect();
  };

  if (connectedToRoom === null) {
    return null;
  }

  return (
    <Box>
      <Box>
        <Heading as="h3" size={{ base: "sm", lg: "md" }} mb={2}>
          Connected to Device
        </Heading>
        <Text fontSize={{ base: "sm", lg: "md" }} color={"fg.muted"}>
          You are connected to the other {usersInRoom > 2 ? `${usersInRoom-1} devices` : 'device'} and can send text.
        </Text>
        <DeviceId value={connectedToRoom} copyable />
      </Box>
      <Flex py={2} direction="column">
        <Textarea
          placeholder="Enter the text to send"
          value={message}
          onChange={handleChange}
          fontSize={{ base: "md", lg: "lg" }}
        />
        <Flex mt={2} gap={2} wrap="wrap">
          <Button
            type="submit"
            colorPalette={"brand"}
            fontSize={{ base: "md", lg: "lg" }}
            onClick={() => sendThisMessage()}
            disabled={message.length === 0}
          >
            <IoSend />
            Send
          </Button>
          <Button
            variant="outline"
            fontSize={{ base: "md", lg: "lg" }}
            onClick={handleDisconnect}
          >
            <IoExitOutline />
            Disconnect
          </Button>
        </Flex>
      </Flex>
      <Flex mt={2} gap={2} align="start" color={"fg.muted"}>
        <Icon size="md" color={"brand.500"} flexShrink={0} mt="2px">
          <IoBulb />
        </Icon>
        <Text fontSize={{ base: "sm", lg: "md" }}>
          It&apos;s possible to send to multiple devices by also connecting them
          to the Device ID above.
        </Text>
      </Flex>
    </Box>
  );
};

export default Send;
