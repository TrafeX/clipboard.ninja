import {
  Box,
  Button,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const Connect = ({ ownRoomNumber, connectedToRoom, connectToRoom }) => {
  const [roomNumber, setRoomNumber] = useState("");

  const subtextColor = useColorModeValue("gray.600", "gray.400");
  const inputColor = useColorModeValue("gray.500", "gray.500");

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
    <>
      <SimpleGrid columns={{ base: 1, xl: 2 }} alignItems={"baseline"}>
        <Box mb={{ base: 3, xl: 0 }}>
          <Heading as="h3" size="sm" mb={2}>
            This Device ID
          </Heading>
          <Text fontSize={"sm"} color={subtextColor}>
            Enter this Device ID on the other device to connect.
          </Text>

          {ownRoomNumber ? (
            <Text fontSize={"2xl"} fontWeight={"extrabold"} color={"brand.800"}>
              {ownRoomNumber}
            </Text>
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
          <Text fontSize={"sm"} color={subtextColor}>
            Enter the Device ID of the other device below.
          </Text>
          <form onSubmit={handleConnectToRoom}>
            <Flex mt={"10px"}>
              <Flex direction={"column"} align="left" maxW="320">
                {/* <FormLabel htmlFor="roomNr">Enter number</FormLabel> */}
                <NumberInput
                  name="roomNr"
                  defaultValue={roomNumber}
                  isDisabled={ownRoomNumber === null}
                >
                  <NumberInputField
                    onChange={handleChange}
                    _placeholder={{ color: "gray.500" }}
                    borderColor={inputColor}
                    placeholder={"Enter Device ID"}
                  />
                </NumberInput>
                {/* <Flex>
                  <PinInput name="roomNr" defaultValue={roomNumber} disabled={ownRoomNumber === null}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <Text>-</Text>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </Flex> */}
              </Flex>
              <Button
                type="submit"
                label="Connect"
                colorScheme={"brand"}
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
    </>
  );
};

export default Connect;
