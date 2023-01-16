# Copyright (c) 2023, Gym and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class RatingsandReview(Document):
	pass
@frappe.whitelist(allow_guest=False)
def customer_details(doctype, txt, searchfield, page_len, start, filters):
	name=filters.get('currect_user')
	if name:
		sql=f'select name from `tabEmployee` where user_id in (select allocated_to from `tabToDo` where reference_name="{name}")'
		return frappe.db.sql(sql)