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
            is_exist = frappe.db.sql("""SELECT email_id FROM `tabCustomer` WHERE name=%s""",name, as_dict=True)
            if not is_exist:
                cust = frappe.new_doc("Customer")
                cust.customer_name = first_name
                cust.customer_group='All Customer Groups'
                cust.territory='All Territories'
                cust.save(ignore_permissions=True)
        except:
            pass


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
