export interface OptionData {
  value: any;
  label: string;
}

export interface OptionGroupData {
  id: string;
  code: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  values: OptionValueData[];
}

export interface OptionValueData {
  id: string;
  optionGroupId: string;
  code: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export const mapperOptionData = (data: OptionValueData[]): OptionData[] => {
  return data.map((x) => ({
    label: x.name,
    value: x.id,
  }));
};
