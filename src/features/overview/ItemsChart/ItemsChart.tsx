import React, { PureComponent } from "react";

import { Box } from "@mui/material";
import {
  XAxis,
  Tooltip,
  YAxis,
  Line,
  LineChart,
  CartesianGrid,
} from "recharts";

import { BORDER_COLOUR, WHITE } from "../../../theme/colors/colors.constants";

const data = [
  {
    name: "Page A",
    "Кол-во проданных товаров": 4000,
  },
  {
    name: "Page B",
    "Кол-во проданных товаров": 3000,
  },
  {
    name: "Page C",
    "Кол-во проданных товаров": 2000,
  },
  {
    name: "Page D",
    "Кол-во проданных товаров": 2780,
  },
  {
    name: "Page E",
    "Кол-во проданных товаров": 1890,
  },
  {
    name: "Page F",
    "Кол-во проданных товаров": 2390,
  },
  {
    name: "Page G",
    "Кол-во проданных товаров": 3490,
  },
];

export class ItemsChart extends PureComponent {
  render() {
    return (
      <Box
        style={{
          maxWidth: 600,
          border: `solid 2px ${BORDER_COLOUR}`,
          borderRadius: 8,
          padding: "16px 20px 8px 0",
          backgroundColor: WHITE,
        }}
      >
        <LineChart width={550} height={450} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Кол-во проданных товаров"
            stroke="#8884d8"
            strokeWidth={2}
            /* eslint-disable-next-line id-length */
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </Box>
    );
  }
}
