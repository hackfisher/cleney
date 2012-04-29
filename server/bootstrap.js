Meteor.startup(function () {
  // code to run on server at startup
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Test1"},
      {name: "Test2"},
      {name: "HackFisher"},
      {name: "ABC"}
    ];
		
    for (var i = 0; i < data.length; i ++) {
      Lists.insert({name: data[i].name});
    }
  }
});
