export interface CompanyData {
  id: string;
  companyAsTypeId: string;
  companyAsTypeName: string;
  companyTypeId: string;
  companyTypeName: string;
  companyId: string;
  name: string;
  bio: string;
  streetaddress1: string;
  streetaddress2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  estabilishedDate: string;
  website: string;
  isActive: string;
  companyLogo: string | null;
  companyLogoBase64: string | null;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  documentsCompany: DocumentsCompany[];
  companyRelationCount?: CompanyRelationCount | null;
}

export interface CompanyRelationCount {
  countWastes: 0;
  countVehicles: 0;
  countBranches: 0;
  countPersonels: 0;
  countContracts: 0;
}

export interface DocumentsCompany {
  id: string;
  companyId: string;
  docTypeId: string;
  docTypeName: string;
  docFile: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface CompanyDataForm {
  id?: string | null;
  companyAsTypeId: string;
  companyTypeId: string;
  companyId: string;
  name: string;
  bio: string;
  streetaddress1: string;
  streetaddress2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  estabilishedDate: string;
  website: string;
  isActive: string;
  companyLogo: string;
}
