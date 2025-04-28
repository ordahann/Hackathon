import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";



const MokedOverdueChart = ({ data }) => {
    // sort by top 5 inefficient depts
    const sortedData = [...data]
    .sort((a, b) => b.avg_overdue_percentage - a.avg_overdue_percentage)
    .slice(0, 5);

    return (
        <div className="p-4 bg-gray-800 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">אחוז חריגות לפי אגף</h3>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="department" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip />
            <Bar dataKey="avg_overdue_percentage" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

export default MokedOverdueChart;
