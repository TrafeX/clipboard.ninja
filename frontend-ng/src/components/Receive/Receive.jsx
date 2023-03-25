import {
  Box,
  Code,
  Flex,
  List,
  ListIcon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { IoReturnDownForwardSharp } from "react-icons/io5";
import React from "react";

const Receive = ({ receivedMessages }) => (
  <Box>
    <List>
      {receivedMessages &&
        receivedMessages.map((message, i) => {
          return (
            <ListItem key={i}>
              <Flex direction="row">
                <ListIcon as={IoReturnDownForwardSharp} color={"brand.600"} />
                <Code>{message}</Code>
              </Flex>
            </ListItem>
          );
        })}
    </List>
  </Box>
);

export default Receive;
