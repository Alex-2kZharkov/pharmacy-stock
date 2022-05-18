import * as yup from "yup";

import { REQUIRED_FIELD_MESSAGE } from "../../../../constants/yup.constants";

import {
  POSITIVE_NUMBER_VALIDATION_MESSAGE,
  ORDER_POINT_VALIDATION_MESSAGE,
} from "./MedicineDialog.constants";

export const editMedicineValidationSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  quantity: yup.number().required(REQUIRED_FIELD_MESSAGE),
  orderPoint: yup
    .number()
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
  prognosisUpdatedAt: yup.string().nullable(),
  prognosis: yup.number().required(REQUIRED_FIELD_MESSAGE),
});

export const createMedicineValidationSchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
  quantity: yup.number(),
  orderPoint: yup
    .number()
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
  prognosisUpdatedAt: yup.string().nullable(),
  prognosis: yup.number(),
});
