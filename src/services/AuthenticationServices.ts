import { BackendBaseUrlAPI } from "../data/ApplicationConstants";

import { PayloadAuthentication } from "../pages/Auth/AuthrenticationForm";
import axios from "axios";

axios.defaults.baseURL = BackendBaseUrlAPI;

export async function PostAuthenticationServices(data: PayloadAuthentication) {
  const urlGet = `v1/Authenticate/Login`;

  try {
    return await axios.post(urlGet, data);
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
