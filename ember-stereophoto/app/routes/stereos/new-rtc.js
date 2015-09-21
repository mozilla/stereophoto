// route/stereos/new.js

import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    // take left and right photo
    // REMAINDER: use promises
    // display align page
    controller.set('model', model);
  } 
});

