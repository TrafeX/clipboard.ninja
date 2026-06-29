import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
} from "@chakra-ui/react";
import { useColorMode } from "components/ui/color-mode";
import NextImage from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { IoHelp } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import ninjalogo from "./ninja.svg";

const AppHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <>
      <Box
        bg={"brand.500"}
        px={4}
        position={"sticky"}
        top={0}
        boxShadow={"md"}
        zIndex={2}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack alignItems={"center"} gap={1}>
            <Image
              src={ninjalogo}
              alt="Clipboard.ninja"
              height="50px"
              width="50px"
              as={NextImage}
            />
            <Heading
              as={NextLink}
              href={"/"}
              color={"headerText"}
              fontWeight={"normal"}
              size={"md"}
            >
              Clipboard.ninja
            </Heading>
          </HStack>
          <HStack alignItems={"center"} gap={2}>
            {router.asPath !== "/" && (
              <Link as={NextLink} color={"headerText"} href={"/"}>
                Go back
              </Link>
            )}

            <NextLink href={router.asPath === "/about" ? "/" : "/about"}>
              <IconButton
                bg={"gray.100"}
                color={"gray.800"}
                _hover={{
                  bg: "gray.300",
                }}
                size={"sm"}
                title={"Go to help"}
                aria-label={"Go to help"}
              >
                <IoHelp />
              </IconButton>
            </NextLink>
            <IconButton
              bg={"gray.100"}
              color={"gray.800"}
              _hover={{
                bg: "gray.300",
              }}
              size={"sm"}
              title={"Change Color Theme"}
              aria-label={"Change Color Theme"}
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
            </IconButton>
          </HStack>
        </Flex>
      </Box>
      <Box
        position={"absolute"}
        top={0}
        left={0}
        height="240px"
        bgColor={"gray.400"}
        width={"100%"}
        zIndex={-1}
      />
    </>
  );
};

export default AppHeader;
