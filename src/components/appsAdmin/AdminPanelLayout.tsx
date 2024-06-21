import { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
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
  Divider,
} from "@chakra-ui/react";
import { FiBell } from "react-icons/fi";
import { SidebarContent } from "./Sidebar";
import {
  borderRadiusSchemes,
  specialColor,
  specialColorDark,
  specialColorHover,
} from "../themes/colorScheme";
import headerBg from "../../assets/bg1.png";
import profileSample from "../../assets/profile-sample.jpg";
import { HiMenuAlt1 } from "react-icons/hi";
import { RiHomeLine } from "react-icons/ri";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      // bg={useColorModeValue("gray.100", "gray.900")}
      bg="linear-gradient(to bottom, #0082d1 35vh, #f1f1f2 35vh 100vh)"
    >
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: "270px" }} mr={{ base: 0, md: 3 }}>
        {/* <Box pt={{ base: 2, md: 4 }} position="sticky" top={0} zIndex={1}> */}
        <Box pt={{ base: 2, md: 4 }}>
          <MobileNav onOpen={onOpen} />
        </Box>
        <Box py="4" px={{ base: 2, md: 0 }}>
          {children}
        </Box>

        <Box
          borderTopWidth={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Box py={5}>
            <Text>© 2022 Chakra Templates. All rights reserved</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { HeaderActive } = useHeaderState((state: HeaderState) => ({
    HeaderActive: state.HeaderActive,
  }));
  const setLogin = useAuthenticationState((state: any) => state.setLogin);
  const setAuthData = useAuthenticationState((state: any) => state.setAuthData);

  return (
    <>
      <Flex
        // borderRadius={borderRadiusSchemes}
        // boxShadow={{ base: "xl", md: "md" }}
        px={4}
        height="20"
        alignItems="center"
        // bg={specialColor}
        // bgImage={headerBg}
        // bgSize="cover" // Ensures the background image covers the entire Flex container
        bgPosition="center" // Centers the background image
        //   justifyContent={{ base: "space-between", md: "flex-end" }}
        justifyContent={"space-between"}
        {...rest}
        zIndex={1}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          size="lg"
          icon={<HiMenuAlt1 />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color={"white"}
        >
          Logo
        </Text>

        <VStack
          spacing={1}
          alignItems="flex-start"
          display={{ base: "none", md: "flex" }}
        >
          <Box>
            <Breadcrumb color={"white"}>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <RiHomeLine />
                </BreadcrumbLink>
              </BreadcrumbItem>
              {HeaderActive &&
                HeaderActive.breadcrumbItems.length > 0 &&
                HeaderActive.breadcrumbItems.map((item: string) => {
                  return (
                    <BreadcrumbItem key={item}>
                      <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                    </BreadcrumbItem>
                  );
                })}
            </Breadcrumb>
          </Box>
          <Text fontSize="xl" as={"b"} color={"white"}>
            {HeaderActive && HeaderActive.tittle}
          </Text>
        </VStack>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            color={"white"}
            icon={<FiBell />}
            _hover={{
              color: specialColorDark,
              bgColor: specialColorHover,
            }}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"md"} src={profileSample} />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    setLogin(false);
                    setAuthData(null);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <VStack
        display={{ base: "flex", md: "none" }}
        // borderRadius={borderRadiusSchemes}
        pos={"relative"}
        mx={{ base: 3, md: 0 }}
        px={4}
        py={2}
        justifyContent="center"
        color={"white"}
      >
        <Divider />
        <Box pt={2}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <RiHomeLine />
              </BreadcrumbLink>
            </BreadcrumbItem>
            {HeaderActive &&
              HeaderActive.breadcrumbItems.length > 0 &&
              HeaderActive.breadcrumbItems.map((item: string) => {
                return (
                  <BreadcrumbItem key={item}>
                    <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
          </Breadcrumb>
        </Box>
      </VStack>
    </>
  );
};

const MobileNavAlternative = ({ onOpen, ...rest }: MobileProps) => {
  const { HeaderActive } = useHeaderState((state: HeaderState) => ({
    HeaderActive: state.HeaderActive,
  }));
  const setLogin = useAuthenticationState((state: any) => state.setLogin);
  const setAuthData = useAuthenticationState((state: any) => state.setAuthData);

  return (
    <>
      <Flex
        borderRadius={borderRadiusSchemes}
        mx={{ base: 2, md: 0 }}
        boxShadow={{ base: "xl", md: "md" }}
        px={4}
        height="20"
        alignItems="center"
        bg={specialColor}
        bgImage={headerBg}
        bgSize="cover"
        bgPosition="center"
        justifyContent={"space-between"}
        {...rest}
        zIndex={1}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          size="lg"
          icon={<HiMenuAlt1 />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color={"white"}
        >
          Logo
        </Text>

        <VStack
          spacing={1}
          alignItems="flex-start"
          display={{ base: "none", md: "flex" }}
        >
          <Box>
            <Breadcrumb color={"white"}>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <RiHomeLine />
                </BreadcrumbLink>
              </BreadcrumbItem>
              {HeaderActive &&
                HeaderActive.breadcrumbItems.length > 0 &&
                HeaderActive.breadcrumbItems.map((item: string) => {
                  return (
                    <BreadcrumbItem key={item}>
                      <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                    </BreadcrumbItem>
                  );
                })}
            </Breadcrumb>
          </Box>
          <Text fontSize="xl" as={"b"} color={"white"}>
            {HeaderActive && HeaderActive.tittle}
          </Text>
        </VStack>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            color={"white"}
            icon={<FiBell />}
            _hover={{
              color: specialColorDark,
              bgColor: specialColorHover,
            }}
          />
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"md"} src={profileSample} />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    setLogin(false);
                    setAuthData(null);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <Box
        display={{ base: "flex", md: "none" }}
        borderRadius={borderRadiusSchemes}
        mt={-10}
        pos={"relative"}
        mx={{ base: 3, md: 0 }}
        px={4}
        bg={"white"}
        h={"20"}
        boxShadow={"lx"}
        zIndex={-1}
        justifyContent="center"
        border={"1px"}
        borderColor={"gray.200"}
      >
        <Box pt={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <RiHomeLine />
              </BreadcrumbLink>
            </BreadcrumbItem>
            {HeaderActive &&
              HeaderActive.breadcrumbItems.length > 0 &&
              HeaderActive.breadcrumbItems.map((item: string) => {
                return (
                  <BreadcrumbItem key={item}>
                    <BreadcrumbLink href="#">{item}</BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
          </Breadcrumb>
        </Box>
      </Box>
    </>
  );
};
