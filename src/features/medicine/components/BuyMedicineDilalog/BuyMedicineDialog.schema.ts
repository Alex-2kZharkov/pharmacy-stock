import * as yup from "yup";

import {
  INVALID_MEDICINE_EXPIRATION_DATE,
  INVALID_POSITIVE_INTEGER_NUMBER,
  REQUIRED_FIELD_MESSAGE,
} from "../../../../constants/yup.constants";

export const buyMedicineDialogSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  budgetAmount: yup.number().required(REQUIRED_FIELD_MESSAGE),
  primaryMedicineAmount: yup.number().required(REQUIRED_FIELD_MESSAGE),
  buyingQuantity: yup
    .number()
    .required(REQUIRED_FIELD_MESSAGE)
    .integer(INVALID_POSITIVE_INTEGER_NUMBER)
    .min(1, INVALID_POSITIVE_INTEGER_NUMBER),
  expirationDate: yup
    .date()
    .required(REQUIRED_FIELD_MESSAGE)
    .min(new Date(), INVALID_MEDICINE_EXPIRATION_DATE),
  totalAmount: yup.number().required(REQUIRED_FIELD_MESSAGE),
});
