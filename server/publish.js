Lists = new Meteor.Collection("lists");

Meteor.publish('lists', function () {
  return Lists.find();
});

