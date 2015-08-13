/* global Ember */

// route/stereos.js
export default Ember.Route.extend({
  model: function() {
    return this.get('store').findAll('stereo');
  }
});

