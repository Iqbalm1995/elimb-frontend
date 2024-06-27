export interface WasteSubCategory {
  id: string;
  typeCategoriesId: string;
  parentId: string;
  code: string;
  name: string;
  description: string;
  isActive: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  subCategories: string[];
}

export interface WasteCategories {
  wasteType: WasteSubCategory;
  wasteCategory: WasteSubCategory;
  wasteSource: WasteSubCategory;
  wasteManagement: WasteSubCategory;
  wasteHazard: WasteSubCategory;
}

export interface WasteData {
  id: string;
  code: string;
  name: string;
  reffNumber: string;
  wasteTypeId: string;
  wasteCategoryId: string;
  wasteSourceId: string;
  wasteManagementId: string;
  wasteHazardId: string;
  wasteDescription: string;
  relatedRegulations: string;
  registrationDate: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  isActive: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  wasteCategories: WasteCategories;
}

export interface WastesForm {
  id?: string | null;
  code: string;
  name: string;
  reffNumber: string;
  wasteTypeId: string;
  wasteCategoryId: string;
  wasteSourceId: string;
  wasteManagementId: string;
  wasteHazardId: string;
  wasteDescription?: string;
  relatedRegulations: string;
  registrationDate: string;
  image1?: string | null;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
  isActive: string;
  companyId?: string | null;
}
