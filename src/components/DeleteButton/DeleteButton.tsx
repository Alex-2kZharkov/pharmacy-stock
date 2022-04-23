import { FC } from "react";

import { DeleteForeverOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { useStyles } from "./DeleteButton.styles";

interface Props {
  onClick?: () => void;
}

export const DeleteButton: FC<Props> = () => {
  const classes = useStyles();

  return (
    <IconButton>
      <DeleteForeverOutlined className={classes.editButton} />
    </IconButton>
  );
};
