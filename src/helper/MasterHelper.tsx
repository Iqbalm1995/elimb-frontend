import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// capitalize each word string
export function capitalizeWords(str: string) {
  let result = "";
  if (str !== undefined && str !== null) {
    result = str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return result;
}

export function formatDateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1 and pad with '0'
  const day = String(date.getDate()).padStart(2, "0"); // Pad with '0' if single-digit day

  return `${year}-${month}-${day}`;
}

export function formatDateToDDMMYYYY(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1 and pad with '0'
  const day = String(date.getDate()).padStart(2, "0"); // Pad with '0' if single-digit day

  return `${day}-${month}-${year}`;
}

export function formatDateInput(inputDate: string): string {
  const parts = inputDate.split("-");

  if (parts.length !== 3) {
    throw new Error("Invalid date format. Expected 'yyyy-mm-dd'.");
  }

  const year = parts[0];
  const month = parts[1].padStart(2, "0");
  const day = parts[2].padStart(2, "0");

  return `${day}-${month}-${year}`;
}

export function formatDateReverse(inputDate: string): string {
  try {
    const parts = inputDate.split("-");

    if (parts.length !== 3) {
      throw new Error("Invalid date format. Expected 'dd-mm-yyyy'.");
    }

    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.log(error);
    return formatDateToDDMMYYYY(new Date());
  }
}

export function convertStringToDate(dateString: any) {
  try {
    // Split the string into day, month, and year parts
    const [year, month, day] = dateString.split("-");

    // Create a new Date object by passing the year, month (subtract 1 as months are zero-based), and day
    return new Date(year, month - 1, day);
  } catch (error) {
    console.log(error);
    return new Date();
  }
}

export function formatToRupiah(number: number): string {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}

// date to time string converter (dd-mm-yyyy)
export function dateToString(e: any) {
  const date = zeroFill(e.getDate());
  const month = zeroFill(e.getMonth() + 1);
  const year = e.getFullYear();

  return `${date}-${month}-${year}`;
  // return `${year}-${month}-${date}`;
}

export function formatDateCA(dateString: string): string {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
}
// zero fill < 10 number
export function zeroFill(d: number) {
  return (d < 10 ? "0" : "") + d;
}

// string to date converter
export function stringToDate(str: string) {
  const date = new Date(str);
  return date;
}

export function stringToDateFormated(str: string) {
  const dt = new Date(str);

  const date = zeroFill(dt.getDate());
  const month = zeroFill(dt.getMonth() + 1);
  const year = dt.getFullYear();

  return `${date}-${month}-${year}`;
}

export function stringToDateFormatedReverse(str: string) {
  const dt = new Date(str);

  const date = zeroFill(dt.getDate());
  const month = zeroFill(dt.getMonth() + 1);
  const year = dt.getFullYear();

  return `${year}-${month}-${date}`;
}

export const BadgeComponentStatus = ({ status }: { status: string }) => {
  const [statusLabel, setStatusLabel] = React.useState("");
  const [statusColor, setStatusColor] = React.useState("gray");
  // const statusColor = React.useMemo(() => (status ? "green" : "red"), [status]);
  // const statusLabel = React.useMemo(
  //   () => (status ? "Active" : "Inactive"),
  //   [status]
  // );

  useEffect(() => {
    if (status == "0") {
      setStatusLabel("Baru");
      setStatusColor("blue");
    } else if (status == "1") {
      setStatusLabel("Disetujui");
      setStatusColor("green");
    } else if (status == "2") {
      setStatusLabel("Ditolak");
      setStatusColor("red");
    } else {
      setStatusLabel("-");
      setStatusColor("gray");
    }
  }, [status]);

  return (
    <>
      <Badge variant="solid" colorScheme={statusColor}>
        {statusLabel}
      </Badge>
    </>
  );
};

export function roleMatrixMapper(functionID: string | null) {
  let result = null;

  if (functionID == import.meta.env.VITE_ROLE_IT_DGB_MANAGER) {
    result = import.meta.env.VITE_ROLE_SUPPORT;
  }

  if (functionID == import.meta.env.VITE_ROLE_IT_DGB_OFFICER) {
    result = import.meta.env.VITE_ROLE_SUPPORT;
  }

  if (functionID == import.meta.env.VITE_ROLE_IT_DGB_STAFF) {
    result = import.meta.env.VITE_ROLE_SUPPORT;
  }

  if (functionID == import.meta.env.VITE_ROLE_HUBLA_DJ2_MANAGER) {
    result = import.meta.env.VITE_ROLE_MANAGER;
  }

  if (functionID == import.meta.env.VITE_ROLE_HUBLA_DJ2_OFFICER) {
    result = import.meta.env.VITE_ROLE_STAFF;
  }

  if (functionID == import.meta.env.VITE_ROLE_HUBLA_DJ2_STAFF) {
    result = import.meta.env.VITE_ROLE_STAFF;
  }

  return result;
}

