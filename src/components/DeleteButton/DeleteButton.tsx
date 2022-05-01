import { FC } from "react";

import { DeleteForeverOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import clsx from "clsx";

import { useLazyDeleteUserQuery } from "../../services/api/user.api";
import { Entities } from "../../types/common/general.types";
import { RoleTypes } from "../../types/common/role.types";
import { UserDto } from "../../types/dto/User.dto";

import { useStyles } from "./DeleteButton.styles";

interface Props {
  payload: Entities;
}

export const DeleteButton: FC<Props> = ({ payload }) => {
  const classes = useStyles();
  const isDisabled = (payload as UserDto)?.role?.name === RoleTypes.ADMIN;

  const [deleteUser] = useLazyDeleteUserQuery();

  const handleIconClick = () => {
    // eslint-disable-next-line no-restricted-globals
    const response = confirm(
      "Вы уверены, что хотите удалить безвозвратно эту запись?"
    );

    if (response) {
      deleteUser(payload?._id);
    }
  };

  return (
    <IconButton disabled={isDisabled} onClick={handleIconClick}>
      <DeleteForeverOutlined
        className={clsx(classes.deleteButton, {
          [classes.disabledDeleteButton]: isDisabled,
        })}
      />
    </IconButton>
  );
};
