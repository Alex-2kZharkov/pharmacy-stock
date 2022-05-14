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

import {
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_WIDTH,
} from "../../constants/size.constants";
import { ACCENT } from "../../theme/colors/colors.constants";
import { Item } from "../../types/common/general.types";

interface Props {
  items?: Item[];
  width?: number;
  height?: number;
}

export const ItemsChart: FC<Props> = ({ items, width, height }) => {
  return (
    <AreaChart
      width={width ?? DEFAULT_CHART_WIDTH}
      height={height ?? DEFAULT_CHART_HEIGHT}
      data={items}
    >
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
        tick={{ fontSize: 10 }}
      />
      <YAxis>
        <Label
          value="Продано товаров"
          position="insideTopLeft"
          angle={-90}
          dy={300}
          dx={-9}
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
