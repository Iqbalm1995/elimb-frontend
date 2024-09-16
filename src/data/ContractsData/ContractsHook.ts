import { HttpStatusCode } from "axios";
import { PostContractsRegisterServices } from "../../services/ContractsServices";
import { ContractRegistrationForm } from "../../typesModel/ContractTypes";
import { SaveDataResponse } from "../../typesModel/MasterParameterTypes";

export const RequestRegisterDataContract = async (
  data: ContractRegistrationForm,
  token: string
): Promise<SaveDataResponse> => {
  try {
    const response: any = await PostContractsRegisterServices(data, token);

    if (
      response.status !== HttpStatusCode.Ok &&
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
