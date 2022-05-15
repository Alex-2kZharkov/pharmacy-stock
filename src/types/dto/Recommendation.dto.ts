import { MedicineDto } from "./Medicine.dto";

export interface RecommendationDto {
  _id: string;
  medicine: MedicineDto;
  description: string;
  createdAt: string;
  updatedAt: string;
}
