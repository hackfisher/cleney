if (Meteor.is_client) {
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

  Template.lists.lists = function () {
    return [{name: "Test1"}, {name:"Test2"}, {name:"HackFisher"}];
  }
}
