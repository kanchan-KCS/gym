// Copyright (c) 2023, Gym and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Gross Profit Report"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company"),
			"reqd": 1
		},
		{
			"fieldname": "group_by",
			"label": __("Group By"),
			"fieldtype": "Select",
			"options": "Invoice\nDelivery Note",
			"default": "Invoice"
		},
	]
}
