Lists = new Meteor.Collection("lists");

//Users = new Meteor.Collection("users");

Meteor.publish('lists', function () {
  return Lists.find();
});

/*
Meteor.methods({
	reg: function (email, password) {
		// to check the email and passord
		if(Users.findOne({user: email})) {
			throw new Meteor.Error(404, "User already exists!");
		}
		Users.insert({user: email, password: password});
	},

	login: function (email, password) {
		if (Users.findOne({user: email, password: password})) {
			return true;
		} else {
			return false;
		}
	}
});
*/
