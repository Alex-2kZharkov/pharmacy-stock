import { CategoryDto } from "./Category.dto";

export interface MedicineDto {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  quantity: number;
  primaryAmount: number;
  finalAmount: number;
  percent: number;
  prognosis: number;
  prognosisUpdatedAt?: Date | string;
  orderPoint?: number;
  category: CategoryDto;
}
