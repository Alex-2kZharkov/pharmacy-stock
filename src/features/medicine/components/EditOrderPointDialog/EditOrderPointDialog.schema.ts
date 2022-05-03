import * as yup from "yup";

import { REQUIRED_FIELD_MESSAGE } from "../../../../constants/yup.constants";

export const orderPointValidationSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  orderPoint: yup.number().required(REQUIRED_FIELD_MESSAGE),
});
