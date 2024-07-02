import { useEffect, useMemo, useState } from "react";
import useAuthenticationState from "../../data/GlobalStates/AuthenticationState";
import { useToastHelper } from "../../helper/ToastMessagesHelper";
import { CompanyData } from "../../typesModel/CompaniesTypes";
import { PagesQueryParameter } from "../../typesModel/MasterParameterTypes";
import { WasteData } from "../../typesModel/WastesTypes";
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
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import { PostWastesCompaniesListServices } from "../../services/WastesServices";
import { HttpStatusCode } from "axios";
import {
  BasicTable,
  ControlTable,
  TableInputShowPage,
} from "../../components/TableComponents";
import { borderRadiusSchemes } from "../../components/themes/colorScheme";
import { GiHazardSign } from "react-icons/gi";

const initPagesQuery: PagesQueryParameter = {
  search: "",
  keyId: "",
  page: 1,
  limit: 5,
  filterWhere: [],
  fieldOrder: ["name"],
  orderDir: "asc",
};

const CompanyWasteData = ({
  CompanyData,
}: {
  CompanyData: CompanyData | null;
}) => {
  const showToast = useToastHelper();
  const AuthData = useAuthenticationState((state: any) => state.AuthData);
  const [totalPages, setTotalPageData] = useState<number>(1);
  const [data, setData] = useState<WasteData[] | []>([]);
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

  const columns = useMemo<ColumnDef<WasteData>[]>(
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
                <Flex
                  borderRadius={borderRadiusSchemes}
                  // bgColor={specialColorDark}
                  bgGradient={"linear(to-b, #2aaeff, #0082d1)"}
                  p={3}
                  w={"50px"}
                  h={"50px"}
                  justifyContent="center"
                  alignItems="center"
                >
                  <GiHazardSign size={"5em"} color={"white"} />
                </Flex>
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
                  <Text fontWeight={500}>{row.name}</Text>
                  <Text
                    textStyle={"italic"}
                    fontWeight={300}
                    fontSize={11}
                    color={"gray.400"}
                  >
                    #{row.code}
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </>
        ),
        id: "code",
        cell: (info) => info.getValue(),
        header: () => <span>Limbah</span>,
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
    var RequestAuthentication = PostWastesCompaniesListServices(
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

      const responseDataList: WasteData[] = response.data.data as WasteData[];

      setData(responseDataList);
      setTotalPageData(
        response.data.countTotal > 0
          ? Math.ceil(response.data.countTotal / pageSize)
          : 0
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
      keyId: CompanyData ? CompanyData.id : null,
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

  return (
    <>
      <VStack w={"full"}>
        <Flex w={"full"}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            inventore adipisci porro incidunt doloremque eaque repellendus?
            Quisquam quis temporibus cumque magni veritatis nemo repellendus
            odit vel aliquam repellat, pariatur minus!
          </Text>
        </Flex>
        <Box w={"full"}>
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
                  //   onClick={CreatePageAction}
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
                  <GridItem colSpan={{ base: 12, md: 12 }}>
                    <BasicTable table={table} isLoading={IsLoadingTable} />
                    <ControlTable table={table} />
                  </GridItem>
                </Grid>
              </>
            </CardBody>
          </Card>
        </Box>
      </VStack>
    </>
  );
};

export default CompanyWasteData;
