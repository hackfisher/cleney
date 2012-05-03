Meteor.startup(function () {
  // code to run on server at startup
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Test1", status_id: 0},
    ];
		
    for (var i = 0; i < data.length; i ++) {
      Lists.insert(data[i]);
    }
  }
});