export function CurrentYear() {
  const currentYear = new Date().getFullYear();

  return currentYear;
}

export function bytesToMB(bytes: number): number {
  const megabyte = 1024 * 1024;
  return Math.ceil(bytes / megabyte);
}

export function bytesToKB(bytes: number): number {
  const kilobyte = 1024;
  return Math.ceil(bytes / kilobyte);
}

export function nominalValidation({
  nom1,
  nom2,
}: {
  nom1: number;
  nom2: number;
}) {
  let result = "black";

  if (nom1 == nom2) {
    result = "green";
  }
  if (nom1 > nom2) {
    result = "orange";
  }
  if (nom1 < nom2) {
    result = "red";
  }

  return result;
}

export function headerRecapValidation(functionID: string | null) {
  let result = false;

  if (functionID == import.meta.env.VITE_HEADER_RECAP_NO) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_RECAP_KODE_SATKER) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_RECAP_NAMA_SATKER) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_RECAP_TUNKIN_UMUM) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_RECAP_TIPIDKOR) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_RECAP_SUSULAN) {
    result = true;
  }

  return result;
}

export function headerPayrollValidation(functionID: string | null) {
  let result = false;

  if (functionID == import.meta.env.VITE_HEADER_NO) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_CODE) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_NAMA) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_NO_REK) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_TUNKIN_KOTOR) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_POT_BJB) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_POT_BDHR) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_TUNKIN_BERSIH) {
    result = true;
  }

  if (functionID == import.meta.env.VITE_HEADER_PERIODE) {
    result = true;
  }

  return result;
}

export function convertFileToBase64(selectedFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1] || ""); // Remove the data URL prefix
      } else {
        reject(new Error("Failed to convert file to base64."));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };
    reader.readAsDataURL(selectedFile);
  });
}

export function formatDateTimeBE(datetimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate: string = new Date(datetimeString)
    .toLocaleDateString(undefined, options)
    .replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+)/, "$3/$2/$1 $4:$5");

  return formattedDate;
}

export function formatDateTimeBEPeriodFormat(datetimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate: string = new Date(datetimeString)
    .toLocaleDateString(undefined, options)
    .replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+)/, "$3/$2");

  return formattedDate;
}

export function excelSerialToJSDate(serial: number): string {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const date = new Date(
    (serial - 1) * millisecondsPerDay + Date.UTC(1900, 0, 1)
  );

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function excelSerialToJSDatePeriod(serial: number): string {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const date = new Date(
    (serial - 1) * millisecondsPerDay + Date.UTC(1900, 0, 1)
  );

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}`;
}

export function formatDateTimeBEString(datetimeString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate: string = new Date(datetimeString)
    .toLocaleDateString(undefined, options)
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1");

  return formattedDate;
}

export function statusRecapDefinition(status: string | undefined) {
  let result = null;

  if (status == "") {
    result = <Badge colorScheme="gray">Undefined</Badge>;
  }

  if (status == "U") {
    result = <Badge colorScheme="gray">Uploaded</Badge>;
  }

  if (status == "S") {
    result = <Badge colorScheme="teal">Submited</Badge>;
  }

  if (status == "P") {
    result = <Badge colorScheme="blue">Progress</Badge>;
  }

  if (status == "V") {
    result = <Badge colorScheme="teal">Verified</Badge>;
  }

  if (status == "A") {
    result = <Badge colorScheme="teal">Approved</Badge>;
  }

  if (status == "NV") {
    result = (
      <Badge colorScheme="red" variant="solid">
        Not Verified
      </Badge>
    );
  }

  if (status == "N") {
    result = (
      <Badge colorScheme="yellow" variant="solid">
        New
      </Badge>
    );
  }

  if (status == "F") {
    result = (
      <Badge colorScheme="red" variant="solid">
        Failed
      </Badge>
    );
  }

  if (status == "E") {
    result = (
      <Badge variant="solid" colorScheme="blue">
        Executing
      </Badge>
    );
  }

  if (status == "EP") {
    result = (
      <Badge variant="solid" colorScheme="blue">
        Executing 2
      </Badge>
    );
  }

  if (status == "D") {
    result = (
      <Badge variant="solid" colorScheme="green">
        Done
      </Badge>
    );
  }

  return result;
}

export function statusRecapDefinitionRaw(status: string | undefined) {
  let result = null;

  if (status == "") {
    result = "Undefined";
  }

  if (status == "U") {
    result = "Uploaded";
  }

  if (status == "S") {
    result = "Submited";
  }

  if (status == "P") {
    result = "Progress";
  }

  if (status == "V") {
    result = "Verified";
  }

  if (status == "A") {
    result = "Approved";
  }

  if (status == "NV") {
    result = "Not Verified";
  }

  if (status == "N") {
    result = "New";
  }

  if (status == "E") {
    result = "Executing";
  }

  if (status == "F") {
    result = "Failed Executing";
  }

  if (status == "EP") {
    result = "Executing 2";
  }

  if (status == "D") {
    result = "Done";
  }

  return result;
}

export function formatDateToISOString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  const offset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
  const offsetSign = offset < 0 ? "+" : "-";

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${offsetHours}${offsetMinutes}`;
}

