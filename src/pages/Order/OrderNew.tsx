import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  Tooltip,
  VStack,
  useBreakpointValue,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import { useEffect, useState } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { orderList } from "../../data/NavigationUrlConstants";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  RiInformation2Line,
  RiMore2Line,
  RiVipCrownLine,
} from "react-icons/ri";

const OrderNew = () => {
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Create New Order",
      breadcrumbItems: ["Pages", "Order", "Create"],
    });
  }, []);

  return (
    <>
      <Box>
        <Card borderRadius={borderRadiusSchemes}>
          <CardBody>
            <Box pb={5}>
              <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                  <HStack spacing={2}>
                    <Link to={orderList}>
                      <Button colorScheme="teal" variant={"solid"}>
                        <FaChevronLeft />
                      </Button>
                    </Link>
                    <Text fontWeight={"medium"} fontSize="3xl">
                      Create New Order
                    </Text>
                  </HStack>
                </GridItem>
                <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                  <Flex justifyContent={"flex-end"}></Flex>
                </GridItem>
                <GridItem w={"full"} colSpan={12}>
                  <FormWizard />
                </GridItem>
              </Grid>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

const steps = [
  { title: "Kontrak" },
  { title: "Limbah" },
  { title: "Tujuan" },
  { title: "Tinjau" },
];

const FormWizard: React.FC = () => {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      goToNext();
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      goToPrevious();
    }
  };

  const orientation = useBreakpointValue({
    base: "vertical",
    md: "horizontal",
  }) as "horizontal" | "vertical";

  return (
    <Box p={4}>
      <Stepper index={activeStep} colorScheme="teal" orientation={orientation}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Card mt={4} borderRadius={borderRadiusSchemes}>
        <CardBody>
          {activeStep === 0 && (
            <>
              <ContractSelected />
            </>
          )}
          {activeStep === 1 && (
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input placeholder="Address" />
              <FormLabel mt={2}>City</FormLabel>
              <Input placeholder="City" />
              <FormLabel mt={2}>Postal Code</FormLabel>
              <Input placeholder="Postal Code" />
            </FormControl>
          )}
          {activeStep === 2 && (
            <Box>
              <p>Review your details here...</p>
              {/* Add your review details */}
            </Box>
          )}
        </CardBody>
      </Card>

      <Flex mt={4} justify="end">
        <HStack>
          <Button
            onClick={handlePrevious}
            isDisabled={activeStep === 0}
            colorScheme="teal"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            isDisabled={activeStep === steps.length - 1}
            colorScheme="teal"
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

interface ContractCompanies {
  company_id: string;
  company_name: string | null;
  company_role: string;
}

interface ContractOrder {
  contract_number: string;
  contract_expired: string;
  companies_contracts: ContractCompanies[];
}

const OrderContractsInit: ContractOrder = {
  contract_number: "0000000000000", // generate
  contract_expired: "09/06/2025", // generate
  companies_contracts: [
    {
      company_id: "00000000", // generate
      company_name: "P T", // generate
      company_role: "Penyalur", // constant
    },
    {
      company_id: "00000000", // generate
      company_name: "P T",
      company_role: "Pemanfaat", // constant
    },
    {
      company_id: "00000000", // generate
      company_name: "P T", // generate
      company_role: "Logistik", // constant
    },
  ],
};

const ListContractCompanies: ContractOrder[] = [
  {
    contract_number: "ABC1234567890",
    contract_expired: "09/06/2025",
    companies_contracts: [
      {
        company_id: "XYZ12345",
        company_name: "P T A1B",
        company_role: "Penyalur",
      },
      {
        company_id: "LMN67890",
        company_name: "P T C2D",
        company_role: "Pemanfaat",
      },
      {
        company_id: "QRS54321",
        company_name: "P T E3F",
        company_role: "Logistik",
      },
    ],
  },
  {
    contract_number: "DEF2345678901",
    contract_expired: "09/06/2025",
    companies_contracts: [
      {
        company_id: "UVW23456",
        company_name: "P T G4H",
        company_role: "Penyalur",
      },
      {
        company_id: "OPQ34567",
        company_name: "P T I5J",
        company_role: "Pemanfaat",
      },
      {
        company_id: "TUV67890",
        company_name: "P T K6L",
        company_role: "Logistik",
      },
    ],
  },
  {
    contract_number: "GHI3456789012",
    contract_expired: "09/06/2025",
    companies_contracts: [
      {
        company_id: "ABC34567",
        company_name: "P T M7N",
        company_role: "Penyalur",
      },
      {
        company_id: "DEF45678",
        company_name: "P T O8P",
        company_role: "Pemanfaat",
      },
      {
        company_id: "GHI56789",
        company_name: "P T Q9R",
        company_role: "Logistik",
      },
    ],
  },
  {
    contract_number: "JKL4567890123",
    contract_expired: "09/06/2025",
    companies_contracts: [
      {
        company_id: "XYZ45678",
        company_name: "P T S1T",
        company_role: "Penyalur",
      },
      {
        company_id: "LMN56789",
        company_name: "P T U2V",
        company_role: "Pemanfaat",
      },
      {
        company_id: "QRS67890",
        company_name: "P T W3X",
        company_role: "Logistik",
      },
    ],
  },
  {
    contract_number: "MNO5678901234",
    contract_expired: "09/06/2025",
    companies_contracts: [
      {
        company_id: "UVW56789",
        company_name: "P T Y4Z",
        company_role: "Penyalur",
      },
      {
        company_id: "OPQ67890",
        company_name: "P T A5B",
        company_role: "Pemanfaat",
      },
      {
        company_id: "TUV78901",
        company_name: "P T C6D",
        company_role: "Logistik",
      },
    ],
  },
];

const ContractSelected = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [OrderContract, setOrderContract] =
    useState<ContractOrder>(OrderContractsInit);

  const ModalListContract = () => {
    onOpen();
  };

  return (
    <Flex justifyContent={"center"}>
      <Box as={VStack} my={10}>
        <Grid templateColumns="repeat(8, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 12, md: 2 }}>
            <Flex justifyContent={"center"}>
              <AvatarGroup size="md" max={3}>
                {OrderContract.companies_contracts.map((data, index) => (
                  <Avatar
                    key={index}
                    bg="teal"
                    icon={<RiVipCrownLine />}
                    name={data.company_name != null ? data.company_name : "P T"}
                    color={"yellow"}
                  />
                ))}
              </AvatarGroup>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Flex as={VStack} alignItems={"start"} spacing={0}>
              <Tooltip label={"Kontrak - #" + OrderContract.contract_number}>
                <Text fontWeight={"bold"} isTruncated>
                  Kontrak - #{OrderContract.contract_number}
                </Text>
              </Tooltip>
              <Text fontSize={"xs"}>
                <HStack>
                  <Text
                    as={"b"}
                    fontSize={"xs"}
                    fontStyle="italic"
                    color={"gray.500"}
                  >
                    Expired :
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontStyle="italic"
                    fontSize={"xs"}
                    color={"gray.600"}
                  >
                    {OrderContract.contract_expired}
                  </Text>
                </HStack>
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 2 }}>
            <ButtonGroup
              isAttached
              variant="solid"
              colorScheme="teal"
              w={{ base: "full", md: "auto" }}
            >
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<RiMore2Line />}
                  colorScheme={"gray"}
                  variant={"outline"}
                />
                <MenuList>
                  <MenuItem icon={<RiInformation2Line />}>
                    Detail Contract
                  </MenuItem>
                </MenuList>
              </Menu>
              <Button
                rightIcon={<ArrowForwardIcon />}
                onClick={() => ModalListContract()}
              >
                Pilih Kontrak
              </Button>
            </ButtonGroup>
          </GridItem>
        </Grid>
      </Box>
      {/* Modal */}
      <Modal
        isCentered
        onClose={onClose}
        size={{ base: "xs", md: "xl" }}
        isOpen={isOpen}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pilih Kontrak</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={5}>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
              <GridItem w={"full"} colSpan={{ base: 12, md: 12 }}>
                <FormControl w={"full"}>
                  <FormLabel>Filter Nomor Kontrak</FormLabel>
                  <Input placeholder="#0000000000" />
                </FormControl>
              </GridItem>
              <GridItem w={"full"} colSpan={{ base: 12, md: 12 }}>
                <VStack>
                  {ListContractCompanies.map((data, index) => (
                    <Card borderRadius={borderRadiusSchemes}>
                      <CardBody>
                        <ItemContractCompany key={index} dataContract={data} />
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              </GridItem>
            </Grid>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Flex>
  );
};

const ItemContractCompany = ({
  dataContract,
}: {
  dataContract: ContractOrder;
}) => {
  return (
    <Flex justifyContent={"center"}>
      <Box as={VStack}>
        <Grid templateColumns="repeat(8, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 12, md: 2 }} w={"full"}>
            <Flex justifyContent="center" alignItems="center" h={"full"}>
              <VStack>
                <AvatarGroup size="md" max={3}>
                  {dataContract.companies_contracts.map((data, index) => (
                    <Avatar
                      key={index}
                      bg="teal"
                      icon={<RiVipCrownLine />}
                      name={
                        data.company_name != null ? data.company_name : "P T"
                      }
                      color={"yellow"}
                    />
                  ))}
                </AvatarGroup>
              </VStack>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 4 }}>
            <Flex as={VStack} alignItems={"start"} spacing={0}>
              <Tooltip label={"Kontrak - #" + dataContract.contract_number}>
                <Text fontWeight={"bold"} isTruncated>
                  Kontrak - #{dataContract.contract_number}
                </Text>
              </Tooltip>
              <Text fontSize={"xs"}>
                <VStack alignItems={"start"} pt={3} spacing={0}>
                  <HStack>
                    <Text as={"b"} fontSize={"xs"} color={"gray.500"}>
                      Penyalur :
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontStyle="italic"
                      fontSize={"xs"}
                      color={"gray.600"}
                    >
                      PT. Serba Guna Mitra
                    </Text>
                  </HStack>
                  <HStack>
                    <Text as={"b"} fontSize={"xs"} color={"gray.500"}>
                      Pemanfaat :
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontStyle="italic"
                      fontSize={"xs"}
                      color={"gray.600"}
                    >
                      CV. Arklik Nusantara
                    </Text>
                  </HStack>
                  <HStack>
                    <Text as={"b"} fontSize={"xs"} color={"gray.500"}>
                      Logistik :
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontStyle="italic"
                      fontSize={"xs"}
                      color={"gray.600"}
                    >
                      PT. Mamang Resing
                    </Text>
                  </HStack>
                  <HStack>
                    <Text as={"b"} fontSize={"xs"} color={"gray.500"}>
                      Expired :
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontStyle="italic"
                      fontSize={"xs"}
                      color="gray.600"
                    >
                      {dataContract.contract_expired}
                    </Text>
                  </HStack>
                </VStack>
              </Text>
            </Flex>
          </GridItem>

          <GridItem colSpan={{ base: 12, md: 2 }}>
            <Flex justifyContent="center" alignItems="center" h={"full"}>
              <ButtonGroup
                isAttached
                variant="solid"
                colorScheme="teal"
                w={{ base: "full", md: "auto" }}
                size={"sm"}
              >
                <Tooltip label={"Detail Kontrak"}>
                  <Button
                    w={{ base: "20%", md: "auto" }}
                    colorScheme={"gray"}
                    variant={"outline"}
                  >
                    <RiInformation2Line />
                  </Button>
                </Tooltip>
                <Button
                  w={{ base: "80%", md: "auto" }}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Pilih
                </Button>
              </ButtonGroup>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

export default OrderNew;
