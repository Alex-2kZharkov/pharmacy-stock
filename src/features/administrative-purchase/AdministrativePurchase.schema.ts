import * as yup from "yup";

import {
  REQUIRED_FIELD_MESSAGE,
  INVALID_POSITIVE_NUMBER,
} from "../../constants/yup.constants";

export const administrativePurchaseSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  amount: yup
    .number()
    .required(REQUIRED_FIELD_MESSAGE)
    .positive(INVALID_POSITIVE_NUMBER),
});
