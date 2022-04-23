import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  // FormHelperText,
} from "@mui/material";
import { Formik, Field, Form, FormikValues } from "formik";
import { TextField } from "formik-material-ui";

import { useLazyCreateUserQuery } from "../../../services/api/user.api";
import { RoleTypes, RoleTypesRussian } from "../../../types/common/role.types";
import { UserDto } from "../../../types/dto/user.types";

import { userValidationSchema } from "./UserDialog.schema";
import { useStyles } from "./UserDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UserDialog: FC<Props> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [createUser] = useLazyCreateUserQuery();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "+996",
    role: "",
  };

  const handleFormSubmit = (values: FormikValues) => {
    createUser(values as UserDto);
    /* eslint-disable */
    console.log(values);
    // window.location.reload();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Создать нового пользователя</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={userValidationSchema}
        >
          {() => (
            <Form>
              <Field
                autoFocus
                id="firstName"
                name="firstName"
                label="Имя"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
              />
              <Field
                id="lastName"
                name="lastName"
                label="Фамилия"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
              />
              <Field
                id="email"
                name="email"
                label="Email адрес"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
              />

              <Field
                id="phone"
                name="phone"
                label="Телефон"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
              />

              <Field
                id="role"
                name="role"
                label="Роль"
                fullWidth
                select
                variant="standard"
                component={TextField}
                margin="dense"
              >
                <MenuItem value={RoleTypes.MANAGER}>
                  {RoleTypesRussian.MANAGER}
                </MenuItem>
                <MenuItem value={RoleTypes.EMPLOYEE}>
                  {RoleTypesRussian.EMPLOYEE}
                </MenuItem>
              </Field>

              <DialogActions className={classes.dialogActions}>
                <Button onClick={onClose} variant="outlined">
                  Отменить
                </Button>
                <Button variant="contained" type="submit">
                  Создать
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
