Session.set('user', null);

// TODO: to be replaced by cursor.map
var time_mapper = function (item) {
  if (item.timestamp) {
    return $.extend(item, {timestamp: new Date(item.timestamp)});
  } else {
    return item;
  }
};

var category_list_finder = function (x) {
  return function () {
    return Lists.find({status_id: x}, {sort: {timestamp: 1}}).map(time_mapper);
  }
};

Meteor.subscribe('lists');

Lists = new Meteor.Collection("lists");

Meteor.startup(function () {
	$("#all_view").append(
	  Meteor.ui.render(function () {
	    return Template.item_list({list: Lists.find({}, {sort: {timestamp: 1}}).map(time_mapper), list_title: "所有的TODO列表"});
	  })
	);

	var category_list_titles = ["待做TODO列表", "已完成的TODO列表", "已删除的TODO列表"];
	for (var i = 0; i < 3; i ++) {
	  $("#category_view").append(
	    Meteor.ui.render(function () {
	      return Template.item_list({list: category_list_finder(i), list_title: category_list_titles[i]});
	    })
	  );
	}

  $("#all_view").hide();
  $("#category_view").show();
});

// add list item
Template.add_item.events = {
  'click button#itemadd' : function (event) {
	  var $textinput = $("input#itemtext");
	  var value = $textinput.val();
	  Lists.insert({project: "default", text: value, tags: [], timestamp: (new Date()).getTime(), status_id: 0}); 
	  $textinput.val("");
  },

  'keydown input#itemtext' : function (event) {
	  if (event.keyCode == 13) {
		  $('button#itemadd').click();
		  event.preventDefault();
	  }
  }
};

Template.list_view.events = {
  'click button#show_all_view' : function () {
    $("#category_view").hide();
    $("#all_view").show();
  },

  'click button#show_category_view' : function () {
    $("#all_view").hide();
    $("#category_view").show();
  }
};

Template.list_item.events = {
	'click span.destroy' : function () {
		if (this.status_id != 2) {
			Lists.update({_id: this._id}, {$set: {status_id: 2}});
		} else {
			Lists.update({_id: this._id}, {$set: {status_id: 0}});
		}
	},

	'click input.check' : function () {
		if (this.status_id != 1) {
			Lists.update({_id: this._id}, {$set: {status_id: 1}});
		} else {
			Lists.update({_id: this._id}, {$set: {status_id: 0}});
		}
	}
};

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

Template.list_item.done_class = function () {
  return this.status_id == 1 ? 'done' : '';
};

Template.list_item.done_checkbox = function () {
  return this.status_id == 1 ? 'checked="checked"' : '';
};
