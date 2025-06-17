

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function WatchHoursChart({data}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="hours" fill="#6C63FF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WatchHoursChart;
