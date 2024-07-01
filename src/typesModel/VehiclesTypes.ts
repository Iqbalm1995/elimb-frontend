export interface VehicleData {
  id: string;
  vehicleModelName: string;
  vehicleName: string;
  description: string;
  unitRegistrationDate: string;
  licenseNumberPlate: string;
  loadCapacity: string;
  isActive: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
  companyId: string;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
  image1Base64?: string | null;
  image2Base64?: string | null;
  image3Base64?: string | null;
  image4Base64?: string | null;
}
