import {
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
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import useNavigationState from "../../data/GlobalStates/NavigationState";
import { useEffect, useState } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { Link, useSearchParams } from "react-router-dom";
import { companiesPage } from "../../data/NavigationUrlConstants";
import { ArrowBackIcon } from "@chakra-ui/icons";
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
import { DatePicker as ChakraDatePicker } from "@orange_digital/chakra-datepicker";

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
  isActive: "",
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
  isActive: Yup.string().required("Wajib di isi!"),
  //   companyLogo: Yup.string().required("Wajib di isi!"),
});

const CompaniesForm: React.FC = () => {
  const [SearchParams] = useSearchParams();
  const showToast = useToastHelper();
  const AuthData = useAuthenticationState((state: any) => state.AuthData);
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

  // recognition id
  useEffect(() => {
    const EditId = SearchParams.get("id");
    setIsLoadingData(true);
    let isEditMode = false;
    let titlePage = "Tambah";
    if (EditId) {
      isEditMode = true;
      titlePage = "Ubah";
      setEditMode(true);
      RequestDetailData(EditId);
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
      // console.log(values);

      if (values.companyLogo == null || values.companyLogo == "") {
        showToast({
          description: `Logo masih kosong`,
          statusToast: "warning",
        });
        return;
      }

      //   setDetailbanner(values);
      //   handleVerifikasi();
    },
  });
  // end formik config

  // load data
  const RequestDetailData = (id: string) => {
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
      setData(responseDataDetail);
      setDetailData(responseDataForm);
      formik.setValues(responseDataForm);
      if (responseDataDetail.companyLogo != null) {
        const urlImage: string =
          "data:image/png;base64," + responseDataDetail.companyLogo;
        formik.setFieldValue("image", responseDataDetail.companyLogoBase64);
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
      //   formik.setFieldValue("image", imageWithoutPrefix);
    }
  }, [preview]);
  // end image configuration

  // select data
  const [OptionCompanyAsTypes, setOptionCompanyAsTypes] = useState<
    OptionData[]
  >([]);
  const [OptionCompanyTypes, setOptionCompanyTypes] = useState<OptionData[]>(
    []
  );

  useEffect(() => {
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

    fetchOptionData();
  }, []);

  // end select data

  // setup option list area
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
    console.log(id);
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

  return (
    <>
      <Box>
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Grid templateColumns="repeat(12, 1fr)" gap={6} pb={2}>
            <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
              <Flex justifyContent={"flex-start"}>
                <Link to={companiesPage}>
                  <Button
                    // colorScheme="primary"
                    w={{ base: "full", md: "auto" }}
                    leftIcon={<ArrowBackIcon />}
                    size={{ base: "lg", md: "md" }}
                  >
                    Kembali
                  </Button>
                </Link>
              </Flex>
            </GridItem>
            <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}></GridItem>
            <GridItem w={"full"} colSpan={{ base: 12, md: 4 }}>
              <Card borderRadius={borderRadiusSchemes}>
                <CardHeader>
                  <Heading size={"md"}>Logo Instansi/Group</Heading>
                </CardHeader>
                <CardBody>
                  <VStack w={"full"}>
                    {/* {preview && ( */}
                    <Image
                      src={preview ? preview : tempCompanyLogo}
                      alt="Image Preview"
                      width={"full"}
                      height={"400px"}
                      objectFit="cover"
                      borderRadius={borderRadiusSchemes}
                      borderWidth={1}
                      borderColor="gray.300"
                      borderStyle="solid"
                      boxShadow={"xl"}
                    />
                    {/* )} */}
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
                            defaultValue={OptionCompanyAsTypes[0]}
                            onChange={(e) => {
                              formik.setFieldValue("companyAsTypeId", e?.value);
                            }}
                            isSearchable={true}
                            name="companyAsTypeId"
                            options={OptionCompanyAsTypes}
                          />
                          <FormErrorMessage>
                            {formik.errors.companyAsTypeId}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={formik.errors.companyTypeId ? true : false}
                          isRequired
                        >
                          <FormLabel>Industri Badan Usaha</FormLabel>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={OptionCompanyTypes[0]}
                            onChange={(e) => {
                              formik.setFieldValue("companyTypeId", e?.value);
                            }}
                            isSearchable={true}
                            name="companyTypeId"
                            options={OptionCompanyTypes}
                          />
                          <FormErrorMessage>
                            {formik.errors.companyTypeId}
                          </FormErrorMessage>
                        </FormControl>
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
                        <FormControl
                          isInvalid={formik.errors.city ? true : false}
                          isRequired
                        >
                          <FormLabel>Kota/Kabupaten</FormLabel>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            defaultValue={OptionAreaProvices.filter((x) =>
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
                          <FormLabel>Waktu Berdiri</FormLabel>
                          <ChakraDatePicker
                            initialValue={new Date()}
                            onDateChange={(d) =>
                              console.log("ChakraDatePicker::d", d)
                            }
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
          </Grid>
        </form>
      </Box>
      <Card borderRadius={borderRadiusSchemes}>
        <CardBody>
          <div style={{ overflowX: "auto" }}>
            <pre>{JSON.stringify(formik, null, 2)}</pre>
          </div>
        </CardBody>
      </Card>
      <Box h={"800px"}></Box>
    </>
  );
};

export default CompaniesForm;
