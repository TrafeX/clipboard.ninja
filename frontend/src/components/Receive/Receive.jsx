import { Box, Code, Flex, IconButton, List, Text, VStack } from "@chakra-ui/react";
import { toaster } from "components/ui/toaster";
import {
  IoCopyOutline,
  IoFileTrayOutline,
  IoReturnDownForwardSharp,
} from "react-icons/io5";

const copyMessage = async (message) => {
  try {
    await navigator.clipboard.writeText(message);
    toaster.create({ title: "Copied to clipboard", type: "success", duration: 2000 });
  } catch {
    toaster.create({ title: "Could not copy text", type: "error", duration: 3000 });
  }
};

const EmptyState = ({ connectedToRoom }) => (
  <VStack py={8} gap={2} color="fg.muted" textAlign="center">
    <Box fontSize="4xl" color="gray.400">
      <IoFileTrayOutline />
    </Box>
    <Text fontSize={{ base: "sm", lg: "md" }}>
      {connectedToRoom !== null
        ? "Waiting for incoming text…"
        : "Connect to a device to start receiving text"}
    </Text>
  </VStack>
);

const Receive = ({ receivedMessages, connectedToRoom }) => {
  if (!receivedMessages || receivedMessages.length === 0) {
    return (
      <Box>
        <EmptyState connectedToRoom={connectedToRoom} />
      </Box>
    );
  }

  return (
    <Box>
      <List.Root listStyleType="none">
        {receivedMessages.map((message, i) => (
          <List.Item key={i}>
            <Flex direction="row" align="start" gap={1}>
              <List.Indicator as={IoReturnDownForwardSharp} color={"brand.600"} />
              <Code style={{ whiteSpace: "pre-wrap" }} flex="1" fontSize={{ base: "sm", lg: "md" }}>
                {message}
              </Code>
              <IconButton
                variant="ghost"
                size="xs"
                color="fg.muted"
                onClick={() => copyMessage(message)}
                title="Copy text"
                aria-label="Copy text"
              >
                <IoCopyOutline />
              </IconButton>
            </Flex>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
};

export default Receive;
