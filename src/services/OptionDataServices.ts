import axios from "axios";
import { BackendBaseUrlAPI } from "../data/ApplicationConstants";
import { PagesQueryParameter } from "../typesModel/MasterParameterTypes";

axios.defaults.baseURL = BackendBaseUrlAPI;

export async function PostOptionDataListServices(
  data: PagesQueryParameter,
  token: string
) {
  const urlGet = `v1/OptionData/list`;

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

export async function GetOptionDataGroupByGroupId(
  groupId: string,
  token: string
) {
  const urlGet = `v1/OptionData/option-group/${groupId}`;

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

export async function GetOptionDataGroupByGroupCode(
  groupCode: string,
  token: string
) {
  const urlGet = `v1/OptionData/option-group-code?code=${groupCode}`;

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

export async function GetOptionDataValueByValueId(
  valueId: string,
  token: string
) {
  const urlGet = `v1/OptionData/option-value/${valueId}`;

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

export async function GetOptionDataValueByValueCode(
  valueCode: string,
  token: string
) {
  const urlGet = `v1/OptionData/option-value-code?code=${valueCode}`;

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

export async function GetOptionDataValueByGroupId(
  groupId: string,
  token: string
) {
  const urlGet = `v1/OptionData/list/option-value/${groupId}`;

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

export async function GetOptionDataValueByGroupCode(
  groupCode: string,
  token: string
) {
  const urlGet = `v1/OptionData/list/option-value/code?GroupCode=${groupCode}`;

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
