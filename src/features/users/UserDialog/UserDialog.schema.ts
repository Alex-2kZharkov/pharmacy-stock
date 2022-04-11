import * as yup from "yup";

import { PHONE_REGEX } from "../../../constants/regex.constants";
import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PHONE_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "../../../constants/yup.constants";

export const userValidationSchema = yup.object().shape({
  firstName: yup.string().required(REQUIRED_FIELD_MESSAGE),
  lastName: yup.number().required(REQUIRED_FIELD_MESSAGE),
  email: yup
    .string()
    .required(REQUIRED_FIELD_MESSAGE)
    .email(INVALID_EMAIL_MESSAGE),
  phone: yup
    .string()
    .required(REQUIRED_FIELD_MESSAGE)
    .matches(PHONE_REGEX, INVALID_PHONE_MESSAGE),
  role: yup.string().required(REQUIRED_FIELD_MESSAGE),
});
