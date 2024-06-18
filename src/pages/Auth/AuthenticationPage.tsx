import { Box, Flex, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import AuthrenticationForm from "./AuthrenticationForm";
import bgimages from "../../assets/graphic-profile-design.png";

const AuthrenticationPage = () => {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Box
          position="relative"
          width="100%"
          height="100vh"
          backgroundImage={bgimages}
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Flex
            position="absolute"
            top="40%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            color="white"
            p={8}
          >
            <VStack>
              {/* <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt={"Bank bjb"}
                  src={bjbLogoWhite}
                  width={"25%"}
                  mx={2}
                />
              </Box> */}
              <Box display="flex" justifyContent="center" alignItems="center">
                <VStack spacing={1}>
                  <Text fontSize="40px" as={"b"} letterSpacing={1}>
                    ELIMB
                  </Text>
                  <Text fontSize="38px" as={"b"} letterSpacing={1}>
                    PROTOTYPE APPS
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Flex>
        </Box>
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"16px"} mb="4">
            LOGIN
          </Heading>
          <Box>
            <AuthrenticationForm />
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
};
export default AuthrenticationPage;
