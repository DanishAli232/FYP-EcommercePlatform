import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels1 = [
  { year: "January", amount: 10000 },
  { year: "February", amount: 20000 },
  { year: "March", amount: 30000 },
  { year: "April", amount: 40000 },
  { year: "May", amount: 50000 },
  { year: "June", amount: 24000 },
  { year: "July", amount: 80000 },
];

const labels = ["J", "F", "M", "A", "M", "J", "J"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "",
      data: labels1.map((item) => item.amount),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export function LineChart() {
  return (
    <Line
      options={options}
      data={data}
      style={{ width: "100%", height: "350px" }}
    />
  );
}
