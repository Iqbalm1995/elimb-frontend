import { useToast } from "@chakra-ui/react";

type ToastProps = {
  description: string;
};

export const useToastSuccess = () => {
  const toast = useToast();

  const showToastSuccess = ({ description }: ToastProps) => {
    toast({
      position: "top",
      title: "Berhasil", // You can customize the title if needed
      description: description,
      status: "success", // You can customize the status if needed
      duration: 5000,
      isClosable: true,
    });
  };

  return showToastSuccess;
};

export const useToastWarning = () => {
  const toast = useToast();

  const showToastWarning = ({ description }: ToastProps) => {
    toast({
      position: "top",
      title: "Perhatian", // You can customize the title if needed
      description: description,
      status: "warning", // You can customize the status if needed
      duration: 5000,
      isClosable: true,
    });
  };

  return showToastWarning;
};

export const useToastError = () => {
  const toast = useToast();

  const showToastError = ({ description }: ToastProps) => {
    toast({
      position: "top",
      title: "Gagal", // You can customize the title if needed
      description: description,
      status: "error", // You can customize the status if needed
      duration: 5000,
      isClosable: true,
    });
  };

  return showToastError;
};

export const useToastInfo = () => {
  const toast = useToast();

  const showToastInfo = ({ description }: ToastProps) => {
    toast({
      position: "top",
      title: "Informasi", // You can customize the title if needed
      description: description,
      status: "info", // You can customize the status if needed
      duration: 5000,
      isClosable: true,
    });
  };

  return showToastInfo;
};

type ToastHelperProps = {
  description: string;
  statusToast: "loading" | "info" | "warning" | "success" | "error" | undefined;
};

export const useToastHelper = () => {
  const toast = useToast();

  const showToast = ({ description, statusToast }: ToastHelperProps) => {
    toast({
      position: "top",
      title: statusToastTitle(statusToast), // You can customize the title if needed
      description: description,
      status: statusToast, // You can customize the status if needed
      duration: 5000,
      isClosable: true,
    });
  };

  return showToast;
};

function statusToastTitle(
  statusToast: "loading" | "info" | "warning" | "success" | "error" | undefined
) {
  let result = "Error";

  if (statusToast == "success") {
    result = "Berhasil";
  }

  if (statusToast == "info") {
    result = "Informasi";
  }

  if (statusToast == "error") {
    result = "Gagal";
  }

  if (statusToast == "warning") {
    result = "Perhatian";
  }

  if (statusToast == "loading") {
    result = "Mohon Tunggu";
  }

  if (statusToast == undefined) {
    result = "Error";
  }

  return result;
}
