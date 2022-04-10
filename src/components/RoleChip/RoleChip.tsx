import { FC } from "react";

import { Chip } from "@mui/material";
import clsx from "clsx";

import { RoleTypes } from "../../types/common/role.types";

import { useStyles } from "./RoleChip.styles";

interface Props {
  role: RoleTypes;
  description: string;
}

export const RoleChip: FC<Props> = ({ role, description }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-console
  return (
    <Chip
      className={clsx(classes.container, {
        [classes.success]: role === RoleTypes.EMPLOYEE,
        [classes.warn]: role === RoleTypes.MANAGER,
        [classes.error]: role === RoleTypes.ADMIN,
      })}
      label={description}
    />
  );
};
