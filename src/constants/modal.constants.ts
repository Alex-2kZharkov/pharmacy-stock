import { setCurrentEditableUser } from "../features/users/userSlice";
import { EntitiesNames } from "../types/common/general.types";

export const EDITABLE_ENTITIES = {
  [EntitiesNames.User]: setCurrentEditableUser,
  [EntitiesNames.Medicine]: setCurrentEditableUser,
};
