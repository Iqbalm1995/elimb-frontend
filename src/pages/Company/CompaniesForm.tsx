import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  borderRadiusSchemes,
  specialColor,
  specialColorDark,
} from "../../components/themes/colorScheme";
import useNavigationState from "../../data/GlobalStates/NavigationState";
import { useEffect, useState } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { companiesPage } from "../../data/NavigationUrlConstants";
import {
  ArrowBackIcon,
  CheckIcon,
  RepeatClockIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import { PostCompaniesDetailByIdServices } from "../../services/CompaniesServices";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import { HttpStatusCode } from "axios";
import { CompanyData, CompanyDataForm } from "../../typesModel/CompaniesTypes";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import tempCompanyLogo from "../../assets/Company.png";
import {
  KeyOptionDataCompanyAsType,
  KeyOptionDataCompanyType,
} from "../../data/ApplicationConstants";
import { RequestOptionDataGroupByGroupCode } from "../../data/OptionData/OptionDataValues";
import { OptionData } from "../../typesModel/OptionValuesTypes";
import SpinnerComponent from "../../components/loading-component/SpinnerComponent";
import listAreaProvinces from "../../data/ListOfArea/provinces.json";
import listAreaRegencies from "../../data/ListOfArea/regencies.json";
import listAreaDistricts from "../../data/ListOfArea/districts.json";
import listAreaVillages from "../../data/ListOfArea/villages.json";
import { ListAreaProvincestypes } from "../../typesModel/ListOfAreaTypes";
import { SingleDatepicker } from "../../components/DayzedDatepicker";
import {
  convertStringToDate,
  delay,
  formatDateToYYYYMMDD,
} from "../../helper/MasterHelper";
import {
  RequestInsertDataCompany,
  RequestUpdateDataCompany,
} from "../../data/CompaniesData/CompaniesHook";
import { GrDocumentText } from "react-icons/gr";
import { GiChemicalDrop } from "react-icons/gi";
import { LabelFeatured1 } from "../../components/_MasterComponents";

const formInputInitial: CompanyDataForm = {
  id: null,
  companyAsTypeId: "",
  companyTypeId: "",
  companyId: "",
  name: "",
  bio: "",
  streetaddress1: "",
  streetaddress2: "",
  city: "",
  province: "",
  postalCode: "",
  country: "INDONESIA",
  phoneNumber: "",
  email: "",
  estabilishedDate: "",
  website: "",
  isActive: "1",
  companyLogo: "",
};

const FormSchema = Yup.object().shape({
  companyAsTypeId: Yup.string().required("Wajib di isi!"),
  companyTypeId: Yup.string().required("Wajib di isi!"),
  companyId: Yup.string().required("Wajib di isi!"),
  name: Yup.string().required("Wajib di isi!"),
  //   bio: Yup.string().required("Wajib di isi!"),
  streetaddress1: Yup.string().required("Wajib di isi!"),
  //   streetaddress2: Yup.string().required("Wajib di isi!"),
  city: Yup.string().required("Wajib di isi!"),
  province: Yup.string().required("Wajib di isi!"),
  postalCode: Yup.string().required("Wajib di isi!"),
  country: Yup.string().required("Wajib di isi!"),
  phoneNumber: Yup.string().required("Wajib di isi!"),
  email: Yup.string().required("Wajib di isi!"),
  estabilishedDate: Yup.string().required("Wajib di isi!"),
  //   website: Yup.string().required("Wajib di isi!"),
  // isActive: Yup.string().required("Wajib di isi!"),
  //   companyLogo: Yup.string().required("Wajib di isi!"),
});

const CompaniesForm: React.FC = () => {
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
  const [Data, setData] = useState<CompanyData | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [DetailData, setDetailData] =
    useState<CompanyDataForm>(formInputInitial);
  const [IsLoadingData, setIsLoadingData] = useState(false);

  // Dialog Action
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleDialogTrigger = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const handleSubmitConfirm = () => {
    setOpenConfirmDialog(true);
  };

  const [captionDialog, setCaptionDialog] = useState<string>("");
  const [questionMsgDialog, setQuestionMsgDialog] = useState<string>("");

  // select data
  // flag resouce load
  const [OptionCompanyAsTypes, setOptionCompanyAsTypes] = useState<
    OptionData[]
  >([]);
  const [OptionCompanyTypes, setOptionCompanyTypes] = useState<OptionData[]>(
    []
  );

  const fetchOptionData = async () => {
    const token = AuthData.apiKey;

    const OptionDataCompanyAs = await RequestOptionDataGroupByGroupCode(
      KeyOptionDataCompanyAsType,
      token
    );
    setOptionCompanyAsTypes(OptionDataCompanyAs);

    const OptionDataCompanyType = await RequestOptionDataGroupByGroupCode(
      KeyOptionDataCompanyType,
      token
    );
    setOptionCompanyTypes(OptionDataCompanyType);
  };

  const [OptionAreaProvices, setOptionAreaProvices] = useState<OptionData[]>(
    listAreaProvinces.map((x) => ({
      label: x.name,
      value: x.id,
    }))
  );
  const [OptionAreaRegencies, setOptionAreaRegencies] = useState<OptionData[]>(
    []
  );
  const [OptionAreaDistricts, setOptionAreaDistricts] = useState<OptionData[]>(
    []
  );
  const [OptionAreaVillages, setOptionAreaVillages] = useState<OptionData[]>(
    []
  );

  const SetOptionListAreaRegencies = (id: string | null) => {
    setOptionAreaRegencies([]);
    if (id) {
      setOptionAreaRegencies(
        listAreaRegencies
          .filter((x) => x.province_id.includes(id))
          .map((x) => ({
            label: x.name,
            value: x.id,
          }))
      );
    }
  };
  // end setup option list area

  // recognition id
  useEffect(() => {
    fetchOptionData();
    const EditId = SearchParams.get("id");
    setIsLoadingData(true);
    let titlePage = "Tambah";
    if (EditId) {
      titlePage = "Ubah";
      setEditMode(true);
      RequestDetailData(EditId);
    } else {
      setIsLoadingData(false);
    }
    // set header title page
    setHeaderActive({
      tittle: `${titlePage} Instansi`,
      breadcrumbItems: ["Pages", "Instansi", `${titlePage}`],
    });
  }, []);

  // end recognition id

  // formik config
  const formik = useFormik({
    initialValues: DetailData,
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onReset: () => {
      formik.setValues(DetailData);
    },
    onSubmit: (values) => {
      console.log("SUBMITED");
      console.log(values);

      if (values.companyLogo == null || values.companyLogo == "") {
        showToast({
          description: `Logo masih kosong`,
          statusToast: "warning",
        });
        return;
      }

      HandleSubmit(values);
    },
  });
  // end formik config

  // save data
  const HandleSubmit = async (data: CompanyDataForm) => {
    const token = AuthData.apiKey;
    if (data.id == null) {
      // Add
      console.log(data);
      let SaveData = await RequestInsertDataCompany(data, token);
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
    } else {
      // Edit
      console.log(data);
      let SaveData = await RequestUpdateDataCompany(data, token);
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
    }
  };

  // load data
  const RequestDetailData = async (id: string) => {
    await delay(2000);
    var RequestAuthentication = PostCompaniesDetailByIdServices(
      id,
      AuthData.apiKey
    );
    RequestAuthentication.then(function (response: any) {
      if (response.status != HttpStatusCode.Ok) {
        showToast({
          description: `${response.data.message}`,
          statusToast: "warning",
        });
        return;
      }

      const responseDataDetail: CompanyData = response.data.data as CompanyData;
      const responseDataForm: CompanyDataForm = response.data
        .data as CompanyDataForm;

      const getProvinceDataId = OptionAreaProvices.filter(
        (x) => x.label == responseDataDetail.province
      );
      if (getProvinceDataId[0]) {
        SetOptionListAreaRegencies(getProvinceDataId[0].value);
      }

      setData(responseDataDetail);
      setDetailData(responseDataForm);
      formik.setValues(responseDataForm);
      if (responseDataDetail.companyLogo != null) {
        const urlImage: string =
          "data:image/png;base64," + responseDataDetail.companyLogoBase64;
        formik.setFieldValue(
          "companyLogo",
          responseDataDetail.companyLogoBase64
        );
        setPreview(urlImage);
      }
      setIsLoadingData(false);
    }).catch(function (error) {
      showToast({
        description: `Error : ${error.message}`,
        statusToast: "error",
      });
    });
  };
  // end load data

  // image configuration
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (jpeg, png, etc.).");
        setSelectedImage(null);
        setPreview(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5 MB
        setError("Image size should not exceed 5 MB.");
        setSelectedImage(null);
        setPreview(null);
        return;
      }

      setSelectedImage(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (preview !== null) {
      //   formik.setFieldValue("image", preview);
      const imageWithoutPrefix = preview.split(",")[1]; // Split at comma and take the second part
      formik.setFieldValue("companyLogo", imageWithoutPrefix);
    }
  }, [preview]);
  // end image configuration

  const handlePostalCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      // Only allow numbers
      formik.setFieldValue("postalCode", value);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      // Only allow numbers
      formik.setFieldValue("phoneNumber", value);
    }
  };

  const [EstabilishDate, setEstabilishDate] = useState(new Date());
  const HandlingEstabilishDate = (date: Date) => {
    // console.log(date);
    formik.setFieldValue("estabilishedDate", formatDateToYYYYMMDD(date));
  };

  // Navigation
  const BackPageAction = () => {
    navigate(companiesPage);
  };

  const itemsDummy = Array.from({ length: 0 }, (_, index) => index);

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
            <GridItem w={"full"} colSpan={{ base: 12, md: 4 }}>
              <VStack w={"full"}>
                <Card borderRadius={borderRadiusSchemes} w={"full"}>
                  <CardHeader>
                    <Heading size={"md"}>Logo Instansi/Group</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack w={"full"}>
                      {preview ? (
                        <Image
                          src={preview}
                          alt="Image Preview"
                          width={"full"}
                          height={"400px"}
                          objectFit="cover"
                          borderRadius={borderRadiusSchemes}
                          borderWidth={1}
                          borderColor="gray.300"
                          borderStyle="solid"
                          boxShadow={"md"}
                        />
                      ) : (
                        <Flex
                          width={"full"}
                          height={"400px"}
                          borderRadius={borderRadiusSchemes}
                          borderWidth={1}
                          borderColor="gray.300"
                          bgColor={"gray.100"}
                          borderStyle="solid"
                          boxShadow={"md"}
                          justifyContent={"center"}
                        >
                          <Center>Logo belum ada</Center>
                        </Flex>
                      )}
                      <FormControl
                        id="image-upload"
                        isInvalid={formik.errors.companyLogo ? true : false}
                      >
                        <FormLabel>Upload Image </FormLabel>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          // value={formik.values.image}
                        />
                        <FormHelperText>
                          Select an image file to preview and upload. The file
                          should be less than 5 MB.
                        </FormHelperText>
                        {error && <Text color="red.500">{error}</Text>}
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>
                <Card borderRadius={borderRadiusSchemes} w={"full"} h={"452px"}>
                  <CardHeader>
                    <Heading size={"md"}>Dokumen Legalisasi Instansi</Heading>
                  </CardHeader>
                  <CardBody>
                    {itemsDummy.length > 0 ? (
                      <VStack
                        style={{ maxHeight: "340px", overflowY: "auto" }}
                        spacing={3}
                        w={"full"}
                      >
                        {itemsDummy.map((index) => (
                          <CardDocumentsCompanies key={index} />
                        ))}
                      </VStack>
                    ) : (
                      <Flex
                        h={"340px"}
                        w={"full"}
                        borderRadius={borderRadiusSchemes}
                        borderWidth={1}
                        borderColor="gray.300"
                        bgColor={"gray.100"}
                        borderStyle="solid"
                        boxShadow={"md"}
                        justifyContent={"center"}
                      >
                        <Center>Belum ada dokumen yang diupload</Center>
                      </Flex>
                    )}
                  </CardBody>
                </Card>
              </VStack>
            </GridItem>
            <GridItem w={"full"} colSpan={{ base: 12, md: 8 }}>
              <Card borderRadius={borderRadiusSchemes}>
                <CardHeader>
                  <Heading size={"md"}>Informasi Detail</Heading>
                </CardHeader>
                <CardBody>
                  {IsLoadingData ? (
                    <Box py={"100px"}>
                      <SpinnerComponent />
                    </Box>
                  ) : (
                    <>
                      <VStack>
                        <Input
                          id={"isActive"}
                          type={"text"}
                          // onChange={formik.handleChange}
                          value={formik.values.isActive}
                          disabled={true}
                          display={"none"}
                        />
                        <Grid
                          templateColumns="repeat(12, 1fr)"
                          gap={2}
                          w={"full"}
                        >
                          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                            <FormControl
                              isInvalid={
                                formik.errors.companyAsTypeId ? true : false
                              }
                              isRequired
                            >
                              <FormLabel>Industri Tipe</FormLabel>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={OptionCompanyAsTypes.filter(
                                  (x) =>
                                    x.value == formik.values.companyAsTypeId
                                )}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "companyAsTypeId",
                                    e?.value
                                  );
                                }}
                                isSearchable={true}
                                name="companyAsTypeId"
                                id="companyAsTypeId"
                                options={OptionCompanyAsTypes}
                              />
                              <FormErrorMessage>
                                {formik.errors.companyAsTypeId}
                              </FormErrorMessage>
                            </FormControl>
                          </GridItem>
                          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                            <FormControl
                              isInvalid={
                                formik.errors.companyTypeId ? true : false
                              }
                              isRequired
                            >
                              <FormLabel>Industri Badan Usaha</FormLabel>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={OptionCompanyTypes.filter(
                                  (x) => x.value == formik.values.companyTypeId
                                )}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "companyTypeId",
                                    e?.value
                                  );
                                }}
                                isSearchable={true}
                                name="companyTypeId"
                                id="companyTypeId"
                                options={OptionCompanyTypes}
                              />
                              <FormErrorMessage>
                                {formik.errors.companyTypeId}
                              </FormErrorMessage>
                            </FormControl>
                          </GridItem>
                        </Grid>

                        <FormControl
                          isInvalid={formik.errors.companyId ? true : false}
                          isRequired
                        >
                          <FormLabel>Company ID</FormLabel>
                          <Input
                            id={"companyId"}
                            type={"text"}
                            onChange={formik.handleChange}
                            value={formik.values.companyId}
                            placeholder="Company ID"
                            disabled={EditMode}
                          />
                          <FormErrorMessage>
                            {formik.errors.companyId}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={formik.errors.name ? true : false}
                          isRequired
                        >
                          <FormLabel>Nama Industri</FormLabel>
                          <Input
                            id={"name"}
                            type={"text"}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="Company ID"
                          />
                          <FormErrorMessage>
                            {formik.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={formik.errors.bio ? true : false}
                        >
                          <FormLabel>Deskripsi / Biografi</FormLabel>
                          <Textarea
                            id={"bio"}
                            onChange={formik.handleChange}
                            value={formik.values.bio}
                            placeholder="Deskripsi / Biografi"
                          />
                          <FormErrorMessage>
                            {formik.errors.bio}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={
                            formik.errors.streetaddress1 ? true : false
                          }
                          isRequired
                        >
                          <FormLabel>Alamat</FormLabel>
                          <Input
                            id={"streetaddress1"}
                            type={"text"}
                            onChange={formik.handleChange}
                            value={formik.values.streetaddress1}
                            placeholder="Isi Alamat"
                          />
                          <FormErrorMessage>
                            {formik.errors.streetaddress1}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={
                            formik.errors.streetaddress2 ? true : false
                          }
                        >
                          <FormLabel>Alamat Deskripsi (Opsional)</FormLabel>
                          <Input
                            id={"streetaddress2"}
                            type={"text"}
                            onChange={formik.handleChange}
                            value={formik.values.streetaddress2}
                            placeholder="Isi Alamat (Opsional)"
                          />
                          <FormErrorMessage>
                            {formik.errors.streetaddress2}
                          </FormErrorMessage>
                        </FormControl>
                        <Grid
                          templateColumns="repeat(12, 1fr)"
                          gap={2}
                          w={"full"}
                        >
                          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                            <FormControl
                              isInvalid={formik.errors.country ? true : false}
                              isRequired
                            >
                              <FormLabel>Negara</FormLabel>
                              <Input
                                id={"country"}
                                type={"text"}
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                isDisabled={true}
                                placeholder="Negara"
                              />
                              <FormErrorMessage>
                                {formik.errors.country}
                              </FormErrorMessage>
                            </FormControl>
                          </GridItem>
                          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                            <FormControl
                              isInvalid={formik.errors.province ? true : false}
                              isRequired
                            >
                              <FormLabel>Provinsi</FormLabel>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={OptionAreaProvices.filter((x) =>
                                  x.label.includes(formik.values.province)
                                )}
                                onChange={(e) => {
                                  formik.setFieldValue("province", e?.label);
                                  SetOptionListAreaRegencies(e?.value);
                                }}
                                isSearchable={true}
                                name="province"
                                options={OptionAreaProvices}
                              />
                              <FormErrorMessage>
                                {formik.errors.province}
                              </FormErrorMessage>
                            </FormControl>
                          </GridItem>
                        </Grid>
                        <Grid
                          templateColumns="repeat(12, 1fr)"
                          gap={2}
                          w={"full"}
                        >
                          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                            <FormControl
                              isInvalid={formik.errors.city ? true : false}
                              isRequired
                            >
                              <FormLabel>Kota/Kabupaten</FormLabel>
                              <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={OptionAreaRegencies.filter((x) =>
                                  x.label.includes(formik.values.city)
                                )}
                                onChange={(e) => {
                                  formik.setFieldValue("city", e?.label);
                                }}
                                isSearchable={true}
                                name="city"
                                options={OptionAreaRegencies}
                              />
                              <FormErrorMessage>
                                {formik.errors.city}
                              </FormErrorMessage>
                            </FormControl>
                          </GridItem>
                          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                            <FormControl
                              isInvalid={
                                formik.errors.postalCode ? true : false
                              }
                              isRequired
                            >
                              <FormLabel>Kode POS</FormLabel>
                              <Input
                                id={"postalCode"}
                                type={"text"}
                                onChange={handlePostalCodeChange}
                                value={formik.values.postalCode}
                                placeholder="Isi Kode POS"
                              />
                              <FormErrorMessage>
                                {formik.errors.postalCode}
                              </FormErrorMessage>
                            </FormControl>
                          </GridItem>
                        </Grid>

                        <FormControl
                          isInvalid={formik.errors.phoneNumber ? true : false}
                          isRequired
                        >
                          <FormLabel>Nomor Telephone</FormLabel>
                          <Input
                            id={"phoneNumber"}
                            type={"text"}
                            onChange={handlePhoneNumberChange}
                            value={formik.values.phoneNumber}
                            placeholder="08xxxxx"
                          />
                          <FormErrorMessage>
                            {formik.errors.phoneNumber}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={formik.errors.email ? true : false}
                          isRequired
                        >
                          <FormLabel>E-Mail</FormLabel>
                          <Input
                            id={"email"}
                            type={"email"}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="xxxx@mail.com"
                          />
                          <FormErrorMessage>
                            {formik.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={formik.errors.website ? true : false}
                        >
                          <FormLabel>Website</FormLabel>
                          <Input
                            id={"website"}
                            type={"text"}
                            onChange={formik.handleChange}
                            value={formik.values.website}
                            placeholder="https://..."
                          />
                          <FormErrorMessage>
                            {formik.errors.website}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={
                            formik.errors.estabilishedDate ? true : false
                          }
                          isRequired
                        >
                          <FormLabel>Tabggal Ditetapkan</FormLabel>
                          <SingleDatepicker
                            name="estabilishedDate"
                            date={EstabilishDate}
                            onDateChange={(e) => {
                              setEstabilishDate(e);
                              HandlingEstabilishDate(e);
                            }}
                          />
                          <FormErrorMessage>
                            {formik.errors.estabilishedDate}
                          </FormErrorMessage>
                        </FormControl>
                      </VStack>
                    </>
                  )}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem w={"full"} colSpan={{ base: 12, md: 12 }}>
              <Card borderRadius={borderRadiusSchemes}>
                <CardHeader>
                  <Grid templateColumns="repeat(12, 1fr)" gap={6} pb={2}>
                    <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                      <Center h={"full"} justifyContent={"start"}>
                        <Heading size={"md"}>Informasi Detail</Heading>
                      </Center>
                    </GridItem>
                    <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                      <Stack
                        direction={["column", "row"]}
                        w={"full"}
                        justifyContent={"end"}
                      >
                        <Button
                          // colorScheme="primary"
                          w={{ base: "full", md: "auto" }}
                          // leftIcon={<RepeatIcon />}
                          size={"md"}
                          boxShadow={"lg"}
                        >
                          <RepeatIcon />
                        </Button>
                      </Stack>
                    </GridItem>
                  </Grid>
                </CardHeader>
                <CardBody>
                  <Tabs variant="enclosed">
                    <TabList
                      gap={2}
                      pb={2}
                      style={{ maxHeight: "340px", overflowY: "auto" }}
                    >
                      <Tab
                        _selected={{ color: "white", bg: specialColor }}
                        borderRadius={borderRadiusSchemes}
                      >
                        <HStack>
                          <Text>Limbah</Text>
                          <Badge
                            variant="solid"
                            colorScheme="red"
                            borderRadius={borderRadiusSchemes}
                            px={2}
                          >
                            12
                          </Badge>
                        </HStack>
                      </Tab>
                      <Tab
                        _selected={{ color: "white", bg: specialColor }}
                        borderRadius={borderRadiusSchemes}
                      >
                        <HStack>
                          <Text>Cabang</Text>
                          <Badge
                            variant="solid"
                            colorScheme="red"
                            borderRadius={borderRadiusSchemes}
                            px={2}
                          >
                            4
                          </Badge>
                        </HStack>
                      </Tab>
                      <Tab
                        _selected={{ color: "white", bg: specialColor }}
                        borderRadius={borderRadiusSchemes}
                      >
                        <HStack>
                          <Text>Kendaraan</Text>
                          <Badge
                            variant="solid"
                            colorScheme="red"
                            borderRadius={borderRadiusSchemes}
                            px={2}
                          >
                            5
                          </Badge>
                        </HStack>
                      </Tab>
                      <Tab
                        _selected={{ color: "white", bg: specialColor }}
                        borderRadius={borderRadiusSchemes}
                      >
                        <HStack>
                          <Text>Personel</Text>
                          <Badge
                            variant="solid"
                            colorScheme="red"
                            borderRadius={borderRadiusSchemes}
                            px={2}
                          >
                            35
                          </Badge>
                        </HStack>
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <DataWasteList />
                      </TabPanel>
                      <TabPanel>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Quisquam consectetur, laudantium aut, vel
                          nostrum reiciendis neque quidem aspernatur fugiat
                          doloribus laboriosam labore officiis! Cum quis enim
                          aspernatur nam in perspiciatis!
                        </p>
                      </TabPanel>
                      <TabPanel>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Quisquam consectetur, laudantium aut, vel
                          nostrum reiciendis neque quidem aspernatur fugiat
                          doloribus laboriosam labore officiis! Cum quis enim
                          aspernatur nam in perspiciatis!
                        </p>
                      </TabPanel>
                      <TabPanel>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Quisquam consectetur, laudantium aut, vel
                          nostrum reiciendis neque quidem aspernatur fugiat
                          doloribus laboriosam labore officiis! Cum quis enim
                          aspernatur nam in perspiciatis!
                        </p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </form>
      </Box>
      {/* <Card borderRadius={borderRadiusSchemes}>
        <CardBody>
          <div style={{ overflowX: "auto" }}>
            <pre>{JSON.stringify(formik.values, null, 2)}</pre>
          </div>
        </CardBody>
      </Card> */}
    </>
  );
};

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

