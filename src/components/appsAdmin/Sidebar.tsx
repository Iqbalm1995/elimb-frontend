import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  BoxProps,
  Card,
  CardBody,
  CloseButton,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaPowerOff } from "react-icons/fa";
import {
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiCircle,
  FiPlus,
} from "react-icons/fi";
import profileBg from "../../assets/graphic-profile-design.png";
import { borderRadiusSchemes, specialColorDark } from "../themes/colorScheme";
import profileSample from "../../assets/profile-sample.jpg";
import useNavigationState from "../../data/GlobalStates/NavigationState";
import { RiCircleLine, RiDashboard2Line } from "react-icons/ri";
import { blankPage, contractCreate, contractHistory, contractList, dashboardPage, orderCreate, orderHistory, orderList } from "../../data/NavigationUrlConstants";
import { useNavigate } from "react-router-dom";

export interface LinkItemProps {
  name: string;
  icon?: IconType;
  pathUrl?: string;
  subLinks: LinkItemProps[]; // Support for submenus
}

export const LinkNavigations: Array<LinkItemProps> = [
  {
    name: "Dashboard",
    icon: RiDashboard2Line,
    pathUrl: dashboardPage,
    subLinks: [],
  },
  {
    name: "Contracts",
    icon: FiTrendingUp,
    subLinks: [
      {
        name: "Create New",
        icon: FiPlus,
        pathUrl: contractCreate,
        subLinks: [],
      },
      {
        name: "List",
        icon: FiCircle,
        pathUrl: contractList,
        subLinks: [],
      },
      {
        name: "History",
        icon: FiCircle,
        pathUrl: contractHistory,
        subLinks: [],
      },
    ],
  },
  {
    name: "Orders",
    icon: FiCompass,
    subLinks: [
      {
        name: "Create New",
        icon: FiPlus,
        pathUrl: orderCreate,
        subLinks: [],
      },
      {
        name: "List",
        icon: FiCircle,
        pathUrl: orderList,
        subLinks: [],
      },
      {
        name: "History",
        icon: FiCircle,
        pathUrl: orderHistory,
        subLinks: [],
      },
    ],
  },
  { name: "Favourites", icon: FiStar, subLinks: [], pathUrl: "/fav" },
  { name: "Settings", icon: FiSettings, subLinks: [], pathUrl: "/settings" },
  { name: "Blank Page", icon: RiCircleLine, subLinks: [], pathUrl: blankPage },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon?: IconType;
  path?: string;
  children: string;
  subLinks: LinkItemProps[];
}

const NavItem = ({ icon, path, children, subLinks, ...rest }: NavItemProps) => {
  const navigate = useNavigate();
  const [showSubLinks, setShowSubLinks] = useState(false);
  const setNavigationActive = useNavigationState(
    (state) => state.setNavigationActive
  );
  const { NavigationActive } = useNavigationState((state) => ({
    NavigationActive: state.NavigationActive,
  }));

  const setActiveMenu = (menuData: LinkItemProps) => {
    // console.log(path);
    setNavigationActive(menuData);
    if (path != null) {
      navigate(path);
    }
  };

  return (
    <>
      <Flex
        align="center"
        my={1}
        p="4"
        mx="4"
        borderRadius={borderRadiusSchemes}
        role="group"
        cursor="pointer"
        _hover={{
          //   bg: specialColor_500,
          // bgGradient: "linear(to-r, #33FFBB, #00ffaa)",
          color: specialColorDark,
        }}
        onClick={() => {
          if (subLinks.length == 0) {
            setActiveMenu({
              name: children,
              icon: icon,
              pathUrl: path,
              subLinks: subLinks,
            });
          } else {
            setShowSubLinks(!showSubLinks);
          }
        }}
        {...rest}
        bgGradient={
          NavigationActive?.pathUrl == path
            ? "linear(to-r, #33FFBB, #00ffaa)"
            : "linear(to-r, #FFFFFF, #FFFFFF)"
        }
        color={"black"}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: specialColorDark,
            }}
            as={icon}
          />
        )}
        {children}
        {subLinks && subLinks.length > 0 && (
          <Icon
            as={showSubLinks ? ChevronDownIcon : ChevronRightIcon}
            ml="auto"
            transition="transform 0.2s"
            _groupHover={{
              color: specialColorDark,
            }}
          />
        )}
      </Flex>
      {subLinks && showSubLinks && (
        <Box pl="4">
          {subLinks.map((subLink) => (
            <NavItem
              key={subLink.name}
              icon={subLink.icon}
              subLinks={subLink.subLinks}
              path={subLink.pathUrl}
            >
              {subLink.name}
            </NavItem>
          ))}
        </Box>
      )}
    </>
  );
};

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const username = "Iqbal";
  const role = "Administrator";
  return (
    <Box
      mt={{ base: 0, md: 4 }}
      ml={{ base: 0, md: 4 }}
      borderRadius={{ base: 0, md: borderRadiusSchemes }}
      transition="2s ease"
      bg={useColorModeValue("white", "gray.900")}
      //   borderRight="1px"
      //   borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h={{ base: "full", md: "95vh" }} // Full viewport height
      overflowY="auto" // Scrollable if content overflows
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <Box my={4}>
        <Card bgImage={profileBg} objectFit={"cover"} mx={3}>
          <CardBody px={2}>
            <HStack>
              <Avatar size="md" src={profileSample} />
              <VStack alignItems="flex-start" spacing="1px" ml={2}>
                <Tooltip label={username} hasArrow>
                  <Box maxWidth="90px" isTruncated>
                    <Text fontSize="sm" isTruncated>
                      {username}
                    </Text>
                  </Box>
                </Tooltip>
                <Tooltip label={role} hasArrow>
                  <Box maxWidth="90px" isTruncated>
                    <Text fontSize="xs" color="gray.600" isTruncated>
                      {role}
                    </Text>
                  </Box>
                </Tooltip>
              </VStack>
              <Spacer />
              <Box>
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="sign off"
                  icon={<FaPowerOff />}
                />
              </Box>
            </HStack>
          </CardBody>
        </Card>
      </Box>

      <Box pt={2}>
        {LinkNavigations.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            path={link.pathUrl}
            subLinks={link.subLinks}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};
