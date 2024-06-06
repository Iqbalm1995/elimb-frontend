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
  specialColor_50,
} from "../../components/themes/colorScheme";
import { useEffect } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import profileBg from "../../assets/graphic-header-design.png";
import {
  RiDeleteBin6Line,
  RiEditLine,
  RiInformation2Line,
} from "react-icons/ri";

const OrderPage = () => {
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Blank Page",
      breadcrumbItems: ["Pages", "Blank"],
    });
  }, []);

  return (
    <>
      <Box>
        <Card borderRadius={borderRadiusSchemes}>
          <CardBody>
            <VStack>
              <Card borderRadius={borderRadiusSchemes} w={"full"}>
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
                          <Avatar
                            name="Kent Dodds"
                            bgColor={"#FF2B8B"}
                            color={"#fff"}
                          />
                        </AvatarGroup>
                      </Flex>
                    </GridItem>
                    <GridItem w={"full"} colSpan={{ base: 12, md: 7 }}>
                      <Box h={"120px"} w={"full"}>
                        <Flex as={HStack} spacing={5}>
                          <Text as={"b"} fontSize="xl">
                            ORDER - #001346456488
                          </Text>
                          <Text fontSize={"sm"} color={"gray.500"}>
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
                          <HStack>
                            <Text as={"b"} fontSize={"sm"} color={"gray.500"}>
                              Status :
                            </Text>
                            <Text as={"b"} fontSize={"sm"} color={"gray.600"}>
                              <Badge
                                ml="1"
                                fontSize="0.8em"
                                colorScheme="green"
                              >
                                New
                              </Badge>
                            </Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </GridItem>
                    <GridItem w={"full"} colSpan={{ base: 12, md: 3 }}>
                      <Flex
                        borderRadius={borderRadiusSchemes}
                        bgColor={specialColor_50}
                        objectFit={"cover"}
                        bgSize="cover"
                        p={4}
                        mt={{ base: "50px", md: 0 }}
                        h={{ base: "50px", md: "150px" }}
                        justifyContent={"center"}
                        as={HStack}
                      >
                        <Button
                          leftIcon={<RiInformation2Line />}
                          colorScheme="blue"
                          variant="ghost"
                        >
                          Detail
                        </Button>
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
            </VStack>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default OrderPage;
