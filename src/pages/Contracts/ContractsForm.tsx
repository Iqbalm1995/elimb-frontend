import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ContractData,
  ContractRegistrationForm,
} from "../../typesModel/ContractTypes";
import * as Yup from "yup";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import useNavigationState from "../../data/GlobalStates/NavigationState";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  CheckIcon,
  ChevronRightIcon,
  EditIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import { contractList } from "../../data/NavigationUrlConstants";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import { CompanyData } from "../../typesModel/CompaniesTypes";
import { PagesQueryParameter } from "../../typesModel/MasterParameterTypes";
import {
  PostCompaniesDetailByIdServices,
  PostCompaniesListServices,
} from "../../services/CompaniesServices";
import { HttpStatusCode } from "axios";
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import logoDefaultCompany from "../../assets/default-company-logo.png";
import {
  BasicTable,
  ControlTable,
  TableInputShowPage,
} from "../../components/TableComponents";
import Select from "react-select";
import { OptionData } from "../../typesModel/OptionValuesTypes";
import { PersonnelData } from "../../typesModel/PersonelTypes";
import { PostPersonelListServices } from "../../services/PersonelServices";
import { SingleDatepicker } from "../../components/DayzedDatepicker";
import { formatDateToYYYYMMDD } from "../../helper/MasterHelper";
import { RequestRegisterDataContract } from "../../data/ContractsData/ContractsHook";

const formInputInitial: ContractRegistrationForm = {
  contractNumber: "S00001",
  contractTitle: "Dummy Contract 1",
  contractDetails:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta est earum eos doloribus, ipsum quibusdam incidunt asperiores harum excepturi optio nulla quas dolore at molestias consequatur reprehenderit architecto! Dicta, nisi.",
  startDate: formatDateToYYYYMMDD(new Date()),
  endDate: formatDateToYYYYMMDD(new Date()),
  companyRegPemanfaat: {
    companyId: "",
    personnelId: "",
  },
  companyRegPenyalur: {
    companyId: "",
    personnelId: "",
  },
  companyRegTransport: {
    companyId: "",
    personnelId: "",
  },
};

const FormSchema = Yup.object().shape({
  contractNumber: Yup.string().required("Wajib di isi!"),
  contractTitle: Yup.string().required("Wajib di isi!"),
  contractDetails: Yup.string().required("Wajib di isi!"),
  startDate: Yup.string().required("Wajib di isi!"),
  endDate: Yup.string().required("Wajib di isi!"),
});

