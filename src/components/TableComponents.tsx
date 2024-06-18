import { Button, Flex, Grid, GridItem, Select } from "@chakra-ui/react";
import {
  BsChevronBarLeft,
  BsChevronBarRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { borderRadiusSchemes } from "./themes/colorScheme";

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
        w="80px"
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
