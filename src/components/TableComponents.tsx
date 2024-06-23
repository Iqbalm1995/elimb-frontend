import {
  Button,
  Flex,
  Grid,
  GridItem,
  Select,
  Table,
  Tbody,
  Td,
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

export function BasicTable({ table }: any) {
  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <Table size={"sm"}>
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
                <Td colSpan={table.options.columns.length + 1}></Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
      <ControlTable table={table} />
    </>
  );
}

export function ControlTable({ table }: any) {
  return (
    <div style={{ overflowX: "auto" }}>
      <Flex minWidth="max-content" justifyContent="center" gap="2" my="3%">
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}>
            <Button
              leftIcon={<BsChevronBarLeft />}
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
              size="sm"
              colorScheme="bjb_color_theme"
              width={"100%"}
            >
              Pertama
            </Button>
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}>
            <Button
              leftIcon={<BsChevronLeft />}
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
              size="sm"
              colorScheme="bjb_color_theme"
              width={"100%"}
            >
              Sebelumnya
            </Button>
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}>
            <Flex gap="2" ml="15px" mr="15px" width={"100%"}>
              <span>Halaman : </span>
              <strong>
                {" "}
                {table.getState().pagination.pageIndex + 1}{" "}
              </strong>/ <strong> {table.getPageCount()} </strong>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}>
            <Button
              rightIcon={<BsChevronRight />}
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
              size="sm"
              colorScheme="bjb_color_theme"
              width={"100%"}
            >
              Selanjutnya
            </Button>
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 5, lg: 1 }}>
            <Button
              rightIcon={<BsChevronBarRight />}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
              size="sm"
              colorScheme="bjb_color_theme"
              width={"100%"}
            >
              Terakhir
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </div>
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
