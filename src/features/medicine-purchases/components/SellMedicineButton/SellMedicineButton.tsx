import { FC } from "react";

import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useAppDispatch } from "../../../../store/hooks";
import { MedicinePurchaseDto } from "../../../../types/dto/MedicinePurchase.dto";
import {
  setCurrentEditableMedicinePurchase,
  setIsSellMedicineDialogOpen,
} from "../../medicinePurchaseSlice";

import { useStyles } from "./SellMedicineButton.styles";

interface Props {
  medicinePurchase: MedicinePurchaseDto;
}

export const SellMedicineButton: FC<Props> = ({ medicinePurchase }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleIconClick = () => {
    dispatch(setCurrentEditableMedicinePurchase(medicinePurchase));
    dispatch(setIsSellMedicineDialogOpen(true));
  };

  return (
    <Box className={classes.sellButtonContainer}>
      <Tooltip title="Продать товар">
        <IconButton onClick={handleIconClick}>
          <AddShoppingCartOutlined
            className={clsx(classes.sellMedicineButton)}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
