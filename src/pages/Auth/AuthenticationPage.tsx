import {
  Heading,
  Stack,
  IconButton,
  Avatar,
  HStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Flex,
  VStack,
  Text,
  Container,
} from "@chakra-ui/react";
import AuthrenticationForm from "./AuthrenticationForm";
import bgimages from "../../assets/bg2.png";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { FiBell } from "react-icons/fi";
import {
  borderRadiusSchemes,
  specialColor,
} from "../../components/themes/colorScheme";
import { HiMenuAlt1 } from "react-icons/hi";
import { RiHomeLine } from "react-icons/ri";

const AuthrenticationPage = () => {
  return (
    <>
      <Box position="relative">
        <Container
          zIndex={2}
          position="absolute"
          maxW="container.xl"
          width="full"
          top={0}
          left="50%"
          pt={5}
          transform="translateX(-50%)"
        >
          <MobileNav />
        </Container>
        <Stack
          minH="100vh"
          direction={{ base: "column", md: "row" }}
          zIndex={-1}
        >
          <Flex width={{ base: "100%", md: "60%" }}>
            <Box
              position="relative"
              width="100%"
              height="95vh"
              backgroundImage={bgimages}
              backgroundSize="cover"
              backgroundPosition="center"
              borderBottomEndRadius={"80px"}
              boxShadow={"2xl"}
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
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <VStack spacing={1}>
                      {/* <Text fontSize="40px" as={"b"} letterSpacing={1}>
                    ELIMB
                  </Text> */}
                      <Text fontSize="38px" as={"b"} letterSpacing={1}>
                        PROTOTYPE APPS
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              </Flex>
            </Box>
          </Flex>
          <Flex
            p={8}
            flex={1}
            align={"center"}
            justify={"center"}
            width={{ base: "100%", md: "40%" }}
          >
            <Stack spacing={8} w={"full"} maxW={"md"}>
              <VStack spacing={1} alignItems={"start"}>
                <Text fontSize="4xl" fontWeight="bold" color={"primary"}>
                  Selamat Datang
                </Text>
                <Text>Silahkan isi Username dan Password untuk otentikasi</Text>
              </VStack>
              <Box>
                <AuthrenticationForm />
              </Box>
            </Stack>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

const MobileNav = () => {
  const { HeaderActive } = useHeaderState((state: HeaderState) => ({
    HeaderActive: state.HeaderActive,
  }));

  return (
    <>
      <Flex
        borderRadius={borderRadiusSchemes}
        mx={{ base: 2, md: 0 }}
        boxShadow={{ base: "xl", md: "md" }}
        px={4}
        height="20"
        alignItems="center"
        bgColor={"white"}
        // bgImage={headerBg}
        bgSize="cover" // Ensures the background image covers the entire Flex container
        bgPosition="center" // Centers the background image
        //   justifyContent={{ base: "space-between", md: "flex-end" }}
        justifyContent={"center"}
        zIndex={1}
      >
        <Text fontSize="3xl" fontWeight="bold">
          Logo
        </Text>
      </Flex>
    </>
  );
};

export default AuthrenticationPage;
