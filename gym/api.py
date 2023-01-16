import frappe


@frappe.whitelist()
def get_stock_qty(item_code):
    try:
        stock_qty = frappe.db.sql(
            """ select actual_qty from `tabBin` where warehouse = "{0}" and item_code="{1}" limit 1 """.format(warehouse, item_code), as_dict=1)
        
        return stock_qty[0]['actual_qty'] if stock_qty else 0
    except Exception as stock_error:
        frappe.log_error(frappe.utils.get_traceback(
            stock_error), 'stock_error')
        return "error"
