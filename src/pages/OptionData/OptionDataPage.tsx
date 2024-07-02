import { Link, useNavigate } from "react-router-dom";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import { PagesQueryParameter } from "../../typesModel/MasterParameterTypes";
import { useEffect, useMemo, useState } from "react";
import {
  OptionGroupData,
  OptionGroupForm,
} from "../../typesModel/OptionValuesTypes";
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
import { PostOptionDataListServices } from "../../services/OptionDataServices";
import { HttpStatusCode } from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { optionDataDetailMenu } from "../../data/NavigationUrlConstants";
import {
  AddIcon,
  CheckIcon,
  EditIcon,
  RepeatClockIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import {
  BasicTable,
  ControlTable,
  TableInputShowPage,
} from "../../components/TableComponents";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  RequestInsertDataOptionGroup,
  RequestUpdateDataOptionGroup,
} from "../../data/OptionData/OptionDataHook";

const initPagesQuery: PagesQueryParameter = {
  search: "",
  keyId: null,
  page: 0,
  limit: 5,
  filterWhere: [],
  fieldOrder: ["name"],
  orderDir: "asc",
};

const formInputInitial: OptionGroupForm = {
  id: null,
  code: "",
  name: "",
};

const FormSchema = Yup.object().shape({
  code: Yup.string().required("Wajib di isi!"),
  name: Yup.string().required("Wajib di isi!"),
});

const OptionDataPage = () => {
  const showToast = useToastHelper();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );
  const AuthData = useAuthenticationState((state: any) => state.AuthData);
  const navigate = useNavigate();

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Master Data Option",
      breadcrumbItems: ["Pages", "Setting", "Master Data Option"],
    });
  }, []);

  const [totalPages, setTotalPageData] = useState<number>(1);
  const [data, setData] = useState<OptionGroupData[] | []>([]);
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

  const columns = useMemo<ColumnDef<OptionGroupData>[]>(
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
              <Link to={`${optionDataDetailMenu}?id=${info.row.original.id}`}>
                <Button
                  // isDisabled={allowEditData}
                  leftIcon={<EditIcon />}
                  colorScheme="primary"
                  variant="solid"
                  size={"sm"}
                  // onClick={() => {
                  //   console.log(info.row.original);
                  // }}
                >
                  Detail
                </Button>
              </Link>
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

  const RequestListData = (payload: PagesQueryParameter) => {
    var RequestAuthentication = PostOptionDataListServices(
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

      const responseDataList: OptionGroupData[] = response.data
        .data as OptionGroupData[];

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

  // FORM CODE
  // const [DataForm, setDataForm] = useState<OptionGroupForm>(formInputInitial);
  // formik config
  const formik = useFormik({
    initialValues: formInputInitial,
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onReset: () => {
      formik.setValues(formInputInitial);
    },
    onSubmit: (values) => {
      console.log("SUBMITED");
      console.log(values);

      HandleSubmit(values);
      HandleRefreshData();
      onClose();
      formik.handleReset();
    },
  });
  // end formik config

  // save data
  const HandleSubmit = async (data: OptionGroupForm) => {
    const token = AuthData.apiKey;
    if (data.id == null) {
      // Add
      console.log(data);
      let SaveData = await RequestInsertDataOptionGroup(data, token);
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
      let SaveData = await RequestUpdateDataOptionGroup(data, token);
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

  return (
    <>
      <Box>
        <Grid templateColumns="repeat(12, 1fr)" gap={6} pb={2}>
          <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}></GridItem>
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
                // onClick={CreatePageAction}
                onClick={onOpen}
              >
                Buat Data Baru
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
                  <BasicTable table={table} isLoading={IsLoadingTable} />
                  <ControlTable table={table} />
                </GridItem>
              </Grid>
            </>
          </CardBody>
        </Card>
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
            <ModalHeader>Buat Option Data Baru</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl
                  isInvalid={formik.errors.code ? true : false}
                  isRequired
                >
                  <FormLabel>Code Group</FormLabel>
                  <Input
                    id={"code"}
                    type={"text"}
                    onChange={formik.handleChange}
                    value={formik.values.code}
                    placeholder="code-group"
                  />
                  <FormErrorMessage>{formik.errors.code}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.name ? true : false}
                  isRequired
                >
                  <FormLabel>Nama Group</FormLabel>
                  <Input
                    id={"name"}
                    type={"text"}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Nama Group"
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
    </>
  );
};

export default OptionDataPage;
