import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import { ItemsChart } from "../../../../components/ItemsChart";
import { Item } from "../../../../types/common/general.types";

import { useStyles } from "./MedicineDemandChart.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  medicineName?: string;
  items?: Item[];
}

export const MedicineDemandChart: FC<Props> = ({
  isOpen,
  onClose,
  medicineName,
  items,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{`График продаж товара "${medicineName}"`}</DialogTitle>
      <DialogContent style={{ paddingBottom: 0 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={1}
        >
          <ItemsChart items={items} />
        </Stack>
        <DialogActions className={classes.dialogActions}>
          <Button variant="contained" type="submit" onClick={onClose}>
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
