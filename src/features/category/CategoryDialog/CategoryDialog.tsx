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

import { CategoryDto } from "../../../types/dto/Category.dto";
import { categorySchema } from "../Category.schema";

import { useStyles } from "./Category.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  confirm: (payload: CategoryDto) => void;
  category?: CategoryDto;
}

export const CategoryDialog: FC<Props> = ({
  isOpen,
  onClose,
  confirm,
  category: { _id, name } = {},
}) => {
  const classes = useStyles();

  const initialValues = {
    name: name ?? "",
  };

  const handleFormSubmit = (values: FormikValues) => {
    confirm({ ...(values as CategoryDto), _id: _id ?? "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {name ? "Обновить категорию" : "Создать новую категорию"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={categorySchema}
        >
          {({ isValid }) => (
            <Form>
              <Field
                autoFocus
                id="name"
                name="name"
                label="Название категории"
                fullWidth
                variant="standard"
                component={TextField}
                margin="dense"
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
