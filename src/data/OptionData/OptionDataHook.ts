import { HttpStatusCode } from "axios";
import {
  PostOptionGroupAddServices,
  PostOptionGroupDeleteServices,
  PostOptionGroupEditServices,
  PostOptionValueAddServices,
  PostOptionValueDeleteServices,
  PostOptionValueEditServices,
} from "../../services/OptionDataServices";
import { SaveDataResponse } from "../../typesModel/MasterParameterTypes";
import {
  OptionGroupForm,
  OptionValueForm,
} from "../../typesModel/OptionValuesTypes";

export const RequestInsertDataOptionGroup = async (
  data: OptionGroupForm,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostOptionGroupAddServices(data, token);

    if (response.status !== HttpStatusCode.Created) {
      console.log(`Data return : ${response.status}`);
      return {
        status: false,
        message: response.data.message,
        errors: response.data.errors,
      };
    }

    return {
      status: true,
      message: "Berhasil disimpan",
      errors: [],
    };
  } catch (error) {
    console.error(`Data return : ${error}`);
    return {
      status: false,
      message: "Error",
      errors: [],
    };
  }
};

export const RequestUpdateDataOptionGroup = async (
  data: OptionGroupForm,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostOptionGroupEditServices(data, token);

    if (
      response.status !== HttpStatusCode.Ok ||
      response.status !== HttpStatusCode.Created
    ) {
      console.log(`Data return : ${response.status}`);
      return {
        status: false,
        message: response.data.message,
        errors: response.data.errors,
      };
    }

    return {
      status: true,
      message: "Berhasil disimpan",
      errors: [],
    };
  } catch (error) {
    console.error(`Data return : ${error}`);
    return {
      status: false,
      message: "Error",
      errors: [],
    };
  }
};

export const RequestDeleteDataOptionGroup = async (
  id: string,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostOptionGroupDeleteServices(id, token);

    if (
      response.status !== HttpStatusCode.Ok ||
      response.status !== HttpStatusCode.Created
    ) {
      console.log(`Data return : ${response.status}`);
      return {
        status: false,
        message: response.data.message,
        errors: response.data.errors,
      };
    }

    return {
      status: true,
      message: "Berhasil disimpan",
      errors: [],
    };
  } catch (error) {
    console.error(`Data return : ${error}`);
    return {
      status: false,
      message: "Error",
      errors: [],
    };
  }
};

export const RequestInsertDataOptionValue = async (
  data: OptionValueForm,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostOptionValueAddServices(data, token);

    if (response.status !== HttpStatusCode.Created) {
      console.log(`Data return : ${response.status}`);
      return {
        status: false,
        message: response.data.message,
        errors: response.data.errors,
      };
    }

    return {
      status: true,
      message: "Berhasil disimpan",
      errors: [],
    };
  } catch (error) {
    console.error(`Data return : ${error}`);
    return {
      status: false,
      message: "Error",
      errors: [],
    };
  }
};

export const RequestUpdateDataOptionValue = async (
  data: OptionValueForm,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostOptionValueEditServices(data, token);

    if (
      response.status !== HttpStatusCode.Ok ||
      response.status !== HttpStatusCode.Created
    ) {
      console.log(`Data return : ${response.status}`);
      return {
        status: false,
        message: response.data.message,
        errors: response.data.errors,
      };
    }

    return {
      status: true,
      message: "Berhasil disimpan",
      errors: [],
    };
  } catch (error) {
    console.error(`Data return : ${error}`);
    return {
      status: false,
      message: "Error",
      errors: [],
    };
  }
};

export const RequestDeleteDataOptionValue = async (
  id: string,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostOptionValueDeleteServices(id, token);

    if (
      response.status !== HttpStatusCode.Ok ||
      response.status !== HttpStatusCode.Created
    ) {
      console.log(`Data return : ${response.status}`);
      return {
        status: false,
        message: response.data.message,
        errors: response.data.errors,
      };
    }

    return {
      status: true,
      message: "Berhasil disimpan",
      errors: [],
    };
  } catch (error) {
    console.error(`Data return : ${error}`);
    return {
      status: false,
      message: "Error",
      errors: [],
    };
  }
};
