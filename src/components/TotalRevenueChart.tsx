"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", profit: 100000, loss: 70000 },
  { name: "Feb", profit: 85000, loss: 65000 },
  { name: "Mar", profit: 87000, loss: 30000 },
  { name: "Apr", profit: 90000, loss: 100000 },
  { name: "May", profit: 82000, loss: 60000 },
  { name: "Jun", profit: 50000, loss: 30000 },
  { name: "Jul", profit: 75000, loss: 40000 },
  { name: "Aug", profit: 88000, loss: 60000 },
  { name: "Sep", profit: 80000, loss: 50000 },
];

export default function TotalRevenueChart() {
  return (
    <div className="bg-[#2E2E48] p-5 rounded-lg text-white w-full max-w-[635px] h-[320px]">
      <div className="mb-4">
        <h2 className="text-sm font-medium">Total Revenue</h2>
        <div className="text-2xl font-bold mt-1">$50.4K</div>
        <div className="text-green-400 text-sm mt-1 flex items-center">
          <span className="mr-1">▲</span> 5% than last month
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={20}>
          <XAxis dataKey="name" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip />   
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ color: "#bf2121" }}
          />
          <Bar dataKey="profit" fill="#4f46e5" name="Profit" />
          <Bar dataKey="loss" fill="#E3E7FC" name="Loss" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
