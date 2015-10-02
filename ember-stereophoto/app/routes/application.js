/* global Ember */

export default Ember.Route.extend({
  model: function() {
    return this.store.peekAll('stereo');
  },
  redirect: function() {
      this.transitionTo('stereos.index');
  }
});
