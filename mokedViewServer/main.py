from processing.data_analysis_employee import load_data, get_employees_closed_tickets_count, get_employees_closed_tickets_percentage_from_all_closed_tickets, get_employees_total_tickets_count, get_employees_total_tickets_percentage_from_all_tickets, get_current_tickets_status, get_employees_on_time_percentage, get_employees_overdue_percentage, get_employees_avg_handling_time, get_top_n_employees_scores,calculate_employee_z_scores_from_data

if __name__ == "__main__":
    df = load_data()

    # בחרי מחלקה ואגף לדוגמה
    department = 'אגף קהילה ויישובים'
    sub_department = 'מחלקת המרכז הקהילתי'
    start_date = '2020-01-01'
    end_date = '2024-03-31'

    
    print("get_employees_closed_tickets_count:")
    result_get_employees_closed_tickets_count = get_employees_closed_tickets_count(df, department, sub_department, start_date, end_date)
    print(result_get_employees_closed_tickets_count)

    print("get_employees_closed_tickets_percentage_from_all_closed_tickets:")
    result_get_employees_closed_tickets_percentage_from_all_closed_tickets = get_employees_closed_tickets_percentage_from_all_closed_tickets(df, department, sub_department, start_date, end_date)
    print(result_get_employees_closed_tickets_percentage_from_all_closed_tickets)

    print("get_employees_total_tickets_count:")
    result_get_employees_total_tickets_count = get_employees_total_tickets_count(df, department, sub_department, start_date, end_date)
    print(result_get_employees_total_tickets_count)
    
    print("get_employees_total_tickets_percentage_from_all_tickets:")
    result_get_employees_total_tickets_percentage_from_all_tickets = get_employees_total_tickets_percentage_from_all_tickets(df, department, sub_department, start_date, end_date)
    print(result_get_employees_total_tickets_percentage_from_all_tickets)

    print("get_current_tickets_status:")
    result_get_current_tickets_status = get_current_tickets_status(df, department, sub_department, start_date, end_date)
    print(result_get_current_tickets_status)

    print("get_employees_on_time_percentage:")
    result_get_employees_on_time_percentage = get_employees_on_time_percentage(df, department, sub_department, start_date, end_date)
    print(result_get_employees_on_time_percentage)

    
    print("get_employees_overdue_percentage:")
    result_get_employees_overdue_percentage = get_employees_overdue_percentage(df, department, sub_department, start_date, end_date)
    print(result_get_employees_overdue_percentage)

    print("get_employees_avg_handling_time:")
    result_get_employees_avg_handling_time = get_employees_avg_handling_time(df, department, sub_department, start_date, end_date)
    print(result_get_employees_avg_handling_time)
  
    
    print("get_top_n_employees_scores:")
    result_get_top_n_employees_scores = get_top_n_employees_scores(df, department, sub_department, start_date, end_date)
    print(result_get_top_n_employees_scores)

    print("calculate_employee_z_scores_from_data:")
    result_calculate_employee_z_scores_from_data = calculate_employee_z_scores_from_data(df, department, sub_department, start_date, end_date)
    print(result_calculate_employee_z_scores_from_data)
   