const ContractsForm = () => {
  const [SearchParams] = useSearchParams();
  const showToast = useToastHelper();
  const AuthData = useAuthenticationState((state: any) => state.AuthData);
  const navigate = useNavigate();
  const { NavigationActive } = useNavigationState((state: any) => ({
    NavigationActive: state.NavigationActive,
  }));
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );
  const [EditMode, setEditMode] = useState(false);
  const [Data, setData] = useState<ContractData | null>(null);

  // recognition id
  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: `Registrasi Kontrak`,
      breadcrumbItems: ["Pages", "Kontrak", `Registrasi`],
    });
  }, []);

  // formik config
  const formik = useFormik({
    initialValues: formInputInitial,
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onReset: () => {
      ResetInput();
    },
    onSubmit: (values) => {
      console.log("SUBMITED");
      console.log(values);
      HandleSubmit(values);
    },
  });
  // end formik config

  // Navigation
  const BackPageAction = () => {
    navigate(contractList);
  };

  const ResetInput = () => {
    formik.setValues(formInputInitial);
    console.log("RESET BOSS");
    setSelectedComp1(null);
    setSelectedComp2(null);
    setSelectedComp3(null);
    setSelectedCompany([]);
    setSelectedComp1Detail(null);
    setSelectedComp2Detail(null);
    setSelectedComp3Detail(null);
    setOptionComp1PIC([]);
    setOptionComp2PIC([]);
    setOptionComp3PIC([]);
  };

  const firstModal = useDisclosure();
  const secondModal = useDisclosure();
  const thirdModal = useDisclosure();
  const [SelectedCompany, setSelectedCompany] = useState<string[]>([]);

  // Function to append a company to the selectedCompany array using functional update
  const addCompany = (company: string) => {
    setSelectedCompany((prevSelectedCompany) => {
      if (!prevSelectedCompany.includes(company)) {
        return [...prevSelectedCompany, company];
      }
      return prevSelectedCompany;
    });
  };

  // Function to exclude (remove) a company from the selectedCompany array
  const removeCompany = (company: string) => {
    setSelectedCompany((prevSelectedCompany) =>
      prevSelectedCompany.filter((c) => c !== company)
    );
  };

  // Toggle function to append or remove a company
  const toggleCompany = (company: string) => {
    if (SelectedCompany.includes(company)) {
      // If company exists, remove it
      removeCompany(company);
    } else {
      // If company does not exist, add it
      addCompany(company);
    }
  };

  const [SelectedComp1, setSelectedComp1] = useState<string | null>(null);
  const [SelectedComp2, setSelectedComp2] = useState<string | null>(null);
  const [SelectedComp3, setSelectedComp3] = useState<string | null>(null);

  const [SelectedComp1Detail, setSelectedComp1Detail] =
    useState<CompanyData | null>(null);
  const [SelectedComp2Detail, setSelectedComp2Detail] =
    useState<CompanyData | null>(null);
  const [SelectedComp3Detail, setSelectedComp3Detail] =
    useState<CompanyData | null>(null);

  const [OptionComp1PIC, setOptionComp1PIC] = useState<OptionData[]>([]);
  const [OptionComp2PIC, setOptionComp2PIC] = useState<OptionData[]>([]);
  const [OptionComp3PIC, setOptionComp3PIC] = useState<OptionData[]>([]);

  const handleParentAction1 = async (actionName: string) => {
    if (SelectedComp1 != null) {
      removeCompany(SelectedComp1);
    }
    // get detail comp
    try {
      const getCompDetail = await RequestGetCompanies(actionName);
      console.log(getCompDetail);
      if (getCompDetail != null) {
        setSelectedComp1Detail(getCompDetail);
      }
    } catch (error) {
      showToast({
        description: `Error : ${error}`,
        statusToast: "error",
      });
    }
    // get personel comp
    const ParameterPersonelList: PagesQueryParameter = {
      search: "",
      keyId: null,
      page: 0,
      limit: 9999999,
      filterWhere: [
        {
          field: "companyId",
          value: actionName,
          operator: "=",
        },
      ],
      fieldOrder: ["name"],
      orderDir: "asc",
    };
    // console.log(ParameterPersonelList);
    try {
      const getPersonelList = await RequestListPersonels(ParameterPersonelList);
      if (getPersonelList != null) {
        setOptionComp1PIC(
          getPersonelList.map((x) => ({
            label: `[${x.noPersonnel}] ${x.name} - ${x.personnelTypeName}`,
            value: x.id,
          }))
        );
      }
    } catch (error) {
      showToast({
        description: `Error : ${error}`,
        statusToast: "error",
      });
    }
    console.log(`Parent action triggered: ${actionName}`);
    setSelectedComp1(actionName);
    formik.setFieldValue("companyRegPemanfaat.companyId", actionName);
    toggleCompany(actionName);
  };

  const handleParentAction2 = async (actionName: string) => {
    if (SelectedComp2 != null) {
      removeCompany(SelectedComp2);
    }
    // get detail comp
    try {
      const getCompDetail = await RequestGetCompanies(actionName);
      console.log(getCompDetail);
      if (getCompDetail != null) {
        setSelectedComp2Detail(getCompDetail);
      }
    } catch (error) {
      showToast({
        description: `Error : ${error}`,
        statusToast: "error",
      });
    }
    // get personel comp
    const ParameterPersonelList: PagesQueryParameter = {
      search: "",
      keyId: null,
      page: 0,
      limit: 9999999,
      filterWhere: [
        {
          field: "companyId",
          value: actionName,
          operator: "=",
        },
      ],
      fieldOrder: ["name"],
      orderDir: "asc",
    };
    // console.log(ParameterPersonelList);
    try {
      const getPersonelList = await RequestListPersonels(ParameterPersonelList);
      if (getPersonelList != null) {
        setOptionComp2PIC(
          getPersonelList.map((x) => ({
            label: `[${x.noPersonnel}] ${x.name} - ${x.personnelTypeName}`,
            value: x.id,
          }))
        );
      }
    } catch (error) {
      showToast({
        description: `Error : ${error}`,
        statusToast: "error",
      });
    }
    console.log(`Parent action triggered: ${actionName}`);
    setSelectedComp2(actionName);
    formik.setFieldValue("companyRegPenyalur.companyId", actionName);
    toggleCompany(actionName);
  };

  const handleParentAction3 = async (actionName: string) => {
    if (SelectedComp3 != null) {
      removeCompany(SelectedComp3);
    }
    // get detail comp
    try {
      const getCompDetail = await RequestGetCompanies(actionName);
      console.log(getCompDetail);
      if (getCompDetail != null) {
        setSelectedComp3Detail(getCompDetail);
      }
    } catch (error) {
      showToast({
        description: `Error : ${error}`,
        statusToast: "error",
      });
    }
    // get personel comp
    const ParameterPersonelList: PagesQueryParameter = {
      search: "",
      keyId: null,
      page: 0,
      limit: 9999999,
      filterWhere: [
        {
          field: "companyId",
          value: actionName,
          operator: "=",
        },
      ],
      fieldOrder: ["name"],
      orderDir: "asc",
    };
    // console.log(ParameterPersonelList);
    try {
      const getPersonelList = await RequestListPersonels(ParameterPersonelList);
      if (getPersonelList != null) {
        setOptionComp3PIC(
          getPersonelList.map((x) => ({
            label: `[${x.noPersonnel}] ${x.name} - ${x.personnelTypeName}`,
            value: x.id,
          }))
        );
      }
    } catch (error) {
      showToast({
        description: `Error : ${error}`,
        statusToast: "error",
      });
    }
    console.log(`Parent action triggered: ${actionName}`);
    setSelectedComp3(actionName);
    formik.setFieldValue("companyRegTransport.companyId", actionName);
    toggleCompany(actionName);
  };

  // Get Data Company
  const RequestGetCompanies = (
    company_id: string
  ): Promise<CompanyData | null> => {
    return PostCompaniesDetailByIdServices(company_id, AuthData.apiKey)
      .then((response: any) => {
        if (response.status !== HttpStatusCode.Ok) {
          showToast({
            description: `${response.data.message}`,
            statusToast: "warning",
          });
          return null;
        }
        return response.data.data as CompanyData;
      })
      .catch((error) => {
        showToast({
          description: `Error : ${error.message}`,
          statusToast: "error",
        });
        return null;
      });
  };

  // Get Data PIC Company
  const RequestListPersonels = (
    payload: PagesQueryParameter
  ): Promise<PersonnelData[]> => {
    return PostPersonelListServices(payload, AuthData.apiKey)
      .then((response: any) => {
        if (response.status !== HttpStatusCode.Ok) {
          showToast({
            description: `${response.data.message}`,
            statusToast: "warning",
          });
          return [];
        }
        return response.data.data as PersonnelData[];
      })
      .catch((error) => {
        showToast({
          description: `Error : ${error.message}`,
          statusToast: "error",
        });
        return [];
      });
  };

  const [StartContractDate, setStartContractDate] = useState(new Date());
  const HandlingStartContractDate = (date: Date) => {
    // console.log(date);
    formik.setFieldValue("startDate", formatDateToYYYYMMDD(date));
  };

  const [EndContractDate, setEndContractDate] = useState(new Date());
  const HandlingEndContractDate = (date: Date) => {
    // console.log(date);
    formik.setFieldValue("endDate", formatDateToYYYYMMDD(date));
  };

  // save data
  const HandleSubmit = async (data: ContractRegistrationForm) => {
    const token = AuthData.apiKey;
    let SaveData = await RequestRegisterDataContract(data, token);
    if (SaveData.status == true) {
      showToast({
        description: SaveData.message,
        statusToast: "success",
      });
    } else {
      showToast({
        description: SaveData.message,
        statusToast: "error",
      });
    }
  };

  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Grid templateColumns="repeat(12, 1fr)" gap={2} pb={2}>
            <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
              <Flex justifyContent={"start"}>
                <Button
                  // colorScheme="primary"
                  w={{ base: "full", md: "auto" }}
                  leftIcon={<ArrowBackIcon />}
                  size={{ base: "lg", md: "md" }}
                  boxShadow={"lg"}
                  onClick={BackPageAction}
                >
                  Kembali
                </Button>
              </Flex>
            </GridItem>
            <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
              <Stack
                direction={["column", "row"]}
                w={"full"}
                justifyContent={"end"}
              >
                <Button
                  colorScheme="blue"
                  w={{ base: "full", md: "auto" }}
                  leftIcon={<CheckIcon />}
                  size={{ base: "lg", md: "md" }}
                  boxShadow={"lg"}
                  type={"submit"}
                >
                  Simpan Data
                </Button>
                <Button
                  // colorScheme="primary"
                  w={{ base: "full", md: "auto" }}
                  leftIcon={<RepeatClockIcon />}
                  size={{ base: "lg", md: "md" }}
                  boxShadow={"lg"}
                  type={"reset"}
                >
                  Reset
                </Button>
              </Stack>
            </GridItem>
            <GridItem w={"full"} colSpan={{ base: 12, md: 12 }}>
              <Card borderRadius={borderRadiusSchemes}>
                <CardHeader>
                  <Heading size={"md"}>Pengisian Kontrak Baru</Heading>
                </CardHeader>
                <CardBody>
                  <Flex w={"full"} justifyContent={"center"} pb={10}>
                    <VStack w={{ base: "full", md: "80%" }}>
                      <FormControl
                        isInvalid={formik.errors.contractNumber ? true : false}
                        isRequired
                      >
                        <FormLabel>Nomor Kontrak</FormLabel>
                        <Input
                          id={"contractNumber"}
                          name={"contractNumber"}
                          type={"text"}
                          onChange={formik.handleChange}
                          value={formik.values.contractNumber}
                          placeholder="Nomor Kontrak"
                          disabled={EditMode}
                        />
                        <FormErrorMessage>
                          {formik.errors.contractNumber}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={formik.errors.contractTitle ? true : false}
                        isRequired
                      >
                        <FormLabel>Judul Kontrak</FormLabel>
                        <Input
                          id={"contractTitle"}
                          name={"contractTitle"}
                          type={"text"}
                          onChange={formik.handleChange}
                          value={formik.values.contractTitle}
                          placeholder="Judul Kontrak"
                        />
                        <FormErrorMessage>
                          {formik.errors.contractTitle}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={formik.errors.contractDetails ? true : false}
                      >
                        <FormLabel>Deskripsi</FormLabel>
                        <Textarea
                          id={"contractDetails"}
                          name={"contractDetails"}
                          onChange={formik.handleChange}
                          value={formik.values.contractDetails}
                          placeholder="Deskripsi"
                        />
                        <FormErrorMessage>
                          {formik.errors.contractDetails}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={formik.errors.startDate ? true : false}
                        isRequired
                      >
                        <FormLabel>Tanggal Mulai Kontrak</FormLabel>
                        <SingleDatepicker
                          id="startDate"
                          name="startDate"
                          date={StartContractDate}
                          onDateChange={(e) => {
                            setStartContractDate(e);
                            HandlingStartContractDate(e);
                          }}
                        />
                        <FormErrorMessage>
                          {formik.errors.startDate}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={formik.errors.endDate ? true : false}
                        isRequired
                      >
                        <FormLabel>Tanggal Akhir Kontrak</FormLabel>
                        <SingleDatepicker
                          id="endDate"
                          name="endDate"
                          date={EndContractDate}
                          onDateChange={(e) => {
                            setEndContractDate(e);
                            HandlingEndContractDate(e);
                          }}
                        />
                        <FormErrorMessage>
                          {formik.errors.endDate}
                        </FormErrorMessage>
                      </FormControl>

                      <Divider py={2} />
                      <>
                        <Card>
                          <CardBody>
                            <VStack spacing={3}>
                              <FormControl
                                isInvalid={
                                  formik.errors.companyRegPemanfaat?.companyId
                                    ? true
                                    : false
                                }
                                isRequired
                              >
                                <VStack w={"full"} align={"start"}>
                                  <FormLabel>
                                    Persahaan Pemanfaat [1] : {SelectedComp1}
                                  </FormLabel>
                                  <CardCompany data={SelectedComp1Detail} />
                                  <Button
                                    onClick={firstModal.onOpen}
                                    colorScheme={"blue"}
                                    size={"sm"}
                                    w={"full"}
                                  >
                                    Pilih Persahaan Pemanfaat 1
                                  </Button>
                                  <FormErrorMessage>
                                    {
                                      formik.errors.companyRegPemanfaat
                                        ?.companyId
                                    }
                                  </FormErrorMessage>
                                </VStack>
                              </FormControl>
                              <FormControl
                                isInvalid={
                                  formik.errors.companyRegPemanfaat?.personnelId
                                    ? true
                                    : false
                                }
                                isRequired
                              >
                                <FormLabel>PIC Persahaan Pemanfaat</FormLabel>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={
                                    OptionComp1PIC.find(
                                      (option) =>
                                        option.value ===
                                        formik.values.companyRegPemanfaat
                                          .personnelId
                                    ) || null // Setting the select value to null if not found
                                  }
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "companyRegPemanfaat.personnelId",
                                      e ? e.value : null // Set to null when no option is selected
                                    );
                                  }}
                                  isSearchable={true}
                                  isClearable={true}
                                  id={"companyRegPemanfaatpersonnelId"}
                                  name={"companyRegPemanfaatpersonnelId"}
                                  options={OptionComp1PIC}
                                />
                                <FormErrorMessage>
                                  {
                                    formik.errors.companyRegPemanfaat
                                      ?.personnelId
                                  }
                                </FormErrorMessage>
                              </FormControl>
                            </VStack>
                          </CardBody>
                        </Card>
                      </>

                      <>
                        <Card>
                          <CardBody>
                            <VStack spacing={3}>
                              <FormControl
                                isInvalid={
                                  formik.errors.companyRegPenyalur?.companyId
                                    ? true
                                    : false
                                }
                                isRequired
                              >
                                <VStack w={"full"} align={"start"}>
                                  <FormLabel>
                                    Persahaan Penyalur [2] : {SelectedComp2}
                                  </FormLabel>
                                  <CardCompany data={SelectedComp2Detail} />
                                  <Button
                                    onClick={secondModal.onOpen}
                                    colorScheme={"blue"}
                                    size={"sm"}
                                    w={"full"}
                                  >
                                    Pilih Persahaan Penyalur 2
                                  </Button>
                                  <FormErrorMessage>
                                    {
                                      formik.errors.companyRegPenyalur
                                        ?.companyId
                                    }
                                  </FormErrorMessage>
                                </VStack>
                              </FormControl>
                              <FormControl
                                isInvalid={
                                  formik.errors.companyRegPenyalur?.personnelId
                                    ? true
                                    : false
                                }
                                isRequired
                              >
                                <FormLabel>PIC Persahaan Penyalur</FormLabel>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={
                                    OptionComp2PIC.find(
                                      (option) =>
                                        option.value ===
                                        formik.values.companyRegPenyalur
                                          .personnelId
                                    ) || null // Setting the select value to null if not found
                                  }
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "companyRegPenyalur.personnelId",
                                      e ? e.value : null // Set to null when no option is selected
                                    );
                                  }}
                                  isSearchable={true}
                                  isClearable={true}
                                  id={"companyRegPenyalurpersonnelId"}
                                  name={"companyRegPenyalurpersonnelId"}
                                  options={OptionComp2PIC}
                                />
                                <FormErrorMessage>
                                  {
                                    formik.errors.companyRegPenyalur
                                      ?.personnelId
                                  }
                                </FormErrorMessage>
                              </FormControl>
                            </VStack>
                          </CardBody>
                        </Card>
                      </>

                      <>
                        <Card>
                          <CardBody>
                            <VStack spacing={3}>
                              <FormControl
                                isInvalid={
                                  formik.errors.companyRegTransport?.companyId
                                    ? true
                                    : false
                                }
                                isRequired
                              >
                                <VStack w={"full"} align={"start"}>
                                  <FormLabel>
                                    Persahaan Transport [3] : {SelectedComp3}
                                  </FormLabel>
                                  <CardCompany data={SelectedComp3Detail} />
                                  <Button
                                    onClick={thirdModal.onOpen}
                                    colorScheme={"blue"}
                                    size={"sm"}
                                    w={"full"}
                                  >
                                    Pilih Persahaan Transport 3
                                  </Button>
                                  <FormErrorMessage>
                                    {
                                      formik.errors.companyRegTransport
                                        ?.companyId
                                    }
                                  </FormErrorMessage>
                                </VStack>
                              </FormControl>
                              <FormControl
                                isInvalid={
                                  formik.errors.companyRegTransport?.personnelId
                                    ? true
                                    : false
                                }
                                isRequired
                              >
                                <FormLabel>PIC Persahaan Transport</FormLabel>
                                <Select
                                  className="basic-single"
                                  classNamePrefix="select"
                                  value={
                                    OptionComp3PIC.find(
                                      (option) =>
                                        option.value ===
                                        formik.values.companyRegTransport
                                          .personnelId
                                    ) || null // Setting the select value to null if not found
                                  }
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "companyRegTransport.personnelId",
                                      e ? e.value : null // Set to null when no option is selected
                                    );
                                  }}
                                  isSearchable={true}
                                  isClearable={true}
                                  id={"companyRegTransportpersonnelId"}
                                  name={"companyRegTransportpersonnelId"}
                                  options={OptionComp3PIC}
                                />
                                <FormErrorMessage>
                                  {
                                    formik.errors.companyRegTransport
                                      ?.personnelId
                                  }
                                </FormErrorMessage>
                              </FormControl>
                            </VStack>
                          </CardBody>
                        </Card>
                      </>
                    </VStack>
                  </Flex>
                </CardBody>
              </Card>
              <Flex w={"full"} minH={"50vh"}>
                <VStack w={"full"} spacing={5} pt={5}>
                  {/* <Card w={"full"} p={4} overflowX={"auto"}>
                    <pre>{JSON.stringify(SelectedCompany, null, 2)}</pre>
                  </Card>
                  <Card w={"full"} p={4} overflowX={"auto"}>
                    <Heading size={"sm"}>COMP 1</Heading>
                    <pre>{JSON.stringify(SelectedComp1Detail, null, 2)}</pre>
                  </Card>
                  <Card w={"full"} p={4} overflowX={"auto"}>
                    <Heading size={"sm"}>COMP 2</Heading>
                    <pre>{JSON.stringify(SelectedComp2Detail, null, 2)}</pre>
                  </Card>
                  <Card w={"full"} p={4} overflowX={"auto"}>
                    <Heading size={"sm"}>COMP 3</Heading>
                    <pre>{JSON.stringify(SelectedComp3Detail, null, 2)}</pre>
                  </Card> */}
                  {/* <Card w={"full"} p={4} overflowX={"auto"}>
                    <pre>{JSON.stringify(formik.values, null, 2)}</pre>
                  </Card> */}
                </VStack>
              </Flex>
            </GridItem>
          </Grid>
          {/* Pass state management to the CustomModal component as props */}
          <CustomModal
            isOpen={firstModal.isOpen}
            onClose={firstModal.onClose}
            title="First Modal"
            body="This is the first modal."
            selectedData={SelectedCompany}
            onAction={handleParentAction1} // Pass function reference directly
          />

          <CustomModal
            isOpen={secondModal.isOpen}
            onClose={secondModal.onClose}
            title="Second Modal"
            body="This is the second modal."
            selectedData={SelectedCompany}
            onAction={handleParentAction2} // Pass function reference directly
          />

          <CustomModal
            isOpen={thirdModal.isOpen}
            onClose={thirdModal.onClose}
            title="Third Modal"
            body="This is the third modal."
            selectedData={SelectedCompany}
            onAction={handleParentAction3} // Pass function reference directly
          />
        </form>
      </Box>
    </>
  );
};

