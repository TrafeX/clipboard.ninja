import { Card, Heading, Link, List, SimpleGrid, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} padding={8}>
      <Card.Root boxShadow={"lg"} p={{ sm: 3, md: 5 }} rounded={"md"}>
        <Card.Header pb={{ base: 0, lg: 1 }}>
          <Heading size="md">How to use</Heading>
        </Card.Header>
        <Card.Body>
          <List.Root as="ul" ps={5}>
            <List.Item>
              <Text>
                Open the{" "}
                <Link
                  href="https://play.google.com/store/apps/details?id=nl.trafex.apps.clipboardninja"
                  target="_blank"
                  rel="noopener noreferrer"
                  textDecoration="underline"
                >
                  app
                </Link>{" "}
                or{" "}
                <Link
                  href="https://clipboard.ninja"
                  target="_blank"
                  rel="noopener noreferrer"
                  textDecoration="underline"
                >
                  website
                </Link>{" "}
                on both devices
              </Text>
            </List.Item>

            <List.Item>
              <Text>
                Enter the device ID from the other device and press connect
              </Text>
            </List.Item>
            <List.Item>
              <Text>Type or paste the text you want to send</Text>
            </List.Item>
            <List.Item>
              <Text>
                See the text immediately appear on the other device after
                pressing &apos;send&apos;
              </Text>
            </List.Item>
          </List.Root>
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
