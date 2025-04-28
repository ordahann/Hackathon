import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Users, AlertTriangle, Clock, BarChart2 } from "lucide-react";

// import the fetch funcs that activate the API
import { getTicketsByEntity, getOverdueAnalysis, getSummaryStatus, getMonthlyTrends } from "../api";

// import the components
import MokedOverdueChart from "../components/moked-analytics/MokedOverdueChart";
import MokedMonthlyTrendsChart from "../components/moked-analytics/MokedMonthlyTrendsChart";
import MokedDepartmentsTable from "../components/moked-analytics/MokedDepartmentsTable";

const MokedMainDashboard = () => {

    // states to hold the data
    const [ticketsData, setTicketsData] = useState([]);
    const [overdueData, setOverdueData] = useState([]);
    const [summaryStatus, setSummaryStatus] = useState([]);

    // call the API once the page is loading
    useEffect(() => {
        getTicketsByEntity("department").then(setTicketsData);
        getOverdueAnalysis("department").then(setOverdueData);
        getSummaryStatus("department").then(setSummaryStatus);
    }, []);

    useEffect(() => {
        getTicketsByEntity("department").then((res) => {
          console.log("Tickets data:", res); // <- מה מופיע כאן?
          setTicketsData(res);
        });
        getOverdueAnalysis("department").then((res) => {
          console.log("Overdue data:", res); // <- וגם כאן!
          setOverdueData(res);
        });
        getSummaryStatus("department").then((res) => {
          console.log("Summary status:", res); // <- וגם כאן!
          setSummaryStatus(res);
        });
      }, []);
      

    // calc the sums and averages to show them in StatCards
    const totalTickets = ticketsData.reduce((sum, item) => sum + item.total_tickets, 0);
    const totalOverdue = overdueData.reduce((sum, item) => sum + (item.avg_overdue_percentage || 0), 0) / (overdueData.length || 1);

    return (
        <div className="flex-1 overflow-auto relative z-10">
          <Header title="דשבורד מנהל המוקד / המועצה" />
    
          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
            {/* STAT CARDS */}
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard name="סה״כ פניות" icon={Users} value={totalTickets.toLocaleString()} color="#6366F1" />
              <StatCard name="אחוז חריגות ממוצע" icon={AlertTriangle} value={`${totalOverdue.toFixed(2)}%`} color="#EF4444" />
              <StatCard name="פניות פתוחות" icon={Clock} value={summaryStatus.reduce((sum, item) => sum + item.open_tickets, 0)} color="#F59E0B" />
              <StatCard name="פניות סגורות בזמן" icon={BarChart2} value={summaryStatus.reduce((sum, item) => sum + item.closed_on_time, 0)} color="#10B981" />
            </motion.div>
    
            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <MokedOverdueChart data={overdueData} />
              <MokedMonthlyTrendsChart />
            </div>
    
            {/* TABLE */}
            <MokedDepartmentsTable data={summaryStatus} />
          </main>
        </div>
    );
};

export default MokedMainDashboard;