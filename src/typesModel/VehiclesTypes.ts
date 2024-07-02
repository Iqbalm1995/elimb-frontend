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
  updatedBy: string;
  updatedAt: string;
  companyId: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  company: null;
}

export interface VehicleForm {
  id?: string;
  vehicleModelName: string;
  vehicleName: string;
  description: string;
  unitRegistrationDate: string;
  licenseNumberPlate: string;
  loadCapacity: string;
  isActive: string;
  companyId: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}
