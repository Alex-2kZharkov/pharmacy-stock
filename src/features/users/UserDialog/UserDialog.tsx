import { FC } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const UserDialog: FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Box>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Создать нового пользовател</DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email адрес"
          type="email"
          fullWidth
          variant="standard"
        />
        <DialogActions>
          <Button onClick={onClose}>Отменить</Button>
          <Button onClick={onSubmit}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
