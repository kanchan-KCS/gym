# Copyright (c) 2023, Gym and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
	columns, data = [], []
	selected_type=filters.get('group_by')
	columns=fetch_columns(selected_type)
	data=fetch_data(selected_type)
	return columns, data

def fetch_columns(selected_type):
	columns = [
		{
			'fieldname': 'customer',
			'fieldtype': 'Data',
			'label': 'Customer',
			'width': 150
		},
		{
			'fieldname': 'item_code',
			'fieldtype': 'Data',
			'label': 'Item Code',
			'width': 150
		},
		{
			'fieldname': 'qty',
			'fieldtype': 'Int',
			'label': 'QTY',
			'width': 150
		},
		{
			'fieldname': 'selling_amount',
			'fieldtype': 'Currency',
			'label': 'Selling Amount',
			'width': 150
		},
		{
			'fieldname': 'buying_amount',
			'fieldtype': 'Currency',
			'label': 'Buying Amount',
			'width': 150
		},
		{
			'fieldname': 'gross_profit',
			'fieldtype': 'Currency',
			'label': 'Gross Profit',
			'width': 100,
		},
		{
			'fieldname': 'gross_profit_percentage',
			'fieldtype': 'Percent',
			'label': 'Gross Profit Percentage',
			'width': 150,
		}
	]
	if selected_type=='Invoice':
		col={
			'fieldname': 'sales_invoice',
			'fieldtype': 'Link',
			'label': 'Sales Invoice',
			'width': 150,
			'options':'Sales Invoice'
			}
		columns.insert(0,col)
	else:
		col={
			'fieldname': 'delivery_note',
			'fieldtype': 'Link',
			'label': 'Delivery Note',
			'width': 150,
			'options':'Delivery Note'
			}
		columns.insert(0,col)
	return columns


def fetch_data(selected_values):
	try:
		if selected_values== "Invoice":
			sql=f"select distinct si.name as sales_invoice ,customer,sii.qty as qty,sii.item_code as item_code,sii.amount as selling_amount, (PII.rate * sii.qty) as buying_amount,(sii.amount - (PII.rate * sii.qty)) as gross_profit,((sii.amount-(PII.rate * sii.qty))/(PII.rate * sii.qty))*100 as gross_profit_percentage from `tabSales Invoice`  as si  inner join `tabSales Invoice Item` as sii on si.name = sii.parent inner join `tabPurchase Invoice Item` as PII on PII.item_code=sii.item_code order by sales_invoice asc  "
			data= frappe.db.sql(sql, as_dict=1)
			return data
		else:
			sql=f"select distinct DN.name as delivery_note,customer,DNI.qty as qty,DNI.item_code as item_code,DNI.amount as selling_amount,(PII.rate * DNI.qty) as buying_amount,(DNI.amount - (PII.rate * DNI.qty)) as gross_profit,((DNI.amount-(PII.rate * DNI.qty))/(PII.rate * DNI.qty))*100 as gross_profit_percentage from `tabDelivery Note` as DN inner join `tabDelivery Note Item` as DNI on DN.name=DNI.parent inner join `tabPurchase Invoice Item` as PII on PII.item_code=DNI.item_code order by delivery_note asc "
			data =frappe.db.sql(sql, as_dict=1)
			return data
	except Exception as e:
		frappe.msgprint(e, 'Employment History: Get Condition Error')

  
 