import frappe


@frappe.whitelist()
def get_stock_qty(item_code):
    try:
        stock_qty = frappe.db.sql(
            """ select actual_qty,warehouse from `tabBin` where item_code="{0}"   """.format(item_code), as_dict=1)
        return stock_qty
    except Exception as stock_error:
        frappe.log_error(frappe.utils.get_traceback(
            stock_error), 'stock_error')
        return "error"
