import React from "react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Text,
  Link,
  ListItem,
  useColorModeValue,
  Heading,
  UnorderedList,
} from "@chakra-ui/react";

const About = () => {
  const cardBgColor = useColorModeValue("white", "gray.700");

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} padding={8}>
      <Card
        bg={cardBgColor}
        boxShadow={"lg"}
        p={{ sm: 3, md: 5 }}
        rounded={"md"}
      >
        <CardHeader pb={{ base: 0, lg: 1 }}>
          <Heading size="md">How to use</Heading>
        </CardHeader>
        <CardBody>
          <UnorderedList>
            <ListItem>
              <Text>
                Open the{" "}
                <Link
                  href="https://play.google.com/store/apps/details?id=nl.trafex.apps.clipboardninja"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  app
                </Link>{" "}
                or{" "}
                <Link
                  href="https://clipboard.ninja"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  website
                </Link>{" "}
                on both devices
              </Text>
            </ListItem>

            <ListItem>
              <Text>
                Enter the device ID from the other device and press connect
              </Text>
            </ListItem>
            <ListItem>
              <Text>Type or paste the text you want to send</Text>
            </ListItem>
            <ListItem>
              <Text>
                See the text immediately appear on the other device after
                pressing &apos;send&apos;
              </Text>
            </ListItem>
          </UnorderedList>
        </CardBody>
      </Card>
      <Card>
        <CardHeader pb={{ base: 0, lg: 1 }}>
          <Heading size="md">Security & Privacy</Heading>
        </CardHeader>
        <CardBody>
          <UnorderedList>
            <ListItem>
              <Text>
                The website is running on HTTPS which means the connection to
                and from the server is <strong>encrypted</strong>.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Data send and received via the website is{" "}
                <strong>never stored or visible on the server</strong>.
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                You need to be connected to the sender at the moment data is
                send,{" "}
                <strong>
                  it&apos;s not possible to retrieve the data afterwards.
                </strong>
              </Text>
            </ListItem>
          </UnorderedList>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default About;
