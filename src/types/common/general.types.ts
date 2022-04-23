import { MedicineDto } from "../dto/medicine.types";
import { UserDto } from "../dto/user.types";

export type UnknownObject = Record<string, unknown>;
export type Optional<T> = T | undefined;

export enum EntitiesNames {
  User = "User",
  Medicine = "Medicine",
}

export type Entities = UserDto | MedicineDto;
