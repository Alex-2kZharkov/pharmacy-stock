import {
  setCurrentEditablePurchase,
  setIsUpdateDialogOpen,
} from "../features/administrative-purchase/administrativePurchaseSlice";
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
    [EntitiesNames.AdministrativePurchase]: {
      setCurrentEntity: setCurrentEditablePurchase,
      setIsCurrentModalOpen: setIsUpdateDialogOpen,
    },
  };

  return currentEntityActions[entityName];
};
