import * as yup from "yup";

import {
  INVALID_POSITIVE_INTEGER_NUMBER,
  REQUIRED_FIELD_MESSAGE,
} from "../../../../constants/yup.constants";

export const sellMedicineDialogSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  finalMedicineAmount: yup.number().required(REQUIRED_FIELD_MESSAGE),
  quantity: yup.number().required(REQUIRED_FIELD_MESSAGE),
  sellQuantity: yup
    .number()
    .required(REQUIRED_FIELD_MESSAGE)
    .integer(INVALID_POSITIVE_INTEGER_NUMBER)
    .min(1, INVALID_POSITIVE_INTEGER_NUMBER),
  totalAmount: yup.number().required(REQUIRED_FIELD_MESSAGE),
});
