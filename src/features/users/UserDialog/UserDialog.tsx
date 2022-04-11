import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import InputMask from "react-input-mask";

import { userValidationSchema } from "./UserDialog.schema";
// import { useStyles } from "./UserDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const UserDialog: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  // const classes = useStyles();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  };

  const handleFormSubmit = () => {
    alert("2121312");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Создать нового пользователя</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={userValidationSchema}
        >
          {({ values, errors, handleSubmit }) => (
            <Form>
              <Field
                name="firstName"
                component={() => (
                  <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    name="firstName"
                    label="Имя"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                )}
              />
              {errors.firstName && (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              )}
              <Field
                name="lastName"
                component={() => (
                  <TextField
                    margin="dense"
                    id="lastName"
                    name="lastName"
                    label="Фамилия"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                )}
              />
              {errors.lastName && (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              )}
              <Field
                name="email"
                component={() => (
                  <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email адрес"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                )}
              />
              {errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
              <Field
                name="phone"
                component={() => (
                  <InputMask
                    /* eslint-disable */
                    mask="+\9\96999999999"
                    name="phone"
                    disabled={false}
                    maskPlaceholder="x"
                  >
                    {() => (
                      <TextField
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Телефон"
                        type=""
                        fullWidth
                        variant="standard"
                      />
                    )}
                  </InputMask>
                )}
              />
              {errors.phone && (
                <FormHelperText error>{errors.phone}</FormHelperText>
              )}
              <Field
                name="role"
                component={() => (
                  <TextField
                    margin="dense"
                    id="role"
                    name="role"
                    label="Роль"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                )}
              />
              {errors.role && (
                <FormHelperText error>{errors.role}</FormHelperText>
              )}
              <DialogActions>
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
