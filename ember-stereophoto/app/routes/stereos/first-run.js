// route/stereos/index.js

import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('stereo');
  },
  renderTemplate: function() {
    this.render('stereos.index');
  }
});
