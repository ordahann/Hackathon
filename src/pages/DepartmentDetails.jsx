import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";

import {
  getEmployeesClosedTickets,
  getEmployeesOverduePercentage,
  getEmployeesAvgHandlingTime,
  getEmployeesTotalTickets,
  getEmployeesOnTimePercentage,
} from "../api";

import StatCard from "../components/common/StatCard";
import { Users, CheckCircle, AlertTriangle, Clock } from "lucide-react";

import EmployeesClosedTicketsBarChart from "../components/moked-analytics/EmployeesClosedTicketsBarChart";
import OverduePieChart from "../components/moked-analytics/OverduePieChart";
import TopEmployeesList from "../components/moked-analytics/TopEmployeesList";

const DepartmentDetails = () => {
  const { departmentName } = useParams();
  const navigate = useNavigate();

  const [subDepartments, setSubDepartments] = useState([]);
  const [selectedSubDepartment, setSelectedSubDepartment] = useState("");

  const [employeesData, setEmployeesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalTickets: 0,
    closedTickets: 0,
    avgOverdue: 0,
    avgHandlingTime: 0,
    onTimePercentage: 0,
  });

  // טעינת המחלקות מה־CSV
  useEffect(() => {
    if (departmentName) {
      setLoading(true);
      setError("");
      Papa.parse("/data/DEPT_LIST.csv", {
        download: true,
        header: true,
        complete: (result) => {
          const filtered = result.data.filter((item) => item.department === departmentName);
          const uniqueSubDepartments = Array.from(
            new Set(filtered.map((item) => item.sub_department))
          ).map((uniqueName) =>
            filtered.find((item) => item.sub_department === uniqueName)
          );
          setSubDepartments(uniqueSubDepartments);
          setLoading(false);
        },
        error: (err) => {
          console.error("Error loading CSV:", err);
          setError("שגיאה בטעינת רשימת המחלקות.");
          setLoading(false);
        },
      });
    }
  }, [departmentName]);

  // טעינת הנתונים לעובדים (מיזוג בלי getEmployeesPerformanceTable)
  useEffect(() => {
    if (selectedSubDepartment) {
      const startDate = "2023-10-01";
      const endDate = new Date().toISOString().slice(0, 10);

      Promise.all([
        getEmployeesTotalTickets(departmentName, selectedSubDepartment, startDate, endDate),
        getEmployeesClosedTickets(departmentName, selectedSubDepartment, startDate, endDate),
        getEmployeesOverduePercentage(departmentName, selectedSubDepartment, startDate, endDate),
        getEmployeesAvgHandlingTime(departmentName, selectedSubDepartment, startDate, endDate),
        getEmployeesOnTimePercentage(departmentName, selectedSubDepartment, startDate, endDate),
      ])
        .then(([totalTicketsData, closedTicketsData, overdueData, handlingTimeData, onTimeData]) => {
          const totalTickets = totalTicketsData.reduce((sum, emp) => sum + (emp.total_tickets || 0), 0);
          const closedTickets = closedTicketsData.reduce((sum, emp) => sum + (emp.tickets_handled || 0), 0);
          const avgOverdue = overdueData.reduce((sum, emp) => sum + (emp.overdue_percentage || 0), 0) / (overdueData.length || 1);
          const avgHandlingTime = handlingTimeData.reduce((sum, emp) => sum + (emp.avg_handling_time_hours || 0), 0) / (handlingTimeData.length || 1);
          const avgOnTime = onTimeData.reduce((sum, emp) => sum + (emp.on_time_percentage || 0), 0) / (onTimeData.length || 1);

          setStats({
            totalTickets,
            closedTickets,
            avgOverdue,
            avgHandlingTime,
            onTimePercentage: avgOnTime,
          });

          // חיבור העובדים עם הנתונים מכל ה־APIים:
          const employeesMap = {};

          totalTicketsData.forEach(emp => {
            employeesMap[emp.employee] = { employee: emp.employee, total_tickets: emp.total_tickets };
          });

          closedTicketsData.forEach(emp => {
            if (employeesMap[emp.employee]) {
              employeesMap[emp.employee].tickets_handled = emp.tickets_handled;
            }
          });

          overdueData.forEach(emp => {
            if (employeesMap[emp.employee]) {
              employeesMap[emp.employee].overdue_percentage = emp.overdue_percentage;
            }
          });

          handlingTimeData.forEach(emp => {
            if (employeesMap[emp.employee]) {
              employeesMap[emp.employee].avg_handling_time_hours = emp.avg_handling_time_hours;
            }
          });

          onTimeData.forEach(emp => {
            if (employeesMap[emp.employee]) {
              employeesMap[emp.employee].on_time_percentage = emp.on_time_percentage;
            }
          });

          const mergedData = Object.values(employeesMap);
          setEmployeesData(mergedData);
        })
        .catch((err) => console.error("Error fetching employee data:", err));
    }
  }, [selectedSubDepartment]);

  if (loading) {
    return <div className="p-6 text-center text-gray-300">טוען מחלקות...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full h-full overflow-auto p-6 text-center z-10 text-center relative">
      <div className="absolute top-6 right-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          חזרה
        </button>
      </div>

      <h1 className="text-3xl mt-10 mb-8 font-bold text-center">{departmentName}</h1>

      {subDepartments.length > 0 ? (
        <select
          className="p-2 rounded bg-gray-800 text-white border border-gray-600 text-center"
          value={selectedSubDepartment}
          onChange={(e) => setSelectedSubDepartment(e.target.value)}
        >
          <option disabled value="">בחר מחלקה</option>
          {subDepartments.map((item, idx) => (
            <option key={idx} value={item.sub_department}>
              {item.sub_department}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-gray-400 text-center mt-4">אין מחלקות זמינות לאגף זה.</p>
      )}

      {selectedSubDepartment && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 mt-8">
            <StatCard name="סה״כ פניות" icon={Users} value={stats.totalTickets.toLocaleString()} color="#6366F1" />
            <StatCard name="סה״כ פניות סגורות" icon={CheckCircle} value={stats.closedTickets.toLocaleString()} color="#10B981" />
            <StatCard name="אחוז חריגות ממוצע" icon={AlertTriangle} value={`${stats.avgOverdue.toFixed(2)}%`} color="#EF4444" />
            <StatCard name="משך טיפול ממוצע (שעות)" icon={Clock} value={`${stats.avgHandlingTime.toFixed(2)}`} color="#F59E0B" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <EmployeesClosedTicketsBarChart data={employeesData} />
            <OverduePieChart data={employeesData} />
          </div>

          <div className="mt-8">
            <TopEmployeesList data={employeesData} />
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentDetails;