const CardCompany = ({ data }: { data: CompanyData | null }) => {
  const logoCompany: string =
    data != null
      ? data.companyLogoBase64 != null
        ? `data:image/png;base64,${data.companyLogoBase64}`
        : logoDefaultCompany
      : logoDefaultCompany;
  return (
    <Card borderRadius={"xl"} my={1}>
      <CardBody>
        <Grid templateColumns="repeat(7, 1fr)" gap={5} px={5}>
          <GridItem
            w={"full"}
            h={"full"}
            colSpan={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar
              size="lg"
              src={logoCompany}
              borderWidth={"1px"}
              borderColor={"gray.300"}
            />
          </GridItem>
          <GridItem
            w={"full"}
            h={"full"}
            colSpan={6}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <VStack alignItems={"start"} h={"full"} justifyContent={"center"}>
              <Text>{data != null ? data.name : "Persahaan"}</Text>
              <Text
                fontSize={"xs"}
                fontWeight={"700"}
                color={"gray.500"}
                textTransform={"uppercase"}
              >
                {data != null ? data.companyAsTypeName : "-"}
              </Text>
            </VStack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: string;
  selectedData: string[];
  onAction: (message: string) => void; // Modify to accept a string parameter
}

const initPagesQuery: PagesQueryParameter = {
  search: "",
  keyId: null,
  page: 0,
  limit: 5,
  filterWhere: [],
  fieldOrder: ["name"],
  orderDir: "asc",
};

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  selectedData,
  onAction,
}) => {
  const showToast = useToastHelper();
  const AuthData = useAuthenticationState((state: any) => state.AuthData);
  const [totalPages, setTotalPageData] = useState<number>(1);
  const [data, setData] = useState<CompanyData[] | []>([]);
  const [TriggerRefresh, setTriggerRefresh] = useState<number>(0);
  const [globalFilter, setGlobalFilter] = useState("");
  const [IsLoadingTable, setIsLoadingTable] = useState(false);

  const HandleRefreshData = () => {
    setData([]);
    setTotalPageData(1);
    setTriggerRefresh(TriggerRefresh + 1);
  };

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const RequestListData = (payload: PagesQueryParameter) => {
    var RequestAuthentication = PostCompaniesListServices(
      payload,
      AuthData.apiKey
    );
    RequestAuthentication.then(function (response: any) {
      if (response.status != HttpStatusCode.Ok) {
        setIsLoadingTable(false);
        showToast({
          description: `${response.data.message}`,
          statusToast: "warning",
        });
        return;
      }

      const responseDataList: CompanyData[] = response.data
        .data as CompanyData[];

      setData(responseDataList);
      setTotalPageData(
        response.data.countTotal > 0
          ? Math.ceil(response.data.countTotal / pageSize)
          : 1
      );
      setIsLoadingTable(false);
    }).catch(function (error) {
      showToast({
        description: `Error : ${error.message}`,
        statusToast: "error",
      });
      setIsLoadingTable(false);
    });
  };

  const columns = useMemo<ColumnDef<CompanyData>[]>(
    () => [
      {
        accessorFn: (row) => (
          <>
            <Grid templateColumns="repeat(7, 1fr)" gap={5}>
              <GridItem
                w={"full"}
                h={"full"}
                colSpan={1}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Avatar
                  size="lg"
                  src={
                    row.companyLogoBase64 != null
                      ? `data:image/png;base64,${row.companyLogoBase64}`
                      : logoDefaultCompany
                  }
                  borderWidth={"1px"}
                  borderColor={"gray.300"}
                />
              </GridItem>
              <GridItem
                w={"full"}
                h={"full"}
                colSpan={6}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <VStack
                  alignItems={"start"}
                  h={"full"}
                  justifyContent={"center"}
                >
                  <Text>{row.name}</Text>
                  <Text
                    fontSize={"xs"}
                    fontWeight={"700"}
                    color={"gray.500"}
                    textTransform={"uppercase"}
                  >
                    {row.companyAsTypeName}
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </>
        ),
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Nama Instansi</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "id",
        cell: (info) => (
          <>
            <Flex justifyContent="end">
              <Button
                // isDisabled={allowEditData}
                rightIcon={<ChevronRightIcon />}
                colorScheme="primary"
                variant="solid"
                size={"sm"}
                isDisabled={
                  selectedData.filter((x) => x === info.row.original.id)
                    .length > 0
                }
                onClick={() => {
                  console.log(selectedData);
                  onAction(info.row.original.id);
                  onClose();
                }}
              >
                Pilih
              </Button>
            </Flex>
          </>
        ),
        header: () => <Flex justifyContent="end">Opsi</Flex>,
        size: 10,
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    [selectedData, onAction, onClose, logoDefaultCompany] // Added dependencies
  );

  // Load Data
  useEffect(() => {
    const dataPayload: PagesQueryParameter = {
      search: globalFilter,
      keyId: null,
      limit: pageSize,
      page: pageIndex + 1,
      filterWhere: initPagesQuery.filterWhere,
      fieldOrder: initPagesQuery.fieldOrder,
      orderDir: initPagesQuery.orderDir,
    };
    setIsLoadingTable(true);
    RequestListData(dataPayload);
  }, [TriggerRefresh, globalFilter, pageSize, pageIndex]);

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages ?? 1,
    state: {
      globalFilter,
      pagination,
    },
    // Pipeline
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    //
    debugTable: false,
    manualFiltering: true,
    manualPagination: true,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <>
            <Grid templateColumns="repeat(12, 1fr)" gap="2">
              <GridItem colSpan={{ base: 12, md: 6 }}>
                <Flex justifyContent="flex-start" gap="2">
                  <Input
                    borderRadius={borderRadiusSchemes}
                    size="md"
                    type="text"
                    width={{ base: "full", md: "200px" }}
                    value={globalFilter ?? ""}
                    onChange={(e) => {
                      const val = e.target.value ? String(e.target.value) : "";
                      setGlobalFilter(val);
                    }}
                    placeholder="Cari Data..."
                  />
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 12, md: 6 }}>
                <TableInputShowPage table={table} />
              </GridItem>
              <GridItem colSpan={{ base: 12, md: 12 }}>
                <BasicTable table={table} isLoading={IsLoadingTable} />
                <ControlTable table={table} />
              </GridItem>
            </Grid>

            <pre>{JSON.stringify(selectedData, null, 2)}</pre>
          </>
        </ModalBody>
        <ModalFooter>
          {/* Generate a dynamic message based on modal title or other data */}
          <Button
            colorScheme="blue"
            onClick={() => {
              onAction(`Action initiated from ${title}`);
              onClose();
            }}
            mr={3}
          >
            Trigger Parent Action
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContractsForm;
