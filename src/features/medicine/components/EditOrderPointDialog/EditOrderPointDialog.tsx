import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import { MedicineDto } from "../../../../types/dto/Medicine.dto";

import { orderPointValidationSchema } from "./EditOrderPointDialog.schema";
import { useStyles } from "./EditOrderPointDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: () => void;
  medicine?: MedicineDto;
}

export const EditOrderPointDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  medicine: { name, orderPoint } = {},
}) => {
  const classes = useStyles();
  const initialValues = {
    name,
    orderPoint,
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Редактировать точку заказа</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={confirm}
          validationSchema={orderPointValidationSchema}
        >
          {() => (
            <Form>
              <Field
                autoFocus
                id="name"
                name="name"
                label="Название товара"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                disabled
              />
              <Field
                id="orderPoint"
                name="orderPoint"
                label="Точка заказа"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                number
              />

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
