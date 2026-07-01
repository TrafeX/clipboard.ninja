import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { toaster } from "components/ui/toaster";
import { IoCopyOutline } from "react-icons/io5";

// Displays a 6-digit Device ID grouped as two blocks (e.g. "745 148") for
// readability. The two spans have no whitespace between them, so the DOM text
// stays "745148": double-clicking selects all six digits and copying yields the
// raw number (no space) — which matters because the connect field parses it as
// an integer. The visible gap is a CSS margin, never part of the text content.
//
// When `copyable` is set, a copy button writes the raw digits to the clipboard.
const DeviceId = ({ value, copyable = false, ...rest }) => {
  const id = String(value);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(id);
      toaster.create({
        title: "Device ID copied",
        type: "success",
        duration: 2000,
      });
    } catch {
      toaster.create({
        title: "Could not copy Device ID",
        type: "error",
        duration: 3000,
      });
    }
  };

  const number = (
    <Text
      fontSize={{ base: "2xl", lg: "3xl" }}
      fontWeight={"extrabold"}
      color={"brand.800"}
      {...rest}
    >
      <Box as="span">{id.slice(0, 3)}</Box>
      <Box as="span" ml={2}>
        {id.slice(3)}
      </Box>
    </Text>
  );

  if (!copyable) {
    return number;
  }

  return (
    <HStack gap={2} align="center">
      {number}
      <IconButton
        variant="ghost"
        size="sm"
        color="brand.800"
        onClick={copyId}
        title="Copy Device ID"
        aria-label="Copy Device ID"
      >
        <IoCopyOutline />
      </IconButton>
    </HStack>
  );
};

export default DeviceId;
