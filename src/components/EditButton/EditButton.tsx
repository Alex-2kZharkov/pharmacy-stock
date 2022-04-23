import { FC } from "react";

import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { EDITABLE_ENTITIES } from "../../constants/modal.constants";
import { useAppDispatch } from "../../store/hooks";
import { Entities, EntitiesNames } from "../../types/common/general.types";

import { useStyles } from "./EditButton.styles";

interface Props {
  entityName: EntitiesNames;
  payload: Entities;
}

export const EditButton: FC<Props> = ({ entityName, payload }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const setCurrentEntity = EDITABLE_ENTITIES[entityName];

  const handleIconClick = () => dispatch(setCurrentEntity(payload));

  return (
    <IconButton onClick={handleIconClick}>
      <EditOutlined className={classes.editButton} />
    </IconButton>
  );
};
