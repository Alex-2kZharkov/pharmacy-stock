import {
  setCurrentEditableUser,
  setIsUpdateUserDialogOpen,
} from "../features/users/userSlice";
import {
  CurrentEntityAction,
  EntitiesNames,
} from "../types/common/general.types";

export const getCurrentEntityActions = (
  entityName: EntitiesNames
): CurrentEntityAction => {
  const currentEntityActions = {
    [EntitiesNames.User]: {
      setCurrentEntity: setCurrentEditableUser,
      setIsCurrentModalOpen: setIsUpdateUserDialogOpen,
    },
    [EntitiesNames.Medicine]: {
      setCurrentEntity: setCurrentEditableUser,
      setIsCurrentModalOpen: setIsUpdateUserDialogOpen,
    },
  };

  return currentEntityActions[entityName];
};
