import frappe

def cust_creation(self,method):
    if frappe.db.exists("Has Role", {"parent": self.name, "role": 'Customer'}):
        first_name=self.first_name
        name=self.name
        create_cust(first_name,name)
    if frappe.db.exists("Has Role", {"parent": self.name, "role": 'Employee'}):
        doc=self.first_name
        email_id=self.name
        create_emp(doc,email_id)


def create_cust(first_name,name):
    if first_name:
        try:
            exist=frappe.db.exists({"doctype": "Customer", "gym_member_email": name})
            if not exist:
                cust = frappe.new_doc("Customer")
                cust.customer_name = first_name
                cust.customer_group='All Customer Groups'
                cust.territory='All Territories'
                cust.gym_member_email=name
                cust.save(ignore_permissions=True)
                # Creating User Permission on creation of customer
                usr_perm=frappe.new_doc('User Permission')
                usr_perm.user=name
                usr_perm.allow='Customer'
                usr_perm.for_value=first_name
                usr_perm.apply_to_all_doctypes=1
                usr_perm.save()
        except Exception as e:
            frappe.log_error(e,'exception customer creation')


def create_emp(doc,email_id):
    if doc:
        try:
            exist=frappe.db.exists({"doctype": "Employee", "user_id": email_id})
            if not exist:
                emp = frappe.new_doc("Employee")
                emp.first_name = doc
                emp.user_id=email_id
                emp.create_user_permission=1
                emp.flags.ignore_mandatory = True
                emp.save(ignore_permissions=True)
        except:
            pass
