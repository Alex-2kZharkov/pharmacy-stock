import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { Formik, Field, Form, FormikValues } from "formik";
import { TextField } from "formik-material-ui";

import { RoleTypes, RoleTypesRussian } from "../../../types/common/role.types";
import { UserDto } from "../../../types/dto/User.dto";
import { userValidationSchema } from "../UsersPage.schema";

import { useStyles } from "./UserDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: UserDto) => void;
  user?: UserDto;
}

export const UserDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  user: { _id, firstName, lastName, email, phone, role } = {},
}) => {
  const classes = useStyles();
  const initialValues = {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    email: email ?? "",
    phone: phone ?? "+996",
    role: role?.name ?? "",
  };

  const handleFormSubmit = (values: FormikValues) => {
    confirm({ ...(values as UserDto), _id: _id ?? "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {firstName ? "Обновить пользователя" : "Создать нового пользователя"}
      </DialogTitle>
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
              </Field>

              <DialogActions className={classes.dialogActions}>
                <Button onClick={onClose} variant="outlined">
                  Отменить
                </Button>
                <Button variant="contained" type="submit">
                  Сохранить
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
