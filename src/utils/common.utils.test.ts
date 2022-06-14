import { EntitiesNames } from "../types/common/general.types";

import { getCurrentEntityActions } from "./common.utils";

describe("getCurrentEntityActions", () => {
  it("should return required functions for User page", () => {
    expect(getCurrentEntityActions(EntitiesNames.User)).toHaveProperty(
      "setCurrentEntity"
    );
    expect(getCurrentEntityActions(EntitiesNames.User)).toHaveProperty(
      "setIsCurrentModalOpen"
    );
  });

  it("should return undefined", () => {
    expect(getCurrentEntityActions(EntitiesNames.Empty)).toBeUndefined();
  });
});
