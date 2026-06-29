import { Box, Code, Flex, List } from "@chakra-ui/react";
import { IoReturnDownForwardSharp } from "react-icons/io5";

const Receive = ({ receivedMessages }) => (
  <Box>
    <List.Root listStyleType="none">
      {receivedMessages &&
        receivedMessages.map((message, i) => {
          return (
            <List.Item key={i}>
              <Flex direction="row">
                <List.Indicator
                  as={IoReturnDownForwardSharp}
                  color={"brand.600"}
                />
                <Code style={{ whiteSpace: "pre-wrap" }}>{message}</Code>
              </Flex>
            </List.Item>
          );
        })}
    </List.Root>
  </Box>
);

export default Receive;
