// Copyright (c) 2023, Gym and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Revenue Report"] = {
  filters: [
    {
      fieldname: "month",
      label: __("Month"),
      fieldtype: "Select",
      reqd: 1,
      options: [
        { value: 1, label: __("Jan") },
        { value: 2, label: __("Feb") },
        { value: 3, label: __("Mar") },
        { value: 4, label: __("Apr") },
        { value: 5, label: __("May") },
        { value: 6, label: __("June") },
        { value: 7, label: __("July") },
        { value: 8, label: __("Aug") },
        { value: 9, label: __("Sep") },
        { value: 10, label: __("Oct") },
        { value: 11, label: __("Nov") },
        { value: 12, label: __("Dec") },
      ],
      default:
        frappe.datetime.str_to_obj(frappe.datetime.get_today()).getMonth() + 1,
    },
    {
      fieldname: "customer",
      label: __("Customer"),
      fieldtype: "Link",
      options: "Customer",
    },
    {
      fieldname: "company",
      label: __("Company"),
      fieldtype: "Link",
      options: "Company",
      default: frappe.defaults.get_user_default("Company"),
    },
    {
      fieldname: "mode_of_payment",
      label: __("Mode of Payment"),
      fieldtype: "Link",
      options: "Mode of Payment",
    },
    {
      fieldname: "owner",
      label: __("Owner"),
      fieldtype: "Link",
      options: "User",
    },
    {
      fieldname: "cost_center",
      label: __("Cost Center"),
      fieldtype: "Link",
      options: "Cost Center",
    },
    {
      fieldname: "warehouse",
      label: __("Warehouse"),
      fieldtype: "Link",
      options: "Warehouse",
    },
    {
      fieldname: "brand",
      label: __("Brand"),
      fieldtype: "Link",
      options: "Brand",
    },
    {
      fieldname: "item_group",
      label: __("Item Group"),
      fieldtype: "Link",
      options: "Item Group",
    },
  ],
};

erpnext.utils.add_dimensions("Sales Register", 7);
