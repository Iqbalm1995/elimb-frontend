import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  borderRadiusSchemes,
  specialColor,
  specialColorHover,
} from "../../components/themes/colorScheme";
import { useEffect } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import profileBg from "../../assets/graphic-header-design.png";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { orderCreate } from "../../data/NavigationUrlConstants";

interface cardDataOrder {
  orderNumber: string;
}

const orderListData: cardDataOrder[] = [
  {
    orderNumber: "#001346456488",
  },
  {
    orderNumber: "#001346456489",
  },
  {
    orderNumber: "#001346456420",
  },
  {
    orderNumber: "#001346456433",
  },
];

const OrderPage = () => {
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );
  const navigate = useNavigate();

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "List Order",
      breadcrumbItems: ["Pages", "Order", "List"],
    });
  }, []);

  const NavtoCreateOrder = () => {
    navigate(orderCreate);
  };

  return (
    <>
      <Box>
        <Card borderRadius={borderRadiusSchemes}>
          <CardBody>
            <Box pb={5}>
              <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                  <Text fontWeight={"medium"} fontSize="3xl">
                    List Order
                  </Text>
                </GridItem>
                <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                  <Flex justifyContent={"flex-end"}>
                    <Button
                      colorScheme="teal"
                      w={{ base: "full", md: "auto" }}
                      leftIcon={<AddIcon />}
                      onClick={NavtoCreateOrder}
                    >
                      Create New Order
                    </Button>
                  </Flex>
                </GridItem>
              </Grid>
            </Box>
            <VStack spacing={3}>
              {orderListData.map((data, index) => (
                <CardListOrder dataOrder={data} key={index} />
              ))}
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

const CardListOrder = ({ dataOrder }: { dataOrder: cardDataOrder }) => {
  return (
    <Card
      borderRadius={borderRadiusSchemes}
      w={"full"}
      boxShadow={"md"}
      _hover={{
        bgColor: specialColorHover,
        cursor: "pointer",
      }}
    >
      <CardBody>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem w={"full"} colSpan={{ base: 12, md: 2 }}>
            <Flex
              borderRadius={borderRadiusSchemes}
              bgColor={specialColor}
              bgImage={profileBg}
              objectFit={"cover"}
              bgSize="cover"
              // bgPosition="center"
              p={4}
              h={"150px"}
              justifyContent={"center"}
            >
              <AvatarGroup size="md" max={3}>
                <Avatar
                  name="Ryan Florence"
                  bgColor={"#43D2FC"}
                  color={"#fff"}
                />
                <Avatar
                  name="Segun Adebayo"
                  bgColor={"#009966"}
                  color={"#fff"}
                />
                <Avatar name="Kent Dodds" bgColor={"#FF2B8B"} color={"#fff"} />
              </AvatarGroup>
            </Flex>
          </GridItem>
          <GridItem w={"full"} colSpan={{ base: 12, md: 8 }}>
            <Box h={"120px"} w={"full"}>
              <Flex as={HStack} spacing={2}>
                <Text as={"b"} fontSize="xl">
                  <Badge fontSize="0.8em" colorScheme="green" mr={2}>
                    New
                  </Badge>
                  {/* ORDER - #001346456488 */}
                  ORDER - {dataOrder.orderNumber}
                </Text>
                <Text fontSize={"xs"} color={"gray.500"}>
                  06/06/2024 9:20 PM (2 Minutes ago)
                </Text>
              </Flex>
              <VStack alignItems={"start"} pt={3} spacing={0}>
                <HStack>
                  <Text as={"b"} fontSize={"sm"} color={"gray.500"}>
                    Requested :
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontStyle="italic"
                    fontSize={"sm"}
                    color={"gray.600"}
                  >
                    PT. Serba Guna Mitra
                  </Text>
                </HStack>
                <HStack>
                  <Text as={"b"} fontSize={"sm"} color={"gray.500"}>
                    Destination :
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontStyle="italic"
                    fontSize={"sm"}
                    color={"gray.600"}
                  >
                    CV. Arklik Nusantara
                  </Text>
                </HStack>
                <HStack>
                  <Text as={"b"} fontSize={"sm"} color={"gray.500"}>
                    Transporter :
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontStyle="italic"
                    fontSize={"sm"}
                    color={"gray.600"}
                  >
                    PT. Mamang Resing
                  </Text>
                </HStack>
                <HStack>
                  <Text as={"b"} fontSize={"sm"} color={"gray.500"}>
                    Items :
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontStyle="italic"
                    fontSize="sm"
                    color="gray.600"
                  >
                    Chemical, Medic
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </GridItem>
          <GridItem w={"full"} colSpan={{ base: 12, md: 2 }}>
            <Flex
              borderRadius={borderRadiusSchemes}
              bgColor={"gray.100"}
              objectFit={"cover"}
              bgSize="cover"
              p={4}
              mt={{ base: "50px", md: 0 }}
              h={{ base: "50px", md: "150px" }}
              justifyContent={"center"}
              as={HStack}
            >
              {/* <Button
                leftIcon={<RiInformation2Line />}
                colorScheme="blue"
                variant="ghost"
              >
                Detail
              </Button> */}
              <Button
                leftIcon={<RiEditLine />}
                colorScheme="teal"
                variant="ghost"
              >
                Edit
              </Button>
              <Button
                leftIcon={<RiDeleteBin6Line />}
                colorScheme="red"
                variant="ghost"
              >
                Delete
              </Button>
            </Flex>
          </GridItem>
        </Grid>
        <HStack></HStack>
      </CardBody>
    </Card>
  );
};

export default OrderPage;
