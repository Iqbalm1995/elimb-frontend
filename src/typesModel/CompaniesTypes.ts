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
  documentsCompany: string | null;
}
