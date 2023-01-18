
frappe.ui.form.on("Customer", {
    'refresh':function(frm){
        if(frm.doc.__islocal!=1){
            customer_subscription(frm)
        }
    }
})
function customer_subscription(frm){
    frappe.call({
        method:'gym.gym_membership.check_membership',
        args:{
            'name':frm.doc.name
        },
        callback:function(r){
            if(r.message[0].length>0){
                let data = `
                <p><b>Plan Type: </b> ${r.message[0][0]['plan']}</p>
                <p><b>Plan Start Date: </b> ${r.message[0][0]['start_date']}</p>
                <p><b>Plan End Date: </b> ${r.message[0][0]['end_date']}</p>
                <p><b>Plan Remaining days in subscription: </b>${r.message[0][0]['days_left']}</p>
                <p><b>Gym Trainer: </b>${r.message[0][0]['gym_trainer']}</p>`
                if(r.message[0][0]['phone_number']!='No Number'){
                    data+=`<p><b>Phone Number: </b>${r.message[0][0]['phone_number']}</p>`
                }
                if(r.message[1].length>0){
                    data+=`<h3>Old Plans</h3>`
                    for(let i=0;i<r.message[1].length;i++){
                        data+=`
                        <p><b>Plan Type: </b> ${r.message[1][i]['plan']}</p>
                        <p><b>Plan Start Date: </b> ${r.message[1][i]['start_date']}</p>
                        <p><b>Plan End Date: </b> ${r.message[1][i]['end_date']}</p>
                    `
                    }
                }
                frm.set_df_property("my_subscription", "options", data);

            }
            else{
                frm.set_df_property("subscription", "hidden", 1);

            }
        }
        })
    }