import { Box, Button, Flex, Heading, Icon, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { IoBulbOutline } from "react-icons/io5";
import DeviceId from "../DeviceId";

const Send = ({ sendMessage, connectedToRoom, usersInRoom }) => {
  const [message, setMessage] = useState("");

  const sendThisMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  if (connectedToRoom === null) {
    return null;
  }

  return (
    <Box>
      <Box>
        <Heading as="h3" size="sm" mb={2}>
          Connected to Device
        </Heading>
        <Text fontSize={"sm"} color={"fg.muted"}>
          You are connected to the other {usersInRoom > 2 ? `${usersInRoom-1} devices` : 'device'} and can send text.
        </Text>
        <DeviceId value={connectedToRoom} />
      </Box>
      <Flex py={2} direction="column">
        <Textarea
          placeholder="Enter the text to send"
          value={message}
          onChange={handleChange}
        />
        <Button
          type="submit"
          colorPalette={"brand"}
          fontSize="md"
          alignSelf="flex-start"
          my={2}
          onClick={() => sendThisMessage()}
          disabled={message.length === 0}
        >
          Send
        </Button>
      </Flex>
      <Text mt={2} fontSize={"sm"} color={"fg.muted"}>
        <Icon>
          <IoBulbOutline />
        </Icon>
        It&apos;s possible to send to multiple devices by also connecting them
        to the Device ID above.
      </Text>
    </Box>
  );
};

export default Send;
