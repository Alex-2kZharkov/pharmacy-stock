import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useStyles } from "./CalculatePrognosisDialog.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const CalculatePrognosisDialog: FC<Props> = ({
  isOpen,
  onClose,
  message,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Результаты прогнозирования</DialogTitle>
      <DialogContent>
        {message}
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" onClick={onClose}>
            ОК
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
