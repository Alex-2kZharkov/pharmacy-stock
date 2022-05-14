import { FC } from "react";

import { BarChartOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useAppDispatch } from "../../../../store/hooks";
import { MedicineSaleDto } from "../../../../types/dto/MedicineSale.dto";
import {
  setCurrentMedicineSale,
  setIsMedicineDemandChartModalOpen,
} from "../../medicineSaleSlice";

import { useStyles } from "./ShowDemandChartButton.styles";

interface Props {
  medicineSale: MedicineSaleDto;
}

export const ShowDemandChartButton: FC<Props> = ({ medicineSale }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleIconClick = () => {
    dispatch(setCurrentMedicineSale(medicineSale));
    dispatch(setIsMedicineDemandChartModalOpen(true));
  };

  return (
    <Tooltip title="Показать график продаж">
      <IconButton onClick={handleIconClick}>
        <BarChartOutlined className={clsx(classes.showDemandChartButton)} />
      </IconButton>
    </Tooltip>
  );
};