const DataWasteList = () => {
  return (
    <>
      <Flex w={"full"}>
        <Box w={"full"}>
          <HStack spacing={2} style={{ overflowY: "auto" }} p={5}>
            {ListDataWastes.map((data, index) => (
              <Box w={"200px"} h={"250px"}>
                <WastesCard dataWaste={data} key={index} />
              </Box>
            ))}
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

const WastesCard = ({ dataWaste }: { dataWaste: DataWastes }) => {
  return (
    <Card borderRadius={borderRadiusSchemes} boxShadow={"md"}>
      <CardBody p={3}>
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
            ></Flex>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

const CardDocumentsCompanies = () => {
  return (
    <>
      <Card
        borderRadius={borderRadiusSchemes}
        borderWidth={"1px"}
        borderColor={"gray.200"}
        boxShadow={"md"}
        w={"full"}
      >
        <CardBody p={3}>
          <HStack w={"full"} spacing={4}>
            <Flex
              borderRadius={borderRadiusSchemes}
              bgColor={specialColor}
              p={4}
            >
              <GrDocumentText color={"white"} size={"2em"} />
            </Flex>
            <VStack
              w={"full"}
              justifyContent={"center"}
              alignItems={"start"}
              spacing={1}
            >
              <Text fontWeight={600}>Dokumen Instansi</Text>
              <Text fontSize={14} as={"i"}>
                Download
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default CompaniesForm;
