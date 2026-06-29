import { Box, Card, Heading, List, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { faqItems } from "lib/faq";

const About = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} padding={8}>
      <Card.Root boxShadow={"lg"} p={{ sm: 3, md: 5 }} rounded={"md"}>
        <Card.Header pb={{ base: 0, lg: 1 }}>
          <Heading size="md">Frequently asked questions</Heading>
        </Card.Header>
        <Card.Body>
          <Stack gap={5}>
            {faqItems.map((item) => (
              <Box key={item.question}>
                <Heading as="h3" size="sm" mb={1}>
                  {item.question}
                </Heading>
                <Text fontSize="sm" color="fg.muted">
                  {item.answer}
                </Text>
              </Box>
            ))}
          </Stack>
        </Card.Body>
      </Card.Root>
      <Card.Root boxShadow={"lg"} p={{ sm: 3, md: 5 }} rounded={"md"}>
        <Card.Header pb={{ base: 0, lg: 1 }}>
          <Heading size="md">Security &amp; Privacy</Heading>
        </Card.Header>
        <Card.Body>
          <List.Root as="ul" ps={5}>
            <List.Item>
              <Text>
                The website is running on HTTPS which means the connection to
                and from the server is <strong>encrypted</strong>.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                Data send and received via the website is{" "}
                <strong>never stored or visible on the server</strong>.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                You need to be connected to the sender at the moment data is
                send,{" "}
                <strong>
                  it&apos;s not possible to retrieve the data afterwards.
                </strong>
              </Text>
            </List.Item>
          </List.Root>
        </Card.Body>
      </Card.Root>
    </SimpleGrid>
  );
};

export default About;
