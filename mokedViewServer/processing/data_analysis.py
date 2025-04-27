import pandas as pd

# load the data csv and return DataFrame                   
def load_data(filepath='mokedViewServer/data/data_filled.csv'):
    df = pd.read_csv(filepath)
    return df

# optional - filter by date (for each function)
def filter_by_date(df, start_date=None, end_date=None):
    if start_date and end_date:
        df['opened_date'] = pd.to_datetime(df['opend_date'])
        df = df[(df['opened_date'] >= pd.to_datetime(start_date)) & (df['opened_date'] <= pd.to_datetime(end_date))]
        return df

# calc tickets by dept
def tickets_by_department(df):
    return df.groupby(['department', 'sub_department']).size().reset_index(name='total_tickets')

# calc tickets by Sub_Dept
def tickets_by_sub_department(df):
    return df.groupby('sub_department').size().reset_index(name='total_tickets')

# calc overdue tickets percentage per Sub-Dept
def overdue_analysis(df):
    result = df.groupby('department').agg(
        total_tickets=('ticket_status', 'count'),
        overdue_tickets=('overdue_hours', lambda x: (x > 0).sum())
    ).reset_index()
    result['overdue_percentage'] = round((result['overdue_tickets'] / result['total_tickets']) * 100, 2)

# calc num of tickets opened (monthly)
def monthly_tickets(df):
    df['month'] = pd.to_date_time(df['opened_date']).dt.to_period('M').astype(str)
    return df.groupby('month').size().reset_index(name='total_tickets')
