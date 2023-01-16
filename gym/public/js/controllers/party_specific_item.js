frappe.ui.form.on('Party Specific Item', {
	onload:function(frm){
		frm.set_query("based_on_value", function(doc) {
			return {
					query: "gym.gym_membership.get_item_val",
					filters: {
						assign_locker: doc.assign_locker,
					},
			};
		});
	}


});
