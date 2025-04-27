import pandas as pd

# load the data csv and return DataFrame                   
def load_data(filepath='mokedViewServer/data/data_filled.csv'):
    df = pd.read_csv(filepath)
    return df


def get_top_employees_by_tickets(df, department, sub_department, start_date, end_date):
    """
    מחזיר רשימה של עובדים עם כמות הפניות שנסגרו בפועל במחלקה מסוימת ובטווח תאריכים מוגדר.
    פנייה נחשבת סגורה אם יש לה ערך ב־closed_date (לא null).

    Args:
        df (pd.DataFrame): טבלת הנתונים.
        department (str): שם האגף.
        sub_department (str): שם המחלקה.
        start_date (str): תאריך התחלה בפורמט 'YYYY-MM-DD'.
        end_date (str): תאריך סיום בפורמט 'YYYY-MM-DD'.

    Returns:
        pd.DataFrame: טבלה עם שם העובד וכמות הפניות שנסגרו.
    """
    # המרת opened_date ו- closed_date לפורמט datetime אם עדיין לא מומש
    if df['opened_date'].dtype != 'datetime64[ns]':
        df['opened_date'] = pd.to_datetime(df['opened_date'], dayfirst=False, errors='coerce')
    if df['closed_date'].dtype != 'datetime64[ns]':
        df['closed_date'] = pd.to_datetime(df['closed_date'], dayfirst=False, errors='coerce')

    # סינון לפי אגף, מחלקה, טווח תאריכים, עובד לא ריק, ויש closed_date (פנייה סגורה)
    filtered_df = df[
        (df['department'] == department) &
        (df['sub_department'] == sub_department) &
        (df['employee'].notnull()) &
        (df['closed_date'].notnull()) &
        (df['opened_date'] >= pd.to_datetime(start_date)) &
        (df['opened_date'] <= pd.to_datetime(end_date))
    ]

    # ספירת פניות שנסגרו לכל עובד
    tickets_per_employee = (
        filtered_df.groupby('employee')
        .size()
        .reset_index(name='tickets_handled')
        .sort_values(by='tickets_handled', ascending=False)
    )

    return tickets_per_employee
