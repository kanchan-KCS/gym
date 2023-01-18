# Copyright (c) 2023, Gym and Contributors
# See license.txt

import frappe
from frappe.tests.utils import FrappeTestCase

activity='Dance'

class TestBookClass(FrappeTestCase):
	def test_book_class_creation(self):
		self.create_basic_data()
	def test_book_class_customer(self):
		b_class,customer=self.create_basic_data()
		book_class=frappe.get_doc('Book Class',b_class)
		cust=frappe.get_doc('Customer',customer)
		self.assertEqual(book_class.customer_name,cust.name)

	def create_basic_data(self):
		customer=frappe.new_doc('Customer')
		customer.customer_name='Kanchan'
		customer.flags.ignore_mandatory = True
		customer.save()
		if not frappe.db.exists('Activity Type',activity):
			act=frappe.new_doc('Activity Type')
			act.activity_type=activity
			act.from_time='04:35:36'
			act.to_time='05:35:36'
			act.save()
		book_class=frappe.new_doc('Book Class')
		book_class.customer_name='Kanchan'
		book_class.append("book_group_classes",{
                "class_name":activity,
					"date":"2023-01-01",
					"from_time":'04:35:36',
					"to_time":'05:35:36'
            })
		book_class.save()
		return book_class.name,customer.name
		
