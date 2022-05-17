import {
  setCurrentEditablePurchase,
  setIsUpdateDialogOpen,
} from "../features/administrative-purchase/administrativePurchaseSlice";
import {
  setCurrentEditableCategory,
  setIsUpdateDialogOpen as setIsUpdateCategoryDialogOpen,
} from "../features/category/categorySlice";
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
    [EntitiesNames.Category]: {
      setCurrentEntity: setCurrentEditableCategory,
      setIsCurrentModalOpen: setIsUpdateCategoryDialogOpen,
    },
  };

  return currentEntityActions[entityName];
};
