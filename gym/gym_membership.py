import frappe
from datetime import date,datetime
@frappe.whitelist()
def check_membership(name):
    current_plan=frappe.db.sql('select SP.party,SP.start_date,SP.end_date,SP.status,SPD.plan from `tabSubscription` as SP inner join `tabSubscription Plan Detail` as SPD on SP.name=SPD.parent where SP.status="Active" and SP.party="{0}" ;'.format(name),as_dict=1)
    old_plan=frappe.db.sql('select SP.party,SP.start_date,SP.end_date,SP.status,SPD.plan from `tabSubscription` as SP inner join `tabSubscription Plan Detail` as SPD on SP.name=SPD.parent where SP.status="Completed" and SP.party="{0}" ;'.format(name),as_dict=1)
    gym_trainer=frappe.db.sql('select allocated_to from `tabToDo` where reference_name="{0}"'.format(name),as_dict=1)
    if current_plan:
        if gym_trainer:
            doc=frappe.get_doc('Employee',{'user_id':gym_trainer[0]['allocated_to']})
            if doc.emergency_phone_number:
                current_plan[0]['phone_number']=doc.emergency_phone_number
            current_plan[0]['gym_trainer']=doc.employee_name
            
    
        d1 = date.today()
        d1 = datetime.strptime(str(d1), "%Y-%m-%d")
        d2 = datetime.strptime(str(current_plan[0].end_date), "%Y-%m-%d")

        day_left = d2 - d1
        days=str(day_left.days)
        current_plan[0]['days_left']=days
    return current_plan,old_plan


@frappe.whitelist(allow_guest=False)
def get_item_val(doctype, txt, searchfield, page_len, start, filters):
    assign_locker=filters.get('assign_locker')
    if assign_locker==1:
        sql=''' select name from `tabItem` where name not in (select based_on_value from `tabParty Specific Item`)  and name like "Locker%" order by creation'''
    else:
        sql = ''' select name from `tabItem` where has_variants=1 '''
    return frappe.db.sql(sql)