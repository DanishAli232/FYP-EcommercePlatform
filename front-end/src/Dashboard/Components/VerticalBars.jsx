import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
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
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["J", "F", "M", "A", "M", "J", "J"];

const labels1 = [
  { year: "January", amount: 10000 },
  { year: "February", amount: 20000 },
  { year: "March", amount: 30000 },
  { year: "April", amount: 40000 },
  { year: "May", amount: 50000 },
  { year: "June", amount: 24000 },
  { year: "July", amount: 80000 },
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels1.map((item) => item.amount),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // {
    //   label: 'Dataset 2',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

export function VerticalBars() {
  return (
    <Bar
      options={options}
      data={data}
      style={{ height: "576px !important", width: "227px" }}
    />
  );
}
