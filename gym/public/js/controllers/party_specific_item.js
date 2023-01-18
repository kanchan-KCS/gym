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
	},
	validate:function(frm){
		if(frm.doc.assign_locker==1)
		{
			frappe.call({
			'method':'gym.gym_membership.check_locker_allocation',
			callback:function(r){
				if(r.message==0){
					frappe.msgprint({message: __("Maximum Limit for Allocation of Lockers have been crossed"), title: __("Error"), indicator: "orange",});
					frappe.validated = false;
				}


			}

		})
	}
	}
});
