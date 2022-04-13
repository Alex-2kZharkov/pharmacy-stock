import React, { PureComponent } from "react";

import {
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  Line,
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv11: 4000,
    pv11: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv11: 3000,
    pv11: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv11: 2000,
    pv11: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv11: 2780,
    pv11: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv11: 1890,
    pv11: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv11: 2390,
    pv11: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv11: 3490,
    pv11: 4300,
    amt: 2100,
  },
];

export class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="30%" height="35%">
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv11"
            stroke="#8884d8"
            strokeWidth={2}
            /* eslint-disable-next-line id-length */
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv11" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