export const AlertVerificationSatker = ({
  status,
  msgCustom,
}: {
  status: string | undefined;
  msgCustom: string | null;
}) => {
  let result = null;

  if (status == "NV") {
    result = (
      <Alert status="error">
        <AlertIcon />
        <Box>
          <AlertTitle>Data Gagal Diverifikasi</AlertTitle>
          <AlertDescription>
            <Box mx={5}>
              <p>
                {msgCustom != null
                  ? msgCustom
                  : "Terdapat kesalahan setelah proses verifikasi, cek kembali data yang gagal verifikasi"}
              </p>
            </Box>
          </AlertDescription>
        </Box>
      </Alert>
    );
  }

  if (status == "V") {
    result = (
      <Alert status="success">
        <AlertIcon />
        <Box>
          <AlertTitle>Data Berhasil Diverifikasi</AlertTitle>
          <AlertDescription>
            <Box mx={5}>
              <p>{msgCustom}</p>
            </Box>
          </AlertDescription>
        </Box>
      </Alert>
    );
  }

  return result;
};

export const AlertResponse = ({
  msgHeader,
  msgCustom,
}: {
  msgHeader: string | undefined;
  msgCustom: string | null;
}) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <Box>
        <AlertTitle>{msgHeader}</AlertTitle>
        <AlertDescription>
          <Box>{msgCustom}</Box>
        </AlertDescription>
      </Box>
    </Alert>
  );
};

export const AlertResponseCustom = ({
  msgHeader,
  msgCustom,
  statusAlert,
}: {
  msgHeader: string | undefined;
  msgCustom: string | null;
  statusAlert: "error" | "info" | "loading" | "warning" | "success" | undefined;
}) => {
  return (
    <Alert status={statusAlert}>
      <AlertIcon />
      <Box>
        <AlertTitle>{msgHeader}</AlertTitle>
        <AlertDescription>
          <Box>{msgCustom}</Box>
        </AlertDescription>
      </Box>
    </Alert>
  );
};

export function RoleValidation(roleID: string): string {
  let result = "";

  result = import.meta.env.VITE_ROLE_BRANCH_SECONDARY;

  if (roleID == import.meta.env.VITE_ROLE_POLDA_01) {
    result = import.meta.env.VITE_ROLE_POLDA_01;
  }

  if (roleID == import.meta.env.VITE_ROLE_BRANCH_MAIN) {
    result = import.meta.env.VITE_ROLE_BRANCH_MAIN;
  }

  if (roleID == import.meta.env.VITE_ROLE_HUBLA) {
    result = import.meta.env.VITE_ROLE_HUBLA;
  }

  if (roleID == "000M") {
    result = import.meta.env.VITE_ROLE_MASTER;
  }

  // if (
  //   roleID != import.meta.env.VITE_ROLE_BRANCH_MAIN ||
  //   roleID != import.meta.env.VITE_ROLE_POLDA_01
  // ) {
  //   result = import.meta.env.VITE_ROLE_BRANCH_SECONDARY;
  // }

  return result;
}
