import { FC } from "react";

import { BarChartOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import {
  setCurrentEditableMedicine,
  setIsCalculatePrognosisDialogOpen,
} from "../../features/medicine/medicineSlice";
import { useAppDispatch } from "../../store/hooks";
import { MedicineDto } from "../../types/dto/Medicine.dto";

import { useStyles } from "./DemandButton.styles";

interface Props {
  medicine: MedicineDto;
}

export const DemandButton: FC<Props> = ({ medicine }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleIconClick = () => {
    dispatch(setCurrentEditableMedicine(medicine));
    dispatch(setIsCalculatePrognosisDialogOpen(true));
  };

  return (
    <Tooltip title="Рассчитать спрос">
      <IconButton onClick={handleIconClick}>
        <BarChartOutlined className={clsx(classes.demandButton)} />
      </IconButton>
    </Tooltip>
  );
};
