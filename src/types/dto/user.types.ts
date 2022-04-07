import { RoleDto } from "./role.types";

export interface UserDto {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: RoleDto;
  createdAt: string;
  updatedAt: string;
}
