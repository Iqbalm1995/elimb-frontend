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
import {
  borderRadiusSchemes,
  specialColor,
  specialColorDark,
} from "../../components/themes/colorScheme";
import { useEffect, useState } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { orderList } from "../../data/NavigationUrlConstants";
import {
  AddIcon,
  ArrowForwardIcon,
  CloseIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import {
  RiInformation2Line,
  RiMore2Line,
  RiVipCrownLine,
} from "react-icons/ri";
import {
  ContractCompanies,
  ContractOrder,
  OrdersState,
  useOrdersState,
} from "../../data/GlobalStates/OrdersState";
import { GiChemicalDrop } from "react-icons/gi";
import {
  LabelFeatured1,
  LabelFeatured1sm,
  LabelFeaturedCart,
} from "../../components/_MasterComponents";
import headerBg from "../../assets/graphic-profile-design.png";

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

const OrderNew = () => {
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );
  const setOrderSelectedContract = useOrdersState(
    (state: OrdersState) => state.setOrderSelectedContract
  );
  const { OrderSelectedContract } = useOrdersState((state) => ({
    OrderSelectedContract: state.OrderSelectedContract,
  }));

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Create New Order",
      breadcrumbItems: ["Pages", "Order", "Create"],
    });

    //set init value order state
    setOrderSelectedContract(OrderContractsInit);

    // console.log(OrderSelectedContract);
  }, []);

  return (
    <>
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
          {activeStep === 0 && <ContractSelected />}
          {activeStep === 1 && <WastesListAndCart />}
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

// step 1
const ContractSelected = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [OrderContract, setOrderContract] =
    useState<ContractOrder>(OrderContractsInit);
  const { OrderSelectedContract } = useOrdersState((state) => ({
    OrderSelectedContract: state.OrderSelectedContract,
  }));

  const ModalListContract = () => {
    onOpen();
  };

  // set Order selected
  useEffect(() => {
    setOrderContract(OrderSelectedContract || OrderContractsInit);
  }, [OrderSelectedContract]);

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
                <VStack spacing={4}>
                  {ListContractCompanies.map((data, index) => (
                    <ItemContractCompany
                      dataContract={data}
                      onCloseModal={onClose}
                      key={index}
                    />
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
  onCloseModal,
}: {
  dataContract: ContractOrder;
  onCloseModal: any;
}) => {
  const setOrderSelectedContract = useOrdersState(
    (state: OrdersState) => state.setOrderSelectedContract
  );

  const [CmpPenyalur, setCmpPenyalur] = useState<ContractCompanies>(
    dataContract.companies_contracts.filter(
      (x) => x.company_role === "Penyalur"
    )[0]
  );

  const [CmpPemanfaat, setCmpPemanfaat] = useState<ContractCompanies>(
    dataContract.companies_contracts.filter(
      (x) => x.company_role === "Pemanfaat"
    )[0]
  );

  const [CmpLogistik, setCmpLogistik] = useState<ContractCompanies>(
    dataContract.companies_contracts.filter(
      (x) => x.company_role === "Logistik"
    )[0]
  );

  const setSelectedContract = (data: ContractOrder) => {
    // console.log(data);
    setOrderSelectedContract(data);
    onCloseModal();
  };

  return (
    <Card borderRadius={borderRadiusSchemes}>
      <CardBody>
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
                            data.company_name != null
                              ? data.company_name
                              : "P T"
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
                        {CmpPenyalur.company_name}
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
                        {CmpPemanfaat.company_name}
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
                        {CmpLogistik.company_name}
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
                      onClick={() => setSelectedContract(dataContract)}
                    >
                      Pilih
                    </Button>
                  </ButtonGroup>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
// end step 1

// step 2
interface DataWastes {
  id: string;
  code_waste: string;
  name_waste: string;
  registration_date: string;
  waste_category_name: string;
  waste_source_name: string;
  waste_management_name: string;
  waste_hazard_name: string;
  description: string;
}

const ListDataWastes: DataWastes[] = [
  {
    id: "52b1f49c-9cd4-410c-8bb8-4015f15ac5d5",
    code_waste: "UT0OZVW7",
    name_waste: "Limbah Medis Bekas Alat Suntik",
    registration_date: "2024-02-23T14:15:28.910369",
    waste_category_name: "Limbah Medis",
    waste_source_name: "Pabrik A",
    waste_management_name: "Pembakaran",
    waste_hazard_name: "Bahan Kimia Berbahaya",
    description: "Deskripsi untuk Limbah Medis Bekas Alat Suntik",
  },
  {
    id: "7f487b02-cec8-4e4a-964a-cbac9edca744",
    code_waste: "M40PF3BP",
    name_waste: "Limbah B3 Bahan Kimia Kadaluarsa",
    registration_date: "2024-01-13T14:15:28.910369",
    waste_category_name: "Limbah B3",
    waste_source_name: "Rumah Sakit B",
    waste_management_name: "Pembakaran",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah B3 Bahan Kimia Kadaluarsa",
  },
  {
    id: "05436054-fcf1-4487-890d-c15f6d6aad60",
    code_waste: "FLE0AMX4",
    name_waste: "Limbah Medis Bekas Obat",
    registration_date: "2024-05-25T14:15:28.910369",
    waste_category_name: "Limbah Medis",
    waste_source_name: "Pabrik A",
    waste_management_name: "Daur Ulang",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah Medis Bekas Obat",
  },
  {
    id: "66fc5ad9-1624-4c90-85cf-69aa7a4a9ea6",
    code_waste: "49B5GTV3",
    name_waste: "Limbah B3 Oli Bekas",
    registration_date: "2024-03-24T14:15:28.910369",
    waste_category_name: "Limbah Medis",
    waste_source_name: "Rumah Sakit B",
    waste_management_name: "Pembakaran",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah B3 Oli Bekas",
  },
  {
    id: "a26cdb27-2d02-4805-bea6-9efd608a6085",
    code_waste: "DDFN8AE1",
    name_waste: "Limbah Medis Bekas Perban",
    registration_date: "2023-08-14T14:15:28.910369",
    waste_category_name: "Limbah B3",
    waste_source_name: "Rumah Sakit B",
    waste_management_name: "Pembakaran",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah Medis Bekas Perban",
  },
  {
    id: "f8c6ab41-b5ea-473b-aba4-dbf15b81db63",
    code_waste: "Y8LZ3N2O",
    name_waste: "Limbah B3 Limbah Cair Berbahaya",
    registration_date: "2023-07-25T14:15:28.910369",
    waste_category_name: "Limbah B3",
    waste_source_name: "Pabrik A",
    waste_management_name: "Pembakaran",
    waste_hazard_name: "Bahan Kimia Berbahaya",
    description: "Deskripsi untuk Limbah B3 Limbah Cair Berbahaya",
  },
  {
    id: "7f25cbb8-89a8-43f6-9d24-fb5226eaf36e",
    code_waste: "N5HV6J7T",
    name_waste: "Limbah Medis Bekas Alat Bedah",
    registration_date: "2023-10-19T14:15:28.910369",
    waste_category_name: "Limbah Medis",
    waste_source_name: "Rumah Sakit B",
    waste_management_name: "Daur Ulang",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah Medis Bekas Alat Bedah",
  },
  {
    id: "c3300a70-3d88-4e08-9eeb-3e4e49e8ad00",
    code_waste: "G7XZ1RMQ",
    name_waste: "Limbah B3 Logam Berat",
    registration_date: "2024-06-04T14:15:28.910369",
    waste_category_name: "Limbah B3",
    waste_source_name: "Pabrik A",
    waste_management_name: "Daur Ulang",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah B3 Logam Berat",
  },
  {
    id: "3b08865f-f43d-4b46-b200-83f3ba1d7852",
    code_waste: "2G75X2BQ",
    name_waste: "Limbah Medis Bekas Alat Infus",
    registration_date: "2023-09-15T14:15:28.910369",
    waste_category_name: "Limbah B3",
    waste_source_name: "Rumah Sakit B",
    waste_management_name: "Daur Ulang",
    waste_hazard_name: "Bahan Kimia Berbahaya",
    description: "Deskripsi untuk Limbah Medis Bekas Alat Infus",
  },
  {
    id: "59460676-9fb5-4753-97bd-96bbe26bfb1c",
    code_waste: "5X1Q2IZQ",
    name_waste: "Limbah B3 Zat Pewarna",
    registration_date: "2023-07-28T14:15:28.910369",
    waste_category_name: "Limbah Medis",
    waste_source_name: "Pabrik A",
    waste_management_name: "Pembakaran",
    waste_hazard_name: "Bahan Kimia Berbahaya",
    description: "Deskripsi untuk Limbah B3 Zat Pewarna",
  },
  {
    id: "29c2da18-d850-40b5-a061-33edb4ce49d5",
    code_waste: "O5XJO63C",
    name_waste: "Limbah Medis Bekas Sarung Tangan",
    registration_date: "2024-01-15T14:15:28.910369",
    waste_category_name: "Limbah Medis",
    waste_source_name: "Pabrik A",
    waste_management_name: "Daur Ulang",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah Medis Bekas Sarung Tangan",
  },
  {
    id: "bde5a38f-2ca0-434c-8318-380efc60fc5a",
    code_waste: "80247MDQ",
    name_waste: "Limbah B3 Pelarut Organik",
    registration_date: "2023-11-13T14:15:28.910369",
    waste_category_name: "Limbah Medis",
    waste_source_name: "Rumah Sakit B",
    waste_management_name: "Daur Ulang",
    waste_hazard_name: "Infeksius",
    description: "Deskripsi untuk Limbah B3 Pelarut Organik",
  },
];

// end step 2
const WastesListAndCart = () => {
  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        <GridItem w={"full"} colSpan={{ base: 12, md: 9 }}>
          <VStack alignItems={"start"}>
            <Text fontWeight={"medium"} fontSize="2xl">
              Daftar Limbah Tersedia
            </Text>
            <FormControl w={"full"}>
              <FormLabel>Pencarian : </FormLabel>
              <Input placeholder="#0000000000" />
            </FormControl>
            <Box w={"full"}>
              <VStack spacing={2}>
                {ListDataWastes.map((data, index) => (
                  <WastesCard dataWaste={data} key={index} />
                ))}
              </VStack>
            </Box>
          </VStack>
        </GridItem>
        <GridItem w={"full"} colSpan={{ base: 12, md: 3 }}>
          <VStack alignItems={"start"}>
            <Text fontWeight={"medium"} fontSize="2xl">
              Daftar Dipillih
            </Text>
            <Card
              borderRadius={borderRadiusSchemes}
              boxShadow={"xl"}
              bgColor={"gray.100"}
            >
              <CardBody>
                <Flex
                  justifyContent={"space-between"}
                  w={"full"}
                  pb={2}
                  as={HStack}
                >
                  <Text fontWeight={"bold"}>8 Item</Text>
                  <Button
                    leftIcon={<SmallCloseIcon />}
                    colorScheme="red"
                    variant="outline"
                    size={"sm"}
                  >
                    Bersihkan
                  </Button>
                </Flex>
                <Box w={"full"} maxH="400px" overflowY="auto">
                  <VStack spacing={2}>
                    {ListDataWastes.map((data, index) => (
                      <WasteCardCart dataWaste={data} key={index} />
                    ))}
                  </VStack>
                </Box>
                <Flex justifyContent={"end"} w={"full"} pt={2}></Flex>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

const WastesCard = ({ dataWaste }: { dataWaste: DataWastes }) => {
  return (
    <Card borderRadius={borderRadiusSchemes}>
      <CardBody>
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          <GridItem w={"full"} colSpan={{ base: 12, md: 2 }}>
            <Flex
              borderRadius={borderRadiusSchemes}
              bgColor={specialColor}
              p={4}
              h={"150px"}
              w={"full"}
              justifyContent="center"
              alignItems="center"
            >
              <GiChemicalDrop size={"4em"} color={specialColorDark} />
            </Flex>
          </GridItem>
          <GridItem w={"full"} colSpan={{ base: 12, md: 8 }}>
            <Box w={"full"}>
              <Flex
                as={HStack}
                spacing={2}
                justifyContent="start"
                alignItems="end"
              >
                <Text as={"b"} fontSize="xl">
                  {dataWaste.name_waste}
                </Text>
                <Text fontSize={"md"} color={"gray.500"}>
                  #{dataWaste.code_waste}
                </Text>
              </Flex>
              <VStack alignItems={"start"} pt={3} spacing={0}>
                <LabelFeatured1
                  label={"Tanggal Registrasi :"}
                  value={dataWaste.registration_date}
                />
                <LabelFeatured1
                  label={"Kategori :"}
                  value={dataWaste.waste_category_name}
                />
                <LabelFeatured1
                  label={"Asal Limbah :"}
                  value={dataWaste.waste_source_name}
                />
                <LabelFeatured1
                  label={"Pengelolaan :"}
                  value={dataWaste.waste_management_name}
                />
                <LabelFeatured1
                  label={"Label Bahaya :"}
                  value={dataWaste.waste_hazard_name}
                />
                <LabelFeatured1
                  label={"Deskripsi :"}
                  value={dataWaste.description}
                />
              </VStack>
            </Box>
          </GridItem>
          <GridItem w={"full"} colSpan={{ base: 12, md: 2 }}>
            <Flex
              borderRadius={borderRadiusSchemes}
              // bgColor={"gray.100"}
              objectFit={"cover"}
              bgSize="cover"
              p={4}
              h={{ base: "50px", md: "150px" }}
              justifyContent={"center"}
              as={HStack}
            >
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                variant="ghost"
                size={"lg"}
                onClick={() => console.log(dataWaste)}
              >
                Tambah
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

const WasteCardCart = ({ dataWaste }: { dataWaste: DataWastes }) => {
  return (
    <Card borderRadius={borderRadiusSchemes} w={"full"}>
      <CardBody p={0}>
        <Grid templateColumns="repeat(12, 1fr)" gap={5}>
          <GridItem w={"full"} colSpan={{ base: 12, md: 3 }}>
            <Flex
              // borderRadius={borderRadiusSchemes}
              borderLeftRadius={borderRadiusSchemes}
              // borderRadius="full"
              bgColor={specialColor}
              h={"80px"}
              w={"full"}
              // boxSize={"50px"}
              justifyContent="center"
              alignItems="center"
              // m={2}
            >
              <GiChemicalDrop size={"2em"} color={specialColorDark} />
            </Flex>
          </GridItem>
          <GridItem w={"full"} colSpan={{ base: 12, md: 8 }}>
            <Flex
              h={"full"}
              w={"full"}
              justifyContent="center"
              alignItems="start"
              as={VStack}
              spacing={0}
            >
              <Text as={"b"} fontSize="sm">
                {dataWaste.name_waste}
              </Text>
              <VStack alignItems={"start"} pt={1} spacing={0}>
                <LabelFeaturedCart label={"Berat :"} value={"250 Kg"} />
              </VStack>
            </Flex>
          </GridItem>
          <GridItem w={"full"} colSpan={{ base: 12, md: 1 }}>
            <Flex
              h={"full"}
              w={"full"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                colorScheme="red"
                variant="link"
                size={"sm"}
                onClick={() => console.log(dataWaste)}
              >
                <SmallCloseIcon />
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default OrderNew;
