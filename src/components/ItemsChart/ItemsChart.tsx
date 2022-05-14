import React, { FC } from "react";

import {
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Label,
} from "recharts";

import { ACCENT } from "../../theme/colors/colors.constants";
import { Item } from "../../types/common/general.types";

interface Props {
  items?: Item[];
}

export const ItemsChart: FC<Props> = ({ items }) => {
  return (
    <AreaChart width={800} height={600} data={items}>
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={ACCENT} stopOpacity={0.8} />
          <stop offset="95%" stopColor={ACCENT} stopOpacity={0.05} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="createdAt"
        angle={15}
        dx={0}
        dy={5}
        minTickGap={-100}
        axisLine={false}
        interval="preserveStartEnd"
        tick={{ fontSize: 12 }}
      />
      <YAxis>
        <Label
          value="Продано товаров"
          position="insideTopLeft"
          angle={-90}
          dy={300}
        />
      </YAxis>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="Продано"
        stroke={ACCENT}
        fillOpacity={1}
        fill="url(#colorPv)"
        strokeWidth={2}
        /* eslint-disable-next-line id-length */
        activeDot={{ r: 7 }}
      />
    </AreaChart>
  );
};
