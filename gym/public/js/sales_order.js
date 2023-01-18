frappe.ui.form.on("Sales Order", {
  refresh: (frm) => {
    if (!frm.is_new() && frm.doc.status != "Draft") {
      //  because button gets disappear after form submission
      for (let r in frm.doc.items) {
        const btn_wrapper = $(
          `<button  class="btn btn-xs input-sm btn-primary" style="height:24px;"data-name="${frm.doc.items[r].name}">View Stock Availability</button>`
        ).on("click", function (e) {
          disable_rendering_row(e, r);
        });
        frm.fields_dict["items"].grid.grid_rows[
          r
        ].columns.view_stock_availability.field_area.attr("style", "");
        frm.fields_dict["items"].grid.grid_rows[
          r
        ].columns.view_stock_availability.field_area.html(btn_wrapper);
      }
    }
  },
});
frappe.ui.form.on("Sales Order Item", {
  view_stock_availability: (frm, cdt, cdn) => {
    const row = locals[cdt][cdn];
    if (row.warehouse && row.item_code) {
      const qty = get_qty(row);
      if (qty != "error") render_dialog(row, qty);
    }
  },
  form_render: (frm, cdt, cdn) => {
    const row = locals[cdt][cdn];
    frm.fields_dict["items"].grid.grid_rows[
      row.idx - 1
    ].columns.view_stock_availability.field_area.attr("style", "");
  },
});
frappe.ui.form.on("Sales Order Item", {
  view_stock_availability: (frm, cdt, cdn) => {
    const row = locals[cdt][cdn];
    if (row.item_code) {
      const qty = get_qty(row);
      if (qty != "error" && qty.length>0) render_dialog(qty);
    }
  },
  form_render: (frm, cdt, cdn) => {
    const row = locals[cdt][cdn];
    frm.fields_dict["items"].grid.grid_rows[
      row.idx - 1
    ].columns.view_stock_availability.field_area.attr("style", "");
  },
});
const render_dialog = (qty) => {
  const d = new frappe.ui.Dialog({
    title: "Stock Detail",
    fields: [
      {
        label: "",
        fieldname: "",
        fieldtype: "HTML",
        options: get_options(qty),
      },
    ],
  });

  d.show();
  d.$wrapper.find(".standard-actions").hide();
};

const get_options = (qty) => {
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
            ${qty.map((q)=>`<tr>
            <td class="text-center"><input type="checkbox"></td>
            <td>${q.warehouse}</td>
            <td>${q.actual_qty}</td>
            </tr>`).join("")}
            
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
      item_code: row.item_code,
    },
    callback: (r) => {
      console.log(r.message,"r.message")
      if (r.message) {
        qty = r.message;
      }
    },
  });
  return qty;
};

const disable_rendering_row = (e, r) => {
  const cdn = e.currentTarget.attributes["data-name"].value;
  const qty = get_qty(locals["Sales Order Item"][cdn]);
  if (qty != "error" && qty.length>0) render_dialog(qty);
  setTimeout(() => {
    cur_frm.fields_dict["items"].grid.grid_rows[
      r
    ].columns.view_stock_availability.field_area.attr("style", "");
    $(`.grid-row[data-name="${cdn}"]`).removeClass("grid-row-open");
    $(`.grid-row[data-name="${cdn}"]`).find(".data-row").attr("style", "");
    frappe.dom.unfreeze();
  }, 200);
};
