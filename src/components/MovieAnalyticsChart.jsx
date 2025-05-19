// components/MovieAnalyticsChart.jsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { genre: "Action", count: 10 },
  { genre: "Comedy", count: 6 },
  { genre: "Drama", count: 4 },
  { genre: "Fantasy", count: 2 },
  { genre: "Horror", count: 1 },
];

function MovieAnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="genre" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="count" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MovieAnalyticsChart;
