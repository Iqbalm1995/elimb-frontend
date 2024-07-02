import { useNavigate, useSearchParams } from "react-router-dom";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import useNavigationState from "../../data/GlobalStates/NavigationState";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { useEffect, useMemo, useState } from "react";
import {
  OptionGroupData,
  OptionGroupForm,
  OptionValueData,
  OptionValueForm,
} from "../../typesModel/OptionValuesTypes";
import {
  PagesQueryParameter,
  filterWhereParameter,
} from "../../typesModel/MasterParameterTypes";
import * as Yup from "yup";
import { delay } from "../../helper/MasterHelper";
import {
  GetOptionDataGroupByGroupId,
  PostOptionValuesListServices,
} from "../../services/OptionDataServices";
import { HttpStatusCode } from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
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
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddIcon,
  ArrowBackIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  RepeatClockIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { optionDataListMenu } from "../../data/NavigationUrlConstants";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
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
import {
  BasicTable,
  ControlTable,
  TableInputShowPage,
} from "../../components/TableComponents";
import { useFormik } from "formik";
import {
  RequestDeleteDataOptionValue,
  RequestInsertDataOptionValue,
  RequestUpdateDataOptionValue,
} from "../../data/OptionData/OptionDataHook";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

const initPagesQuery: PagesQueryParameter = {
  search: "",
  keyId: "",
  page: 1,
  limit: 5,
  filterWhere: [],
  fieldOrder: ["name"],
  orderDir: "asc",
};

const formInputOptionValueInitial: OptionValueForm = {
  id: null,
  optionGroupId: "",
  code: "",
  name: "",
};

const FormSchema = Yup.object().shape({
  code: Yup.string().required("Wajib di isi!"),
  name: Yup.string().required("Wajib di isi!"),
});

const OptionDataDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [DetailData, setDetailData] = useState<OptionGroupData | null>(null);

  const [totalPages, setTotalPageData] = useState<number>(1);
  const [TriggerRefresh, setTriggerRefresh] = useState<number>(0);
  const [data, setData] = useState<OptionValueData[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [IsLoadingData, setIsLoadingData] = useState(false);
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

  // formik config
  const formik = useFormik({
    initialValues: formInputOptionValueInitial,
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onReset: () => {
      formik.setValues(formInputOptionValueInitial);
    },
    onSubmit: (values) => {
      console.log("SUBMITED");
      console.log(values);

      HandleSubmit(values);
      onClose();
      formik.setValues(formInputOptionValueInitial);
    },
  });
  // end formik config

  const HandleEditData = (data: OptionValueForm) => {
    formik.setValues(data);
    onOpen();
    console.log(data);
  };

  // save data
  const HandleSubmit = async (data: OptionValueForm) => {
    const token = AuthData.apiKey;
    if (data.id == null) {
      // Add
      console.log(data);
      let SaveData = await RequestInsertDataOptionValue(data, token);
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
      HandleRefreshData();
    } else {
      // Edit
      console.log(data);
      let SaveData = await RequestUpdateDataOptionValue(data, token);
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
      HandleRefreshData();
    }
  };

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

  // load data
  const RequestDetailData = async (id: string) => {
    await delay(2000);
    var RequestAuthentication = GetOptionDataGroupByGroupId(
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

      const responseDataDetail: OptionGroupData = response.data
        .data as OptionGroupData;

      setDetailData(responseDataDetail);
      formik.setFieldValue("optionGroupId", responseDataDetail.id);

      setIsLoadingData(false);
    }).catch(function (error) {
      showToast({
        description: `Error : ${error.message}`,
        statusToast: "error",
      });
    });
  };
  // end load data

  const columns = useMemo<ColumnDef<OptionValueData>[]>(
    () => [
      {
        accessorFn: (row) => row.code,
        id: "code",
        cell: (info) => info.getValue(),
        header: () => <span>Kode Group</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Nama Group</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "id",
        cell: (info) => (
          <>
            <Flex justifyContent="end">
              <HStack>
                <Button
                  // isDisabled={allowEditData}
                  colorScheme="primary"
                  variant="solid"
                  size={"sm"}
                  onClick={() => {
                    // console.log(info.row.original);
                    HandleEditData({
                      id: info.row.original.id,
                      optionGroupId: info.row.original.optionGroupId,
                      code: info.row.original.code,
                      name: info.row.original.name,
                    });
                  }}
                >
                  <EditIcon />
                </Button>
                <Button
                  colorScheme="red"
                  variant="solid"
                  size={"sm"}
                  onClick={() => {
                    console.log(info.row.original.id);
                    handleVerifikasi(info.row.original.id);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </HStack>
            </Flex>
          </>
        ),
        header: () => <Flex justifyContent="end">Opsi</Flex>,
        size: 10,
        enableColumnFilter: false,
        enableSorting: false,
      },
    ],
    []
  );

  const RequestListValuesData = (payload: PagesQueryParameter) => {
    var RequestAuthentication = PostOptionValuesListServices(
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

      const responseDataList: OptionValueData[] = response.data
        .data as OptionValueData[];

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

  // recognition id
  useEffect(() => {
    const EditId = SearchParams.get("id");
    setIsLoadingData(true);
    let titlePage = "Detail";
    if (EditId) {
      RequestDetailData(EditId);
    } else {
      setIsLoadingData(false);
    }
    // set header title page
    setHeaderActive({
      tittle: `${titlePage} Option Values`,
      breadcrumbItems: [
        "Pages",
        "Setting",
        "Master Data Option",
        `${titlePage}`,
      ],
    });
  }, []);

  // Load Data
  useEffect(() => {
    const filterWhereData: filterWhereParameter[] = [
      {
        field: "optionGroupId",
        operator: "=",
        value: DetailData ? DetailData.id : "",
      },
    ];

    const dataPayload: PagesQueryParameter = {
      search: globalFilter,
      keyId: null,
      limit: pageSize,
      page: pageIndex + 1,
      filterWhere: filterWhereData,
      fieldOrder: initPagesQuery.fieldOrder,
      orderDir: initPagesQuery.orderDir,
    };
    setIsLoadingTable(true);
    RequestListValuesData(dataPayload);
  }, [TriggerRefresh, globalFilter, pageSize, pageIndex, DetailData]);

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages ?? -1,
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

  // Navigation
  const BackPageAction = () => {
    navigate(optionDataListMenu);
  };

  // Delete data
  const [IdDelete, setIdDelete] = useState<string>("");

  const handleVerifikasi = (id: string) => {
    setIdDelete(id);
    setQuestionMsgDialog("Anda yakin akan menghapus data ini?");
    setCaptionDialog("Hapus");
    handleSubmitConfirm();
  };

  const handleDelete = async () => {
    // RequestDeleteData(IdDelete);
    const token = AuthData.apiKey;
    let SaveData = await RequestDeleteDataOptionValue(IdDelete, token);
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
    setIdDelete("");
    HandleRefreshData();
  };

  return (
    <>
      <Box>
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
          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}></GridItem>
          <GridItem w={"full"} colSpan={{ base: 12, md: 12 }}>
            <Card borderRadius={borderRadiusSchemes} w={"full"}>
              <CardHeader>
                <Heading size={"md"}>Detail Option Group</Heading>
              </CardHeader>
              <CardBody>
                <VStack w={"full"}>
                  <div
                    style={{
                      overflowX: "auto",
                      width: "100%",
                      alignContent: "start",
                    }}
                  >
                    <Table variant="unstyled" size={"sm"} w={"full"}>
                      <Tbody>
                        <Tr>
                          <Td>
                            <Flex justifyContent={"end"}>
                              <Text>ID</Text>
                            </Flex>
                          </Td>
                          <Td>:</Td>
                          <Td>
                            <Flex justifyContent={"start"}>
                              <Text fontSize={"md"} fontWeight={"700"}>
                                {DetailData?.id}
                              </Text>
                            </Flex>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Flex justifyContent={"end"}>
                              <Text>Code</Text>
                            </Flex>
                          </Td>
                          <Td>:</Td>
                          <Td>
                            <Flex justifyContent={"start"}>
                              <Text fontSize={"md"} fontWeight={"700"}>
                                {DetailData?.code}
                              </Text>
                            </Flex>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Flex justifyContent={"end"}>
                              <Text>Name</Text>
                            </Flex>
                          </Td>
                          <Td>:</Td>
                          <Td>
                            <Flex justifyContent={"start"}>
                              <Text fontSize={"md"} fontWeight={"700"}>
                                {DetailData?.name}
                              </Text>
                            </Flex>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <Flex justifyContent={"end"}>
                              <Text>Created At</Text>
                            </Flex>
                          </Td>
                          <Td>:</Td>
                          <Td>
                            <Flex justifyContent={"start"}>
                              <Text fontSize={"md"} fontWeight={"700"}>
                                {DetailData?.createdAt}
                              </Text>
                            </Flex>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </div>
                  {/* <div style={{ overflowX: "auto" }}>
                    <pre>{JSON.stringify(DetailData, null, 2)}</pre>
                  </div> */}
                </VStack>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem w={"full"} colSpan={{ base: 12, md: 12 }}>
            <Card borderRadius={borderRadiusSchemes} w={"full"}>
              <CardHeader>
                <Heading size={"md"}>List Option Values</Heading>
              </CardHeader>
              <CardBody>
                <VStack w={"full"}>
                  <Box w={"full"}>
                    <Grid templateColumns="repeat(12, 1fr)" gap={6} pb={2}>
                      <GridItem
                        w={"full"}
                        colSpan={{ base: 12, md: 6 }}
                      ></GridItem>
                      <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
                        <Stack
                          direction={["column", "row"]}
                          w={"full"}
                          justifyContent={"end"}
                        >
                          <Button
                            // colorScheme="primary"
                            w={{ base: "full", md: "auto" }}
                            leftIcon={<AddIcon />}
                            size={{ base: "lg", md: "md" }}
                            boxShadow={"lg"}
                            //   onClick={CreatePageAction}
                            onClick={() => {
                              formik.setValues(formInputOptionValueInitial);

                              formik.setFieldValue(
                                "optionGroupId",
                                DetailData != null ? DetailData.id : ""
                              );
                              onOpen();
                            }}
                          >
                            Tambah Data
                          </Button>
                          <Button
                            // colorScheme="primary"
                            w={{ base: "full", md: "auto" }}
                            leftIcon={<RepeatIcon />}
                            size={{ base: "lg", md: "md" }}
                            boxShadow={"lg"}
                            onClick={HandleRefreshData}
                          >
                            Refresh
                          </Button>
                        </Stack>
                      </GridItem>
                    </Grid>
                    <Card borderRadius={borderRadiusSchemes}>
                      <CardBody>
                        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
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
                                    const val = e.target.value
                                      ? String(e.target.value)
                                      : "";
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
                              <BasicTable
                                table={table}
                                isLoading={IsLoadingTable}
                              />
                              <ControlTable table={table} />
                            </GridItem>
                          </Grid>
                        </>
                      </CardBody>
                    </Card>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={"inside"}
        size={"xl"}
      >
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Buat Value Data Baru</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <Input
                  id={"id"}
                  type={"text"}
                  onChange={formik.handleChange}
                  value={formik.values.id || ""}
                  display={"none"}
                  readOnly
                />
                <Input
                  id={"optionGroupId"}
                  type={"text"}
                  onChange={formik.handleChange}
                  value={formik.values.optionGroupId || ""}
                  display={"none"}
                  readOnly
                />
                <FormControl
                  isInvalid={formik.errors.code ? true : false}
                  isRequired
                >
                  <FormLabel>Code Value</FormLabel>
                  <Input
                    id={"code"}
                    type={"text"}
                    onChange={formik.handleChange}
                    value={formik.values.code}
                    placeholder="code-value"
                  />
                  <FormErrorMessage>{formik.errors.code}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.name ? true : false}
                  isRequired
                >
                  <FormLabel>Nama Value</FormLabel>
                  <Input
                    id={"name"}
                    type={"text"}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Nama Value"
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Stack direction={"row"}>
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
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      {/* Alert Dialog Action */}
      <ConfirmationDialog
        isOpenTrigger={openConfirmDialog}
        action={handleDelete}
        trigger={handleDialogTrigger}
        questionMsg={questionMsgDialog}
        captionMsg={captionDialog}
      />
    </>
  );
};

export default OptionDataDetail;
