import axios from "axios";
import { BackendBaseUrlAPI } from "../data/ApplicationConstants";
import { PagesQueryParameter } from "../typesModel/MasterParameterTypes";
import { ContractRegistrationForm } from "../typesModel/ContractTypes";

axios.defaults.baseURL = BackendBaseUrlAPI;

export async function PostContractsListServices(
  data: PagesQueryParameter,
  token: string
) {
  const urlGet = `v1/Contracts/list`;

  try {
    return await axios.post(urlGet, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // console.error("Error response data:", error.response.data);
      return error.response;
    } else {
      // console.error("Unexpected error:", error);
      return error;
    }
  }
}

export async function PostContractsDetailByIdServices(
  id: string,
  token: string
) {
  const urlGet = `v1/Contracts/detail/id/${id}`;

  try {
    return await axios.get(urlGet, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // console.error("Error response data:", error.response.data);
      return error.response;
    } else {
      // console.error("Unexpected error:", error);
      return error;
    }
  }
}

export async function PostContractsRegisterServices(
  data: ContractRegistrationForm,
  token: string
) {
  const urlGet = `v1/Contracts/register`;

  try {
    return await axios.post(urlGet, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // console.error("Error response data:", error.response.data);
      return error.response;
    } else {
      // console.error("Unexpected error:", error);
      return error;
    }
  }
}
