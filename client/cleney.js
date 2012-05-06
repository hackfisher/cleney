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
	    return Template.item_list({list: Lists.find({}, {sort: {timestamp: 1}}).map(time_mapper)});
	  })
	);

	for (var i = 0; i < 3; i ++) {
	  $("#category_view").append(
	    Meteor.ui.render(function () {
	      return Template.item_list({list: category_list_finder(i)});
	    })
	  );
	}

  $("#all_view").show();
  $("#category_view").hide();
});

// add list item
Template.add_item.events = {
  'click button#itemadd' : function () {
    var value = $("input#itemtext").val();
    Lists.insert({project: "default", text: value, tags: [], timestamp: (new Date()).getTime(), status_id: 0}); 
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
		alert("test");
		Lists.update({_id: this._id}, {$set: {status_id: 2}});
	},

	'click input.check' : function () {
		Lists.update({_id: this._id}, {$set: {status_id: 1}});
	}
};

Template.list_item.done_class = function () {
  return this.status_id == 1 ? 'done' : '';
};

Template.list_item.done_checkbox = function () {
  return this.status_id == 1 ? 'checked="checked"' : '';
};
