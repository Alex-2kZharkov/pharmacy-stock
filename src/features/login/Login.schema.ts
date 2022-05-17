import * as yup from "yup";

import {
  INVALID_EMAIL_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from "../../constants/yup.constants";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(REQUIRED_FIELD_MESSAGE)
    .email(INVALID_EMAIL_MESSAGE),
  password: yup.string().required(REQUIRED_FIELD_MESSAGE),
});
