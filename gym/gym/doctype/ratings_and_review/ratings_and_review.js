// Copyright (c) 2023, Gym and contributors
// For license information, please see license.txt

frappe.ui.form.on('Ratings and Review', {
	refresh: function(frm) {
		if(frm.doc.__islocal==1 && (frappe.user_roles).length==3 && (frappe.user_roles).includes('Customer')){
			frm.set_value('customer',frappe.session.user_fullname)
			frm.set_df_property('customer','read_only',1)
		}

	},
	onload:function(frm){
		if(frappe.session.user!='Administrator')
		{frm.set_query("tranier", function(doc) {
			return {
					query: "gym.gym.doctype.ratings_and_review.ratings_and_review.customer_details",
					filters: {
						currect_user:frappe.session.user_fullname,
					},
			};
		});}
	}
});
// frappe.db.get_value("Customer", {name: frappe.session.user_fullname}, ["contract_addendums"], function(r) {
	
// });
