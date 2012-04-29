Template.hello.greeting = function () {
  return "Welcome to cleney.";
};

Template.hello.events = {
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
  }
};

Template.additem.events = {
  'click input#itemadd' : function () {
    var value = document.getElementById("itemtext").value;
    alert("the text is:"+ value);
    Lists.insert({name: value}); 
    alert($);
    if (typeof console !== 'undefined')
      console.log("You pressed the add button");
  }
}

Meteor.subscribe('lists');
//Template.lists.lists = function () {
//  return [{name: "Test1"}, {name:"Test2"}, {name:"HackFisher"}];
//}


Lists = new Meteor.Collection("lists");

Template.lists.lists = function () {
  return Lists.find({}, {sort: {name: 1}});
};
