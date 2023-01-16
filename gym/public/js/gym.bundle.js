
frappe.ui.form.ControlButton.prototype.make_input = function () {
  let me = this;
  let btn_type;
  if (this.doctype == "Sales Order Item") btn_type = "btn-primary";
  else btn_type = this.df.primary ? "btn-primary" : "btn-default";
  const btn_size = this.df.btn_size ? `btn-${this.df.btn_size}` : "btn-xs";
  this.$input = $(`<button class="btn ${btn_size} ${btn_type}">`)
    .prependTo(me.input_area)
    .on("click", function () {
      me.onclick();
    });
  this.input = this.$input.get(0);
  this.set_input_attributes();
  this.has_input = true;
  this.toggle_label(false);
};


