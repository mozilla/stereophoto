// route/stereos/new.js

import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    console.log('setupController');
    controller.set('model', model);
  } 
});

