import { ActionCreator } from "../../store/store";
import { AdministrativePurchaseDto } from "../dto/AdministrativePurchase.dto";
import { CategoryDto } from "../dto/Category.dto";
import { MedicineDto } from "../dto/Medicine.dto";
import { UserDto } from "../dto/User.dto";

export type UnknownObject = Record<string, unknown>;
export type Optional<T> = T | undefined;

export enum EntitiesNames {
  User = "User",
  Medicine = "Medicine",
  AdministrativePurchase = "AdministrativePurchase",
  Category = "Category",
  Empty = "",
}

export type Entities =
  | Optional<UserDto>
  | Optional<MedicineDto>
  | Optional<AdministrativePurchaseDto>
  | Optional<CategoryDto>;

export interface CurrentEntityAction {
  setCurrentEntity: (payload: Entities) => ActionCreator;
  setIsCurrentModalOpen: (payload: boolean) => ActionCreator;
}

export interface Item {
  createdAt: string;
  quantity: number;
}
