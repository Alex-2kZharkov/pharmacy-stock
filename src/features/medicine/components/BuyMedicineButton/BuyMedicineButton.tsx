import { FC } from "react";

import { SellOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useAppDispatch } from "../../../../store/hooks";
import { MedicineDto } from "../../../../types/dto/Medicine.dto";
import {
  setCurrentEditableMedicine,
  setIsBuyMedicineDialogOpen,
} from "../../medicineSlice";

import { useStyles } from "./BuyMedicineButton.styles";

interface Props {
  medicine: MedicineDto;
}

export const BuyMedicineButton: FC<Props> = ({ medicine }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleIconClick = () => {
    dispatch(setCurrentEditableMedicine(medicine));
    dispatch(setIsBuyMedicineDialogOpen(true));
  };

  return (
    <Tooltip title="Закупить товар на склад">
      <IconButton onClick={handleIconClick}>
        <SellOutlined className={clsx(classes.buyMedicineButton)} />
      </IconButton>
    </Tooltip>
  );
};
