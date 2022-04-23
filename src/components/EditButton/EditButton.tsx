import { FC } from "react";

import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useAppDispatch } from "../../store/hooks";
import { Entities, EntitiesNames } from "../../types/common/general.types";
import { getCurrentEntityActions } from "../../utils/common.utils";

import { useStyles } from "./EditButton.styles";

interface Props {
  entityName: EntitiesNames;
  payload: Entities;
}

export const EditButton: FC<Props> = ({ entityName, payload }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { setCurrentEntity, setIsCurrentModalOpen } =
    getCurrentEntityActions(entityName);

  const handleIconClick = () => {
    dispatch(setCurrentEntity(payload));
    dispatch(setIsCurrentModalOpen(true));
  };

  return (
    <IconButton onClick={handleIconClick}>
      <EditOutlined className={classes.editButton} />
    </IconButton>
  );
};
