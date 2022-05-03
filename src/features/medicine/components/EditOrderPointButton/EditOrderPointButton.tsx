import { FC } from "react";

import { EditOutlined } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useAppDispatch } from "../../../../store/hooks";
import { MedicineDto } from "../../../../types/dto/Medicine.dto";
import { setIsEditOrderPointDialogOpen } from "../../medicineSlice";

import { useStyles } from "./EditOrderPointButton.styles";

interface Props {
  medicine: MedicineDto;
}

export const EditOrderPointButton: FC<Props> = ({ medicine }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleIconClick = () => dispatch(setIsEditOrderPointDialogOpen(true));

  return (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="space-between"
      alignItems="center"
    >
      <div>{medicine.orderPoint}</div>
      <Tooltip title="Редактировать точку заказа">
        <IconButton onClick={handleIconClick}>
          <EditOutlined className={clsx(classes.editOrderPointButton)} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
