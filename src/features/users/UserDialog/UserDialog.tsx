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

import { RoleTypes, RoleTypesRussian } from "../../../types/common/role.types";

import { userValidationSchema } from "./UserDialog.schema";
import { useStyles } from "./UserDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const UserDialog: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const classes = useStyles();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "+996",
    role: "",
  };

  const handleFormSubmit = ({
    firstName,
    lastName,
    email,
    phone,
    role,
  }: FormikValues) => {
    /* eslint-disable */
    console.log(firstName, lastName, email, phone, role);
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
