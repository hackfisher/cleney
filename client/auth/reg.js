Template.reg.events = {
	'click button#reg_btn' : function () {
		var reg_user = $("reg_user").val();
		var reg_pass = $("reg_pass").val();
		var repeat_pass = $("repeat_pass").val();
		if (reg_pass == repeat_pass) {
			Meteor.call('reg', reg_user, reg_pass, function (error, result) {
				if (!error) {
					alert(reg_user);
					Session.set("user", reg_user);
				}
			});
			
		} else {
			// TODO: use bootstrap Alert
			alert("The Password is the not the same!");
		}
	}
};