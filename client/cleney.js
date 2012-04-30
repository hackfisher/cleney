var translate2date = function (list) {
  for (var i = 0; i < list.size(); i ++) {
    if (list[i].timestamp) {
      list[i].timestamp = new Date(list[i].timestamp);
    }
  }
  
  return list;
};


var category_list_finder = function (x) {
  return function () {
    return Lists.find({status_id: x}, {sort: {timestamp: 1}});
  }
};

Meteor.subscribe('lists');

Lists = new Meteor.Collection("lists");

Meteor.startup(function () {
$("#default_view").append(
  Meteor.ui.render(function () {
    return Template.item_list({list: Lists.find({}, {sort: {timestamp: 1}})});
  })
);

for (var i = 0; i < 3; i ++) {
  $("#category_view").append(
    Meteor.ui.render(function () {
      return Template.item_list({list: category_list_finder(i)});
    })
  );
}
});

// add list item
Template.add_item.events = {
  'click input#itemadd' : function () {
    var value = document.getElementById("itemtext").value;
    Lists.insert({project: "default", text: value, tags: [], timestamp: (new Date()).getTime(), status_id: 0}); 
  }
}

Template.item_list.done_class = function () {
  return this.status_id == 1 ? 'done' : '';
};

Template.item_list.done_checkbox = function () {
  return this.status_id == 1 ? 'checked="checked"' : '';
};
