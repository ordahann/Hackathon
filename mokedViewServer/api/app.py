from flask import Flask, jsonify, request
from processing.data_analysis import (
    load_data,
    tickets_by_entity,
    overdue_analysis_by_entity,
    workload_vs_overdue_by_entity,
    monthly_trends_by_entity,
    summary_status_by_entity
)

app = Flask(__name__)
df = load_data()

# Tickets by Entity
@app.route('/api/tickets-by-entity', methods=['GET'])
def api_tickets_by_entity():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    group_by = request.args.get('group_by', 'department')  # ברירת מחדל ל-department
    result = tickets_by_entity(df, group_by=group_by, start_date=start_date, end_date=end_date)
    return jsonify(result)

# Overdue Analysis
@app.route('/api/overdue-analysis', methods=['GET'])
def api_overdue_analysis():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    group_by = request.args.get('group_by', 'department')
    result = overdue_analysis_by_entity(df, group_by=group_by, start_date=start_date, end_date=end_date)
    return jsonify(result)

# Workload vs Overdue
@app.route('/api/workload-vs-overdue', methods=['GET'])
def api_workload_vs_overdue():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    group_by = request.args.get('group_by', 'department')
    result = workload_vs_overdue_by_entity(df, group_by=group_by, start_date=start_date, end_date=end_date)
    return jsonify(result)

# Monthly Trends
@app.route('/api/monthly-trends', methods=['GET'])
def api_monthly_trends():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    group_by = request.args.get('group_by', 'department')
    result = monthly_trends_by_entity(df, group_by=group_by, start_date=start_date, end_date=end_date)
    return jsonify(result)

# Summary Status
@app.route('/api/summary-status', methods=['GET'])
def api_summary_status():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    group_by = request.args.get('group_by', 'department')
    result = summary_status_by_entity(df, group_by=group_by, start_date=start_date, end_date=end_date)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)