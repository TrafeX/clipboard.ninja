import {
  Box,
  Code,
  Flex,
  List,
  ListIcon,
  ListItem
} from "@chakra-ui/react";
import { IoReturnDownForwardSharp } from "react-icons/io5";

const Receive = ({ receivedMessages }) => (
  <Box>
    <List>
      {receivedMessages &&
        receivedMessages.map((message, i) => {
          return (
            <ListItem key={i}>
              <Flex direction="row">
                <ListIcon as={IoReturnDownForwardSharp} color={"brand.600"} />
                <Code style={{whiteSpace: "pre-wrap"}}>{message}</Code>
              </Flex>
            </ListItem>
          );
        })}
    </List>
  </Box>
);

export default Receive;
