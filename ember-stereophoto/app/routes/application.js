/* global Ember */

export default Ember.Route.extend({
  redirect: function() {
      this.transitionTo('stereos.index');
  }
});
