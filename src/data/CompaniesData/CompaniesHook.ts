import { HttpStatusCode } from "axios";
import {
  PostCompaniesAddServices,
  PostCompaniesEditServices,
} from "../../services/CompaniesServices";
import { CompanyDataForm } from "../../typesModel/CompaniesTypes";
import { SaveDataResponse } from "../../typesModel/MasterParameterTypes";

export const RequestInsertDataCompany = async (
  data: CompanyDataForm,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostCompaniesAddServices(data, token);

    if (response.status !== HttpStatusCode.Ok) {
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

export const RequestUpdateDataCompany = async (
  data: CompanyDataForm,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostCompaniesEditServices(data, token);

    if (response.status !== HttpStatusCode.Ok) {
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
