import axios from "axios";
import { BackendBaseUrlAPI } from "../data/ApplicationConstants";
import { PagesQueryParameter } from "../typesModel/MasterParameterTypes";
import { CompanyDataForm } from "../typesModel/CompaniesTypes";

axios.defaults.baseURL = BackendBaseUrlAPI;

export async function PostCompaniesListServices(
  data: PagesQueryParameter,
  token: string
) {
  const urlGet = `v1/Companies/list`;

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

export async function PostCompaniesDetailByIdServices(
  id: string,
  token: string
) {
  const urlGet = `v1/Companies/detail/id/${id}`;

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

export async function PostCompaniesDetailByCompanyIdServices(
  company_id: string,
  token: string
) {
  const urlGet = `v1/Companies/detail/company-id/${company_id}`;

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

export async function PostCompaniesAddServices(
  data: CompanyDataForm,
  token: string
) {
  const urlGet = `v1/Companies/add`;

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

export async function PostCompaniesEditServices(
  data: CompanyDataForm,
  token: string
) {
  const urlGet = `v1/Companies/update`;

  try {
    return await axios.patch(urlGet, data, {
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
