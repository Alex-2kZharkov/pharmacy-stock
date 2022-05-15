import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Formik, Field, Form, FormikValues } from "formik";
import { TextField } from "formik-material-ui";

import { AdministrativePurchaseDto } from "../../../types/dto/AdministrativePurchase.dto";
import { administrativePurchaseSchema } from "../AdministrativePurchase.schema";

import { useStyles } from "./AdministrativePurchaseDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: AdministrativePurchaseDto) => void;
  administrativePurchase?: AdministrativePurchaseDto;
}

export const AdministrativePurchaseDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  administrativePurchase: { _id, name, amount } = {},
}) => {
  const classes = useStyles();

  const initialValues = {
    name: name ?? "",
    amount: amount ?? "",
  };

  const handleFormSubmit = (values: FormikValues) => {
    confirm({ ...(values as AdministrativePurchaseDto), _id: _id ?? "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {name
          ? "Обновить административный расход"
          : "Создать новый административный расход"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={administrativePurchaseSchema}
        >
          {({ isValid }) => (
            <Form>
              <Field
                autoFocus
                id="name"
                name="name"
                label="Назначение (наименование) расхода"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
              />
              <Field
                id="amount"
                name="amount"
                label="Затраченная сумма"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
              />

              <DialogActions className={classes.dialogActions}>
                <Button onClick={onClose} variant="outlined">
                  Отменить
                </Button>
                <Button variant="contained" type="submit" disabled={!isValid}>
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
