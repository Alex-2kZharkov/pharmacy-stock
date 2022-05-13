import { ChangeEvent, FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import { INVALID_QUANTITY_SELLING } from "../../../../constants/yup.constants";
import { MedicinePurchaseDto } from "../../../../types/dto/MedicinePurchase.dto";

import { sellMedicineDialogSchema } from "./SellMedicineDialog.schema";
import { useStyles } from "./SellMedicineDialog.styles";
import { SellMedicineDialogTypes } from "./SellMedicineDialog.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: SellMedicineDialogTypes) => void;
  medicinePurchase?: MedicinePurchaseDto;
}

export const SellMedicineDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  medicinePurchase,
}) => {
  const classes = useStyles();
  const initialValues: SellMedicineDialogTypes = {
    _id: medicinePurchase?._id,
    name: medicinePurchase?.medicine?.name,
    quantity: medicinePurchase?.quantity,
    sellQuantity: 1,
    finalMedicineAmount: medicinePurchase?.medicine?.finalAmount,
    totalAmount: 0,
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Продать товар</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: SellMedicineDialogTypes) =>
            confirm({ ...values, _id: medicinePurchase?._id })
          }
          validationSchema={sellMedicineDialogSchema}
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
                autoFocus
                id="quantity"
                name="quantity"
                label="Товара на складе"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
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
                id="sellQuantity"
                name="sellQuantity"
                label="Количество товара к покупке"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const newAmount =
                    Number(e.target.value) *
                    ((values as SellMedicineDialogTypes)?.finalMedicineAmount ??
                      1);
                  setFieldValue("sellQuantity", Number(e.target.value));
                  setFieldValue("totalAmount", newAmount);
                }}
              />
              {((values as SellMedicineDialogTypes).quantity ?? 0) <
                (values as SellMedicineDialogTypes).sellQuantity && (
                <FormHelperText error>
                  {INVALID_QUANTITY_SELLING}
                </FormHelperText>
              )}
              <Field
                id="totalAmount"
                name="totalAmount"
                label="Итоговая сумма продажи"
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
                <Button
                  variant="contained"
                  type="submit"
                  disabled={
                    !isValid ||
                    ((values as SellMedicineDialogTypes).quantity ?? 0) <
                      (values as SellMedicineDialogTypes).sellQuantity
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
