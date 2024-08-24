import axios from "axios";
import { BackendBaseUrlAPI } from "../data/ApplicationConstants";
import { PagesQueryParameter } from "../typesModel/MasterParameterTypes";

axios.defaults.baseURL = BackendBaseUrlAPI;

export async function PostPersonelListServices(
  data: PagesQueryParameter,
  token: string
) {
  const urlGet = `v1/Personel/list`;

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

export async function PostPersonelDetailByIdServices(
  id: string,
  token: string
) {
  const urlGet = `v1/Personel/detail/id/${id}`;

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
