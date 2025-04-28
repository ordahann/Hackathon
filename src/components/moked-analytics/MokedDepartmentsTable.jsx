const MokedDepartmentsTable = ({ data }) => {
    // sort departments by overdue precentage decending
    const sortedData = [...data].sort((a, b) => {
      const totalA = a.closed_on_time + a.closed_overdue;
      const overdueRateA = totalA ? (a.closed_overdue / totalA) : 0;
  
      const totalB = b.closed_on_time + b.closed_overdue;
      const overdueRateB = totalB ? (b.closed_overdue / totalB) : 0;
  
      return overdueRateB - overdueRateA;
    });
  
    return (
      <div className="p-4 bg-gray-800 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">דירוג אגפים לפי אחוז חריגות</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden text-sm text-left">
            <thead>
              <tr className="text-gray-300 uppercase bg-gray-600">
                <th className="px-4 py-3">אגף</th>
                <th className="px-4 py-3">פניות פתוחות</th>
                <th className="px-4 py-3">פניות סגורות בזמן</th>
                <th className="px-4 py-3">פניות סגורות בחריגה</th>
                <th className="px-4 py-3">% חריגות</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, idx) => {
                const totalClosed = item.closed_on_time + item.closed_overdue;
                const overduePercentage = totalClosed ? ((item.closed_overdue / totalClosed) * 100).toFixed(2) : "0.00";
  
                return (
                  <tr key={idx} className="border-t border-gray-600 hover:bg-gray-600">
                    <td className="px-4 py-2">{item.department}</td>
                    <td className="px-4 py-2">{item.open_tickets}</td>
                    <td className="px-4 py-2">{item.closed_on_time}</td>
                    <td className="px-4 py-2">{item.closed_overdue}</td>
                    <td className={`px-4 py-2 ${overduePercentage >= 20 ? "text-red-400" : "text-green-400"}`}>
                      {overduePercentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default MokedDepartmentsTable;
  