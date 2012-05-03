Meteor.startup(function () {
  // code to run on server at startup
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Test1", status_id: 0},
    ];
		
    for (var i = 0; i < data.length; i ++) {
      Lists.insert(data[i]);
    }
  } else {
    var lists =Lists.find();
    lists.forEach(function (item) {
	if (item.timestamp) {
	} else {
	  Lists.update({_id: item._id}, {project: "default", text: item.name, tags: [], timestamp: (new Date()).getTime(), status_id: 0});
	}
    });
  }
});
