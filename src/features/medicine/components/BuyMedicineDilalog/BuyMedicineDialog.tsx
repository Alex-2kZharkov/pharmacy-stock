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
} from "@mui/material";
import { addDays } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import { INVALID_MEDICINE_EXPIRATION_DATE } from "../../../../constants/yup.constants";
import { MedicineDto } from "../../../../types/dto/Medicine.dto";

import { buyMedicineDialogSchema } from "./BuyMedicineDialog.schema";
import { useStyles } from "./BuyMedicineDialog.styles";
import { BuyMedicineDialogTypes } from "./BuyMedicineDialog.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: Partial<MedicineDto>) => void;
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
    buyingQuantity: 0,
    finalMedicineAmount: medicine?.finalAmount,
    expirationDate: addDays(new Date(), 1),
    totalAmount: 0,
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Закупить товар</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={confirm}
          validationSchema={buyMedicineDialogSchema}
        >
          {({ isValid, setFieldValue, values }) => (
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
                autoFocus
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
                id="finalMedicineAmount"
                name="finalMedicineAmount"
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
                  setFieldValue("buyingQuantity", e.target.value);
                  setFieldValue(
                    "totalAmount",
                    Number(e.target.value) *
                      ((values as BuyMedicineDialogTypes)
                        ?.finalMedicineAmount ?? 1)
                  );
                }}
              />
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
                  format="dd-MM-yyyy"
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
