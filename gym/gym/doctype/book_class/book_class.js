// Copyright (c) 2023, Gym and contributors
// For license information, please see license.txt

frappe.ui.form.on('Book Class', {
	// refresh: function(frm) {

	// }
});
frappe.ui.form.on('Book Group Classes', {
	class_name: (frm, cdt, cdn) => {
		const row = locals[cdt][cdn];
		if (row.class_name) {
			frappe.call({
				method: "gym.gym_membership.get_class_time",
				args: { class_name: row.class_name },
				callback: (r) => {
					if (r.message != "Error") {
						row.from_time = r.message.from_time
						row.to_time = r.message.to_time
						frm.refresh_field('book_group_classes')
					}
				}
			})

		}
	}
})
