import { HttpStatusCode } from "axios";
import { GetOptionDataGroupByGroupCode } from "../../services/OptionDataServices";
import {
  OptionData,
  OptionValueData,
  mapperOptionData,
} from "../../typesModel/OptionValuesTypes";

export const RequestOptionDataGroupByGroupCode = async (
  code: string,
  token: string
): Promise<OptionData[]> => {
  try {
    const response: any = await GetOptionDataGroupByGroupCode(code, token);

    if (response.status !== HttpStatusCode.Ok) {
      console.log(`Data Option return : ${response.status}`);
      return [];
    }

    const responseDataOptionValues: OptionValueData[] = response.data.data
      .values as OptionValueData[];
    const mappedUsers = mapperOptionData(responseDataOptionValues);
    return mappedUsers;
  } catch (error) {
    console.error(`Data Option return : ${error}`);
    return [];
  }
};
