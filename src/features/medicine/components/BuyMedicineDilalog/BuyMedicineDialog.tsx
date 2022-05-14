import { ChangeEvent, FC } from "react";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { addDays } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import {
  INVALID_BUYING_QUANTITY,
  INVALID_MEDICINE_EXPIRATION_DATE,
} from "../../../../constants/yup.constants";
import { MedicineDto } from "../../../../types/dto/Medicine.dto";

import { buyMedicineDialogSchema } from "./BuyMedicineDialog.schema";
import { useStyles } from "./BuyMedicineDialog.styles";
import { BuyMedicineDialogTypes } from "./BuyMedicineDialog.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: BuyMedicineDialogTypes) => void;
  medicine?: MedicineDto;
  budgetAmount?: number;
}

export const BuyMedicineDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  medicine,
  budgetAmount,
}) => {
  const classes = useStyles();
  const initialValues: BuyMedicineDialogTypes = {
    _id: medicine?._id,
    name: medicine?.name,
    budgetAmount,
    buyingQuantity: 1,
    primaryMedicineAmount: medicine?.primaryAmount,
    expirationDate: addDays(new Date(), 1),
    totalAmount: medicine?.primaryAmount,
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Закупить товар</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: BuyMedicineDialogTypes) =>
            confirm({ ...values, _id: medicine?._id })
          }
          validationSchema={buyMedicineDialogSchema}
        >
          {({ isValid, setFieldValue, values }) => (
            <Form>
              <Field
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
                id="budgetAmount"
                name="budgetAmount"
                label="Сумма деньги в бюджете"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                disabled
              />
              <Field
                id="primaryMedicineAmount"
                name="primaryMedicineAmount"
                label="Стоимость покупки 1 ед."
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                disabled
              />
              <Field
                autoFocus
                id="buyingQuantity"
                name="buyingQuantity"
                label="Количество товара к покупке"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newAmount =
                    Number(e.target.value) *
                    ((values as BuyMedicineDialogTypes)
                      ?.primaryMedicineAmount ?? 1);
                  setFieldValue("buyingQuantity", Number(e.target.value));
                  setFieldValue("totalAmount", newAmount);
                }}
              />
              {((values as BuyMedicineDialogTypes).budgetAmount ?? 0) <
                ((values as BuyMedicineDialogTypes).totalAmount ?? 0) && (
                <FormHelperText error>{INVALID_BUYING_QUANTITY}</FormHelperText>
              )}
              <Field
                id="totalAmount"
                name="totalAmount"
                label="Итоговая сумма закупки"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
                disabled
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <KeyboardDatePicker
                  minDate={addDays(new Date(), 1)}
                  minDateMessage={INVALID_MEDICINE_EXPIRATION_DATE}
                  className={classes.datepicker}
                  label="Годен до"
                  format="dd MMMM yyyy"
                  value={(values as BuyMedicineDialogTypes).expirationDate}
                  InputProps={{ readOnly: true }}
                  onChange={(date: MaterialUiPickersDate) => {
                    setFieldValue("expirationDate", date);
                  }}
                  fullWidth
                />
              </MuiPickersUtilsProvider>

              <DialogActions className={classes.dialogActions}>
                <Button variant="outlined" onClick={onClose}>
                  Отменить
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={
                    !isValid ||
                    ((values as BuyMedicineDialogTypes).budgetAmount ?? 0) <
                      ((values as BuyMedicineDialogTypes).totalAmount ?? 0)
                  }
                >
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
