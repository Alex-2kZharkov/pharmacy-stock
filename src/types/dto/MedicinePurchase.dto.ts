import { MedicineDto } from "./Medicine.dto";

export interface MedicinePurchaseDto {
  _id: string;
  createdAt: string;
  updatedAt: string;
  medicine: MedicineDto;
  quantity: number;
  expirationDate: Date;
  totalAmount: number;
}
