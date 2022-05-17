import * as yup from "yup";

import { REQUIRED_FIELD_MESSAGE } from "../../constants/yup.constants";

export const categorySchema = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD_MESSAGE),
});
