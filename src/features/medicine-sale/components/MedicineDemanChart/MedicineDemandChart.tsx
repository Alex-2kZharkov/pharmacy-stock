import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useStyles } from "./MedicineDemandChart.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  medicineName: string;
}

export const MedicineDemandChart: FC<Props> = ({
  isOpen,
  onClose,
  medicineName,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>График продаж товара {}</DialogTitle>
      <DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" type="submit" onClick={onClose}>
            Сохранить
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
