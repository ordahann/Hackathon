const BASE_URL = "http://127.0.0.1:5000/api";

// build query params
function buildQueryParams(groupBy = "department", startDate = null, endDate = null) {
    const params = new URLSearchParams();
    params.append("group_by", groupBy);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    return params.toString();
}  

// fetch all tickets by dept/all dept
export async function getTicketsByEntity(groupBy = "department", startDate = null, endDate = null) {
    const response = await fetch(`${BASE_URL}/tickets-by-entity?${buildQueryParams(groupBy, startDate, endDate)}`);
    if (!response.ok) throw new Error("Failed to fetch tickets by entity");
    return response.json();
}

// fetch overdue by dept/sub dept analysis
export async function getOverdueAnalysis(groupBy = "department", startDate = null, endDate = null) {
    const response = await fetch(`${BASE_URL}/overdue-analysis?${buildQueryParams(groupBy, startDate, endDate)}`);
    if (!response.ok) throw new Error("Failed to fetch overdue analysis");
    return response.json();
}

// fetch workload vs overdues by dept/sub dept
export async function getWorkloadVsOverdue(groupBy = "department", startDate = null, endDate = null) {
    const response = await fetch(`${BASE_URL}/workload-vs-overdue?${buildQueryParams(groupBy, startDate, endDate)}`);
    if (!response.ok) throw new Error("Failed to fetch workload vs overdue");
    return response.json();
}

// fetch monthly trend by dept/sub dept
export async function getMonthlyTrends(groupBy = "department", startDate = null, endDate = null) {
    const response = await fetch(`${BASE_URL}/monthly-trends?${buildQueryParams(groupBy, startDate, endDate)}`);
    if (!response.ok) throw new Error("Failed to fetch monthly trends");
    return response.json();
}

// fetch current state of dept/sub dept
export async function getSummaryStatus(groupBy = "department", startDate = null, endDate = null) {
    const response = await fetch(`${BASE_URL}/summary-status?${buildQueryParams(groupBy, startDate, endDate)}`);
    if (!response.ok) throw new Error("Failed to fetch summary status");
    return response.json();
}

// fetch tickets and overduetickest 
export async function getMonthlyTicketsAndOverdues(startDate = null, endDate = null) {
    const params = new URLSearchParams();
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
  
    const response = await fetch(`${BASE_URL}/monthly-tickets-and-overdues?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch monthly tickets and overdues");
    return response.json();
}