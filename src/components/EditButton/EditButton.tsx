import { FC } from "react";

import { EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useStyles } from "./EditButton.styles";

interface Props {
  onClick?: () => void;
}

export const EditButton: FC<Props> = () => {
  const classes = useStyles();

  return (
    <IconButton>
      <EditOutlined className={classes.editButton} />
    </IconButton>
  );
};
