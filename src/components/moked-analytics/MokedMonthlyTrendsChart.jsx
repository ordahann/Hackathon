import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { getMonthlyTrends } from "../../api";

const MokedMonthlyTrendsChart = () => {
  const [data, setData] = useState([]);

  // when the component loads activate the API call
  useEffect(() => {
    getMonthlyTrends("department")
      .then(setData)
      .catch((err) => console.error("Error fetching monthly trends:", err));
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4">מגמות חודשיות: אחוז חריגות וממוצע משך טיפול</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="month" stroke="#D1D5DB" />
          <YAxis stroke="#D1D5DB" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg_overdue_percentage" name="אחוז חריגות" stroke="#EF4444" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="avg_time_hours" name="ממוצע זמן טיפול (שעות)" stroke="#3B82F6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MokedMonthlyTrendsChart;
