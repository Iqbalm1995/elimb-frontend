export interface AuthResponse {
  apiKey: string;
  expiration: string;
  usersInfo: AuthUsersInfo;
}

export interface AuthUsersInfo {
  id: string;
  fullName: string;
  username: string;
  isActive: string;
  personelInfo: AuthPersonelInfo;
  roleInfo: AuthRoleInfo;
}

export interface AuthPersonelInfo {
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
  photo1: string | null;
  photo2: string | null;
  photo3: string | null;
  isActive: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  companyPersonel: string | null;
}

export interface AuthRoleInfo {
  id: string;
  roleTypeId: string;
  roleTypeName: string;
  name: string;
  isActive: string;
}
