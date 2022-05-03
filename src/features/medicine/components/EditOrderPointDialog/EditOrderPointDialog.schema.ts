import * as yup from "yup";

import { REQUIRED_FIELD_MESSAGE } from "../../../../constants/yup.constants";

import {
  POSITIVE_NUMBER_VALIDATION_MESSAGE,
  ORDER_POINT_VALIDATION_MESSAGE,
} from "./EditOrderPointDialog.constants";

export const orderPointValidationSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  quantity: yup.number().required(REQUIRED_FIELD_MESSAGE),
  orderPoint: yup
    .number()
    .required(REQUIRED_FIELD_MESSAGE)
    .integer(ORDER_POINT_VALIDATION_MESSAGE)
    .positive(ORDER_POINT_VALIDATION_MESSAGE),
  primaryAmount: yup
    .number()
    .required(REQUIRED_FIELD_MESSAGE)
    .positive(POSITIVE_NUMBER_VALIDATION_MESSAGE),
  percent: yup
    .number()
    .required(REQUIRED_FIELD_MESSAGE)
    .positive(POSITIVE_NUMBER_VALIDATION_MESSAGE),
  finalAmount: yup.number().required(REQUIRED_FIELD_MESSAGE),
  prognosisUpdatedAt: yup.string().required(REQUIRED_FIELD_MESSAGE),
  prognosis: yup.number().required(REQUIRED_FIELD_MESSAGE),
});
