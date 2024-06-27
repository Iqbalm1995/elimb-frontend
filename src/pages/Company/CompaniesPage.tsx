import { useEffect, useMemo, useState } from "react";
import {
  HeaderState,
  useHeaderState,
} from "../../data/GlobalStates/HeaderaState";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useStatStyles,
} from "@chakra-ui/react";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import { PagesQueryParameter } from "../../typesModel/MasterParameterTypes";
import { PostCompaniesListServices } from "../../services/CompaniesServices";
import { HttpStatusCode } from "axios";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import { CompanyData } from "../../typesModel/CompaniesTypes";
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";
import { AddIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  BasicTable,
  ControlTable,
  TableInputShowPage,
} from "../../components/TableComponents";
import { Link, useNavigate } from "react-router-dom";
import {
  companiesFormCreatePage,
  companiesFormEditPage,
} from "../../data/NavigationUrlConstants";
import logoDefaultCompany from "../../assets/default-company-logo.png";

const initPagesQuery: PagesQueryParameter = {
  search: "",
  keyId: null,
  page: 0,
  limit: 10,
  filterWhere: [],
  fieldOrder: ["name"],
  orderDir: "asc",
};

const CompaniesPage = () => {
  const showToast = useToastHelper();
  const setHeaderActive = useHeaderState(
    (state: HeaderState) => state.setHeaderActive
  );
  const AuthData = useAuthenticationState((state: any) => state.AuthData);
  const navigate = useNavigate();

  useEffect(() => {
    // set header title page
    setHeaderActive({
      tittle: "Instansi",
      breadcrumbItems: ["Pages", "Instansi"],
    });
  }, []);

  // const [parameterQueryList, setparameterQueryList] =
  //   useState<PagesQueryParameter>(initPagesQuery);
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
    pageSize: 10,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

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
        accessorFn: (row) => (
          <Flex justifyContent="start">
            {row.isActive == "1" ? (
              <Badge colorScheme="green">AKTIF</Badge>
            ) : (
              <Badge colorScheme="red">NON AKTIF</Badge>
            )}
          </Flex>
        ),
        id: "status",
        cell: (info) => info.getValue(),
        header: () => <span>Status</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "id",
        cell: (info) => (
          <>
            <Flex justifyContent="end">
              <Link to={`${companiesFormEditPage}?id=${info.row.original.id}`}>
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

  // Load Data

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

  // Navigation
  const CreatePageAction = () => {
    navigate(companiesFormCreatePage);
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
                onClick={CreatePageAction}
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
    </>
  );
};

export default CompaniesPage;
