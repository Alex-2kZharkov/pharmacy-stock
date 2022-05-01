import { MedicineDto } from "./Medicine.dto";

export interface MedicineSaleDto {
  _id: string;
  createdAt: string;
  updatedAt: string;
  medicine: MedicineDto;
  quantity: number;
  amountPerUnit: number;
  totalAmount: number;
}
