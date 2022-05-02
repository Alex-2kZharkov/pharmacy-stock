import { FC } from "react";

import { EditOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useAppDispatch } from "../../store/hooks";
import { Entities, EntitiesNames } from "../../types/common/general.types";
import { RoleTypes } from "../../types/common/role.types";
import { UserDto } from "../../types/dto/User.dto";
import { getCurrentEntityActions } from "../../utils/common.utils";

import { useStyles } from "./EditButton.styles";

interface Props {
  entityName: EntitiesNames;
  payload: Entities;
  tooltipText?: string;
}

export const EditButton: FC<Props> = ({ entityName, payload, tooltipText }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isDisabled = (payload as UserDto)?.role?.name === RoleTypes.ADMIN;

  const { setCurrentEntity, setIsCurrentModalOpen } =
    getCurrentEntityActions(entityName);

  const handleIconClick = () => {
    dispatch(setCurrentEntity(payload));
    dispatch(setIsCurrentModalOpen(true));
  };

  return (
    <Tooltip title={tooltipText ?? "Редактировать"}>
      <IconButton onClick={handleIconClick} disabled={isDisabled}>
        <EditOutlined
          className={clsx(classes.editButton, {
            [classes.disabledEditButton]: isDisabled,
          })}
        />
      </IconButton>
    </Tooltip>
  );
};
