import { Box } from "@mui/material";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useStyles } from "./IncomeChart.styles";

export const IncomeChart = () => {
  const classes = useStyles();
  const data = [
    {
      name: "Page A",
      Прибыль: 4000,
      Расход: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      Прибыль: 3000,
      Расход: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      Прибыль: 2000,
      Расход: 9800,
      amt: 2290,
    },
  ];

  return (
    <Box className={classes.root}>
      <AreaChart
        width={550}
        height={450}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Прибыль"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
          strokeWidth={2}
          /* eslint-disable-next-line id-length */
          activeDot={{ r: 8 }}
        />
        <Area
          type="monotone"
          dataKey="Расход"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
          strokeWidth={2}
          /* eslint-disable-next-line id-length */
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </Box>
  );
};
