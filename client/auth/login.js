Template.login.events = {
	'click button#login_btn' : function () {
		Meteor.call('login', $("login_user").val(), $("login_password").val(), function (error, result) {
			if (error) {
				
			} else {
				Session.set("user", $("login_user").val());
			}	
		});
	}
};