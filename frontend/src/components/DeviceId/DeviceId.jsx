import { Box, Text } from "@chakra-ui/react";

// Displays a 6-digit Device ID grouped as two blocks (e.g. "745 148") for
// readability. The two spans have no whitespace between them, so the DOM text
// stays "745148": double-clicking selects all six digits and copying yields the
// raw number (no space) — which matters because the connect field parses it as
// an integer. The visible gap is a CSS margin, never part of the text content.
const DeviceId = ({ value, ...rest }) => {
  const id = String(value);
  return (
    <Text fontSize={"2xl"} fontWeight={"extrabold"} color={"brand.800"} {...rest}>
      <Box as="span">{id.slice(0, 3)}</Box>
      <Box as="span" ml={2}>
        {id.slice(3)}
      </Box>
    </Text>
  );
};

export default DeviceId;
