import { FC } from "react";

import { EditOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useAppDispatch } from "../../../../store/hooks";
import { MedicineDto } from "../../../../types/dto/Medicine.dto";
import {
  setCurrentEditableMedicine,
  setIsEditOrderPointDialogOpen,
} from "../../medicineSlice";

import { useStyles } from "./EditOrderPointButton.styles";

interface Props {
  medicine: MedicineDto;
}

export const EditOrderPointButton: FC<Props> = ({ medicine }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleIconClick = () => {
    dispatch(setCurrentEditableMedicine(medicine));
    dispatch(setIsEditOrderPointDialogOpen(true));
  };

  return (
    <Tooltip title="Редактировать товар">
      <IconButton onClick={handleIconClick}>
        <EditOutlined className={clsx(classes.editOrderPointButton)} />
      </IconButton>
    </Tooltip>
  );
};
