'use client'; // if you're using it in Next.js App Router

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CompanyGraphProps {
  registeredCompanies: number;
  totalCompanies: number;
  color: string;
}

const CompanyGraph: React.FC<CompanyGraphProps> = ({
  registeredCompanies,
  totalCompanies,
  color
}) => {
  const remainingCompanies = totalCompanies - registeredCompanies;

  const chartData = {
    datasets: [
      {
        data: [registeredCompanies, remainingCompanies],
        backgroundColor: ['#ffffff', `${color}`],
         borderWidth: 0,
        // hoverBackgroundColor: ["#717171", "#7b7b7b"],
      },
    ],
  };

  return (
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  align: "center",
                  labels: {
                    boxWidth: 0,
                    color: '#475BE8',
                  },
                },
                tooltip: {
                  enabled: false,
                },
              },
            }}
          />
  );
};

export default CompanyGraph;
