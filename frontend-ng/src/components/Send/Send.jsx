import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoBulbOutline } from "react-icons/io5";

const Send = ({ sendMessage, connectedToRoom, usersInRoom }) => {
  const [message, setMessage] = useState("");

  const subtextColor = useColorModeValue("gray.600", "gray.400");
  const buttonColor = useColorModeValue("brand.600", "brand.800");

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

  let moreUsersInRoom = null;
  if (usersInRoom > 2) {
    moreUsersInRoom = ` with ${usersInRoom - 1} devices`;
  }
  return (
    <Box>
      <Box>
        <Heading as="h3" size="sm" mb={2}>
          Connected to Device
        </Heading>
        <Text fontSize={"sm"} color={subtextColor}>
          You are connected to the other device and can send text.
        </Text>
        <Text fontSize={"2xl"} fontWeight={"extrabold"} color={"brand.800"}>
          {connectedToRoom}
        </Text>
      </Box>
      <Flex py={2} direction="column">
        <Textarea
          placeholder="Enter the text to send"
          value={message}
          onChange={handleChange}
        />
        <Button
          type="submit"
          label="Send"
          color={"white"}
          bgColor={buttonColor}
          alignSelf="flex-start"
          my={2}
          onClick={() => sendThisMessage()}
          disabled={message === ""}
        >
          Send
        </Button>
      </Flex>
      <Text mt={2} fontSize={"sm"} color={subtextColor}>
        <Icon as={IoBulbOutline} />
        It&apos;s possible to send to multiple devices by also connecting them
        to the Device ID above.
      </Text>
    </Box>
  );
};

export default Send;
