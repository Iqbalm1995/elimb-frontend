export interface CompanyRegistration {
  companyId: string;
  personnelId: string;
}

export interface ContractRegistrationForm {
  contractNumber: string;
  contractTitle: string;
  contractDetails: string;
  startDate: string;
  endDate: string;
  companyRegPemanfaat: CompanyRegistration;
  companyRegPenyalur: CompanyRegistration;
  companyRegTransport: CompanyRegistration;
}

interface CompanyRelationCount {
  countWastes: number;
  countVehicles: number;
  countBranches: number;
  countPersonels: number;
  countContracts: number;
}

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

interface PersonnelData {
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

interface ContractCompany {
  id: string;
  contractId: string;
  companyId: string;
  roleCompanyId: string;
  roleCompanyData: string;
  companyData: CompanyPersonel;
}

interface ContractApproval {
  id: string;
  contractId: string;
  personnelId: string;
  approvalDate: string;
  approvalStatus: string;
  approvalStatusData: string;
  personelData: PersonnelData;
}

export interface ContractData {
  id: string;
  contractNumber: string;
  contractTitle: string;
  startDate: string;
  endDate: string;
  contractDetails: string;
  contractStatusId: string;
  contractStatusName: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  makerPersonelId: string;
  makerPersonelData: PersonnelData;
  contractCompanies: ContractCompany[];
  contractApprovals: ContractApproval[];
}
