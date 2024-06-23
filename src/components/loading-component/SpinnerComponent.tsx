import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const SpinnerComponent: React.FC = () => {
  return (
    <>
      <VStack my="3" justifyContent="center" alignItems="center">
        <Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
        <Box>
          <Text as={"b"}>Mohon Tunggu</Text>
        </Box>
      </VStack>
    </>
  );
};

export default SpinnerComponent;
