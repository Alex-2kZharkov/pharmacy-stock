import { RoleDto } from "./Role.dto";

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
