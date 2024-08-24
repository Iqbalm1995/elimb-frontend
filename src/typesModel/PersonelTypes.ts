interface DocumentsCompany {
  id: string;
  companyId: string;
  docTypeId: string;
  docTypeName: string;
  docFile: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  deletedAt: string;
}

interface CompanyRelationCount {
  countWastes: number;
  countVehicles: number;
  countBranches: number;
  countPersonels: number;
  countContracts: number;
}

interface CompanyPersonel {
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
  companyLogo: string;
  companyLogoBase64: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  documentsCompany: DocumentsCompany[];
  companyRelationCount: CompanyRelationCount;
}

export interface PersonnelData {
  id: string;
  companyId: string;
  personnelTypeId: string;
  personnelTypeName: string;
  noPersonnel: string;
  name: string;
  streetaddress1: string;
  streetaddress2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  email: string;
  photo1: string;
  photo2: string;
  photo3: string;
  isActive: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  companyPersonel: CompanyPersonel;
}
