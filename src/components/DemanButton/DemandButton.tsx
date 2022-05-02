import { FC } from "react";

import { BarChartOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import clsx from "clsx";

import { useStyles } from "./DemandButton.styles";

// interface Props {
//   payload: Entities;
// }

export const DemandButton: FC = () => {
  const classes = useStyles();

  return (
    <Tooltip title="Рассчитать спрос">
      <IconButton>
        <BarChartOutlined className={clsx(classes.demandButton)} />
      </IconButton>
    </Tooltip>
  );
};
