import { ChangeEvent, FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import { ONE_HUNDRED_PERCENT } from "../../../../constants/calculations.constants";
import { MedicineDto } from "../../../../types/dto/Medicine.dto";

import { orderPointValidationSchema } from "./EditOrderPointDialog.schema";
import { useStyles } from "./EditOrderPointDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: Partial<MedicineDto>) => void;
  medicine?: MedicineDto;
}

export const EditOrderPointDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  medicine,
}) => {
  const classes = useStyles();
  const initialValues = { ...medicine };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Редактировать товар</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => confirm({ _id: medicine?._id, ...values })}
          validationSchema={orderPointValidationSchema}
        >
          {({ isValid, setFieldValue, values: { percent, primaryAmount } }) => (
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
              />
              <Field
                autoFocus
                id="quantity"
                name="quantity"
                label="Остаток на складе"
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
                type="number"
              />
              <Field
                id="primaryAmount"
                name="primaryAmount"
                label="Стоимость покупки 1 ед."
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const validatedPrimaryAmount = Number(e.target.value);
                  const validatedPercent = Number(percent ?? 1);
                  setFieldValue("primaryAmount", e.target.value);
                  setFieldValue(
                    "finalAmount",
                    validatedPrimaryAmount +
                      validatedPrimaryAmount *
                        (validatedPercent / ONE_HUNDRED_PERCENT)
                  );
                }}
              />

              <Field
                id="percent"
                name="percent"
                label="% добавленной стоимости"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const validatedPrimaryAmount = Number(primaryAmount ?? 0);
                  const validatedPercent = Number(e.target.value);
                  setFieldValue("percent", e.target.value);
                  setFieldValue(
                    "finalAmount",
                    validatedPrimaryAmount +
                      validatedPrimaryAmount *
                        (validatedPercent / ONE_HUNDRED_PERCENT)
                  );
                }}
              />

              <Field
                id="finalAmount"
                name="finalAmount"
                label="Стоимость продажи 1 ед."
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
                disabled
              />

              <Field
                id="prognosisUpdatedAt"
                name="prognosisUpdatedAt"
                label="Дата расчета последнего прогноза"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                disabled
              />

              <Field
                id="prognosis"
                name="prognosis"
                label="Прогноризуемый спрос"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
                disabled
              />

              <DialogActions className={classes.dialogActions}>
                <Button variant="outlined" onClick={onClose}>
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
