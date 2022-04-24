import { FC } from "react";

import { DeleteForeverOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import clsx from "clsx";

import { Entities, EntitiesNames } from "../../types/common/general.types";
import { RoleTypes } from "../../types/common/role.types";
import { UserDto } from "../../types/dto/user.types";

import { useStyles } from "./DeleteButton.styles";

interface Props {
  entityName: EntitiesNames;
  payload: Entities;
}

export const DeleteButton: FC<Props> = ({ entityName, payload }) => {
  const classes = useStyles();
  const isDisabled = (payload as UserDto)?.role?.name === RoleTypes.ADMIN;

  return (
    <IconButton disabled={isDisabled}>
      <DeleteForeverOutlined
        className={clsx(classes.deleteButton, {
          [classes.disabledDeleteButton]: isDisabled,
        })}
      />
    </IconButton>
  );
};
