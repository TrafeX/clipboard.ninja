import {
  Box,
  Button,
  Flex,
  Heading,
  NumberInput,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import DeviceId from "../DeviceId";

const Connect = ({ ownRoomNumber, connectedToRoom, connectToRoom }) => {
  const [roomNumber, setRoomNumber] = useState("");

  const handleConnectToRoom = (event) => {
    event.preventDefault();

    if (roomNumber === "" || isNaN(roomNumber)) {
      return;
    }
    connectToRoom(parseInt(roomNumber, 10));
  };

  const handleChange = (event) => {
    setRoomNumber(event.target.value);
  };

  if (connectedToRoom !== null) {
    return null;
  }

  return (
    <SimpleGrid
      columns={{ base: 1, xl: 2 }}
      gap={{ base: 4, xl: 8 }}
      alignItems={"start"}
    >
      <Box>
        <Heading as="h3" size="sm" mb={2}>
          This Device ID
        </Heading>
        <Text fontSize={"sm"} color={"fg.muted"}>
          Share this ID with your other device so it can connect to you.
        </Text>

        {ownRoomNumber ? (
          <DeviceId value={ownRoomNumber} />
        ) : (
          <Text fontSize={"md"} fontWeight={"extrabold"} color={"brand.800"}>
            Waiting for connection to server..
            <Spinner as={"span"} ml={1} size={"sm"} color={"brand.800"} />
          </Text>
        )}
      </Box>

      <Box>
        <Heading as="h3" size="sm" mb={2}>
          Connect to another device
        </Heading>
        <Text fontSize={"sm"} color={"fg.muted"}>
          Already have the other device&apos;s ID? Type it here and press
          Connect.
        </Text>
        <form onSubmit={handleConnectToRoom}>
          <Flex mt={"10px"}>
            <Flex direction={"column"} align="left" maxW="320">
              <NumberInput.Root
                name="roomNr"
                defaultValue={roomNumber}
                disabled={ownRoomNumber === null}
              >
                <NumberInput.Input
                  onChange={handleChange}
                  _placeholder={{ color: "gray.500" }}
                  borderColor={"gray.500"}
                  placeholder={"Enter Device ID"}
                />
              </NumberInput.Root>
            </Flex>
            <Button
              type="submit"
              colorPalette={"brand"}
              fontSize="md"
              alignSelf="flex-end"
              mx={2}
              disabled={roomNumber === null}
            >
              Connect
            </Button>
          </Flex>
        </form>
      </Box>
    </SimpleGrid>
  );
};

export default Connect;
