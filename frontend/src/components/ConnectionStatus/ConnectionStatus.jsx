import { Box, HStack, Text } from "@chakra-ui/react";

// A glanceable connection-status chip derived from the socket state:
//  - Connecting: no Device ID yet (waiting for the server)
//  - Waiting:    registered, but not paired with another device
//  - Connected:  paired (shows the extra device count when >2 in the room)
const ConnectionStatus = ({ ownRoomNumber, connectedToRoom, usersInRoom }) => {
  let dotColor = "gray.400";
  let label = "Connecting…";
  let connected = false;

  if (connectedToRoom !== null) {
    dotColor = "green.500";
    label =
      usersInRoom > 2
        ? `Connected · ${usersInRoom - 1} devices`
        : "Connected";
    connected = true;
  } else if (ownRoomNumber !== null) {
    dotColor = "brand.400";
    label = "Waiting…";
  }

  return (
    <HStack
      gap={2}
      px={3}
      py={1}
      rounded="full"
      bg="bg.muted"
      borderWidth="1px"
      borderColor="border"
      flexShrink={0}
    >
      <Box
        as="span"
        w="10px"
        h="10px"
        rounded="full"
        bg={dotColor}
        flexShrink={0}
        css={
          connected
            ? {
                animation: "cn-pulse 1.8s ease-in-out infinite",
                "@keyframes cn-pulse": {
                  "0%, 100%": { opacity: 1, transform: "scale(1)" },
                  "50%": { opacity: 0.5, transform: "scale(0.75)" },
                },
              }
            : undefined
        }
      />
      <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
        {label}
      </Text>
    </HStack>
  );
};

export default ConnectionStatus;
