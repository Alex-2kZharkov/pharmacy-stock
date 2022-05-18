import { ChangeEvent, FC, useEffect, useState } from "react";

import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField as MuiTextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

import { ONE_HUNDRED_PERCENT } from "../../../../constants/calculations.constants";
import { REQUIRED_FIELD_MESSAGE } from "../../../../constants/yup.constants";
import { WHITE } from "../../../../theme/colors/colors.constants";
import { CategoryDto } from "../../../../types/dto/Category.dto";
import { MedicineDto } from "../../../../types/dto/Medicine.dto";

import {
  createMedicineValidationSchema,
  editMedicineValidationSchema,
} from "./MedicineDialog.schema";
import { useStyles } from "./MedicineDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: Partial<MedicineDto>) => void;
  medicine?: MedicineDto;
  categories?: CategoryDto[];
}

export const MedicineDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  medicine = {
    _id: "",
    name: "",
    quantity: 0,
    primaryAmount: 0,
    percent: 0,
    finalAmount: 0,
    orderPoint: 0,
    prognosis: 0,
    prognosisUpdatedAt: "",
  },
  categories,
}) => {
  const classes = useStyles();
  const initialValues: Partial<MedicineDto> = {
    ...medicine,
  };

  const [autoCompleteValue, setAutoCompleteValue] =
    useState<CategoryDto | null>(null);
  const [isAutoCompleteError, setIsAutoCompleteError] = useState(false);

  useEffect(() => {
    const targetCategory: CategoryDto | undefined = categories?.find(
      ({ name }) => name === initialValues?.category?.name
    );
    if (targetCategory) {
      setAutoCompleteValue(targetCategory);
    }
  }, [categories, initialValues?.category?.name]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {medicine?._id ? "Редактировать товар" : "Добавить новый товар"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (!autoCompleteValue) {
              setIsAutoCompleteError(true);
            } else {
              confirm({
                ...(values as MedicineDto),
                _id: medicine?._id,
                category: autoCompleteValue,
              });
            }
          }}
          validationSchema={
            medicine?._id
              ? editMedicineValidationSchema
              : createMedicineValidationSchema
          }
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
              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option?.name === value?.name
                }
                className={classes.autocomplete}
                disablePortal
                getOptionLabel={(option: CategoryDto) => option.name}
                id="categoryCombo"
                options={categories ?? []}
                sx={{
                  backgroundColor: WHITE,
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
                value={autoCompleteValue}
                onChange={(_, newValue: CategoryDto | null) => {
                  setAutoCompleteValue(newValue);
                }}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    error={isAutoCompleteError}
                    helperText={
                      isAutoCompleteError ? REQUIRED_FIELD_MESSAGE : ""
                    }
                    label="Выберите категорию"
                  />
                )}
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
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!isValid || !autoCompleteValue}
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
