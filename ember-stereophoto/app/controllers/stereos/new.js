import Ember from 'ember';

var count = 0;

export default Ember.Controller.extend({
  appName: 'nevermind',
  init: function() {
    console.log('stereos.new init ' + (++count));
  },
  actions: {
    /* this is to pick the left photo, save in memory and display
     * camera stream to take right photo
     */
    takeLeftPhoto: function() {
      // inititate left photo with a button to take right one
      // then go back to gallery page
      this.transitionTo('stereos.index');
    },
    takeRightPhoto: function() {
      this.transitionTo('stereos.index');
    }
  }
});

