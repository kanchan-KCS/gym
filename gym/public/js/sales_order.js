frappe.ui.form.on("Sales Order Item", {
  view_stock_availability: (frm, cdt, cdn) => {
    if (!frm.is_new()) {
      const row = locals[cdt][cdn];
      const qty = get_qty(row);
      if (qty != "error") render_dialog(row, qty);
    }
  },
});
const render_dialog = (row, qty) => {
  const d = new frappe.ui.Dialog({
    title: "Stock Detail",
    fields: [
      {
        label: "",
        fieldname: "",
        fieldtype: "HTML",
        options: get_options(row, qty),
      },
    ],
  });

  d.show();
  d.$wrapper.find(".standard-actions").hide();
};

const get_options = (row, qty) => {
  const html = `<div class="container-fluid">
          <div class="table-responsive" id="tab">
          <table class="table table-bordered   table-hover">
            <thead>
                <tr>
                    <th class="text-center"><input type="checkbox" ></th>
                    <th>Warehouse</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>
            <tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>${row.warehouse}</td>
            <td>${qty[0]["actual_qty"]}</td>
            </tr>
            </tbody></table></div>
            <div>`;
  return html;
};

const get_qty = (row) => {
  let qty = null;
  frappe.call({
    method: "gym.api.get_stock_qty",
    async: 0,
    args: {
      warehouse: row.warehouse,
      item_code: row.item_code,
    },
    callback: (r) => {
      if (r.message) {
        qty = r.message;
      }
    },
  });
  return qty;
};
