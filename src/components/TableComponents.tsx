import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { borderRadiusSchemes } from "./themes/colorScheme";
import { flexRender } from "@tanstack/react-table";
import SpinnerComponent from "./loading-component/SpinnerComponent";

export function BasicTable({
  table,
  isLoading,
}: {
  table: any;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <Box py={"100px"}>
          <SpinnerComponent />
        </Box>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <Table size={"sm"} mt={5}>
              <Thead>
                {table.getHeaderGroups().map((headerGroup: any) => (
                  <Tr key={headerGroup.id}>
                    <Th fontSize={12} color={"gray.500"} py={2}>
                      No.
                    </Th>
                    {headerGroup.headers.map((header: any) => {
                      return (
                        <Th
                          key={header.id}
                          colSpan={header.colSpan}
                          fontSize={12}
                          color={"gray.500"}
                          py={2}
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row: any, index: any) => {
                    return (
                      <Tr key={row.id}>
                        <Td
                          key={index}
                          fontWeight={600}
                          fontSize={15}
                          color={"gray.800"}
                        >
                          {index + 1}
                        </Td>
                        {row.getVisibleCells().map((cell: any) => {
                          return (
                            <Td
                              key={cell.id}
                              fontWeight={600}
                              fontSize={15}
                              color={"gray.800"}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td colSpan={table.options.columns.length + 1}>
                      <Flex justifyContent={"center"}>Data belum ada</Flex>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
            <ControlTable table={table} />
          </div>
        </>
      )}
    </>
  );
}

export function ControlTable({ table }: any) {
  return (
    <>
      <Card
        borderRadius={borderRadiusSchemes}
        boxShadow={"xl"}
        borderWidth={"1px"}
        borderColor={"gray.100"}
        my={8}
      >
        <CardBody>
          <Grid templateColumns="repeat(12, 1fr)" gap={2}>
            <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
              <Flex
                w={"full"}
                h={"full"}
                justifyContent={{ base: "center", md: "start" }}
              >
                <HStack
                  alignItems={"center"}
                  justifyContent={{ base: "center", md: "start" }}
                  h={"full"}
                  w={"full"}
                >
                  <Text fontWeight={600} color={"gray"}>
                    Halaman
                  </Text>
                  <Text fontWeight={600} color={"black"}>
                    {table.getState().pagination.pageIndex + 1}
                  </Text>
                  <Text fontWeight={600} color={"black"}>
                    /
                  </Text>
                  <Text fontWeight={600} color={"black"}>
                    {table.getPageCount()}
                  </Text>
                </HStack>
              </Flex>
            </GridItem>
            <GridItem w={"full"} colSpan={{ base: 12, md: 6 }}>
              <Flex w={"full"} justifyContent={{ base: "center", md: "end" }}>
                <ButtonGroup isAttached variant="outline">
                  <IconButton
                    aria-label="Pertama"
                    icon={<BsChevronBarLeft />}
                    onClick={() => table.setPageIndex(0)}
                    isDisabled={!table.getCanPreviousPage()}
                  />
                  <IconButton
                    aria-label="Sebelumnya"
                    icon={<BsChevronLeft />}
                    onClick={() => table.previousPage()}
                    isDisabled={!table.getCanPreviousPage()}
                  />
                  <IconButton
                    aria-label="Selanjutnya"
                    icon={<BsChevronRight />}
                    onClick={() => table.nextPage()}
                    isDisabled={!table.getCanNextPage()}
                  />
                  <IconButton
                    aria-label="Terakhir"
                    icon={<BsChevronBarRight />}
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    isDisabled={!table.getCanNextPage()}
                  />
                </ButtonGroup>
              </Flex>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
}

export function TableInputShowPage({ table }: any) {
  return (
    <Flex justifyContent="flex-end" gap="2">
      <Select
        borderRadius={borderRadiusSchemes}
        size="md"
        width={{ base: "full", md: "80px" }}
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </Select>
    </Flex>
  );
}
