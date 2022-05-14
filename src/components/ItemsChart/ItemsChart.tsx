import React, { FC } from "react";

import { Box } from "@mui/material";
import {
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

import {
  WHITE,
  BACKGROUND_ACCENT,
  ACCENT,
} from "../../theme/colors/colors.constants";
import { Item } from "../../types/common/general.types";

interface Props {
  items?: Item[];
}

export const ItemsChart: FC<Props> = ({ items }) => {
  return (
    <Box
      style={{
        maxWidth: 720,
        border: `solid 2px ${BACKGROUND_ACCENT}`,
        borderRadius: 8,
        padding: "16px 20px 8px 0",
        backgroundColor: WHITE,
      }}
    >
      <AreaChart width={700} height={550} data={items}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={ACCENT} stopOpacity={0.8} />
            <stop offset="95%" stopColor={ACCENT} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis dataKey="createdAt" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="quantity"
          stroke={ACCENT}
          fillOpacity={1}
          fill="url(#colorPv)"
          strokeWidth={2}
          /* eslint-disable-next-line id-length */
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </Box>
  );
};
