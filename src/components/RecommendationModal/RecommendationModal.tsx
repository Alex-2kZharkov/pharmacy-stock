import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useStyles } from "./RecommendationModal.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const RecommendationModal: FC<Props> = ({
  isOpen,
  onClose,
  message,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Рекомендация по пополнению склада</DialogTitle>
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
